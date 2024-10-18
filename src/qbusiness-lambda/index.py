# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: MIT-0
import base64
import json
import os
import random
import string
import uuid
import boto3

AMAZONQ_APP_ID = os.environ.get("AMAZONQ_APP_ID")
AMAZONQ_REGION = os.environ["AWS_REGION"]
AMAZONQ_ENDPOINT_URL = os.environ.get("AMAZONQ_ENDPOINT_URL") or f'https://qbusiness.{AMAZONQ_REGION}.api.aws'
print("AMAZONQ_ENDPOINT_URL:", AMAZONQ_ENDPOINT_URL)

def close(intent, sessionAttributes, message):
    response = \
    {
        'messages': message,
        'sessionState': {
            'intent': intent,
            'sessionAttributes': sessionAttributes,
            'dialogAction': {
                'type': 'Close'
            }
        }
    }
    
    return response
    
def get_amazonq_response(prompt, context, attachments, qbusiness_client):
    print(f"get_amazonq_response: prompt={prompt}, app_id={AMAZONQ_APP_ID}, context={context}")
    input = {
        "applicationId": AMAZONQ_APP_ID,
        "userMessage": prompt
    }
    if context:
        if context["conversationId"]:
            input["conversationId"] = context["conversationId"]
        if context["parentMessageId"]:
            input["parentMessageId"] = context["parentMessageId"]
    else:
        input["clientToken"] = str(uuid.uuid4())

    if attachments:
        input["attachments"] = attachments

    print("Amazon Q Input: ", input)
    try:
        resp = qbusiness_client.chat_sync(**input)
    except Exception as e:
        print("Amazon Q Exception: ", e)
        resp = {
            "systemMessage": "Amazon Q Error: " + str(e)
        }
    print("Amazon Q Response: ", json.dumps(resp, default=str))
    return resp


def getS3File(s3Path):
    if s3Path.startswith("s3://"):
        s3Path = s3Path[5:]
    s3 = boto3.resource('s3')
    bucket, key = s3Path.split("/", 1)
    obj = s3.Object(bucket, key)
    return obj.get()['Body'].read()


def getAttachments(event):
    attachments = []
    userFilesUploaded = event["sessionState"]["sessionAttributes"].get("userFilesUploaded", [])
    if userFilesUploaded:
        filesJson = json.loads(userFilesUploaded)
        print(filesJson)
        for userFile in filesJson:
            print(f"getAttachments: userFile={userFile}")
            attachments.append({
                "data": getS3File(userFile["s3Path"]),
                "name": userFile["fileName"]
            })
        # delete userFilesUploaded from session
        event["sessionState"]["sessionAttributes"].pop("userFilesUploaded", None)
    return attachments


def format_response(event, amazonq_response, showSourceLinks):
    plainttext = amazonq_response["systemMessage"]
    markdown = amazonq_response["systemMessage"]
    ssml = amazonq_response["systemMessage"]

    if showSourceLinks:
        sourceLinks = []
        for source in amazonq_response.get("sourceAttributions", []):
            title = source.get("title", "link (no title)")
            url = source.get("url")
            if url:
                sourceLinks.append(f'<a href="{url}">{title}</a>')
        if len(sourceLinks):
            markdown = f'{markdown}<p><b>Sources</b>: ' + ", ".join(sourceLinks)

    # preserve conversation context in session
    messageArray = [{'contentType': 'CustomPayload',  "content": markdown}]
    sessionState = event.get('sessionState', {})
    
    # preserve conversation context in session
    sessionAttributes = sessionState.get("sessionAttributes", {})
    sessionAttributes["conversationId"] = amazonq_response.get("conversationId")
    sessionAttributes["parentMessageId"] = amazonq_response.get("systemMessageId")
    
    intent = sessionState.get("intent", {})
    intent['state'] = 'Fulfilled'
    return close(intent, sessionAttributes, messageArray)


def get_idc_iam_credentials(jwt):
    sso_oidc_client = boto3.client('sso-oidc')
    idc_sso_resp = sso_oidc_client.create_token_with_iam(
        clientId=os.environ.get("IDC_CLIENT_ID"),
        grantType="urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion=jwt,
    )

    print(idc_sso_resp)
    idc_sso_id_token_jwt = json.loads(base64.b64decode(idc_sso_resp['idToken'].split('.')[1] + '==').decode())

    sts_context = idc_sso_id_token_jwt["sts:identity_context"]
    sts_client = boto3.client('sts')
    session_name = "qbusiness-idc-" + "".join(
        random.choices(string.ascii_letters + string.digits, k=32)
    )
    assumed_role_object = sts_client.assume_role(
        RoleArn=os.environ.get("AMAZONQ_ROLE_ARN"),
        RoleSessionName=session_name,
        ProvidedContexts=[{
            "ProviderArn": "arn:aws:iam::aws:contextProvider/IdentityCenter",
            "ContextAssertion": sts_context
        }]
    )
    creds_object = assumed_role_object['Credentials']

    return creds_object


def lambda_handler(event, context):
    print("Received event: %s" % json.dumps(event))
    try:
        userInput = event["inputTranscript"]
        amazonq_context = {}
        amazonq_conversation_id = event["sessionState"]["sessionAttributes"].get("conversationId", "")
        if amazonq_conversation_id:
            amazonq_context = {
                "conversationId": event["sessionState"]["sessionAttributes"]["conversationId"],
                "parentMessageId": event["sessionState"]["sessionAttributes"]["parentMessageId"]
            }
            
        attachments = getAttachments(event)
    
        # Get the IDC IAM credentials
        # Parse session JWT token to get the jti
        token = (event["sessionState"]["sessionAttributes"]['idtokenjwt'])
        decoded_token = json.loads(base64.b64decode(token.split('.')[1] + '==').decode())
        jti = decoded_token['jti']
    
        dynamo_resource = boto3.resource('dynamodb')
        dynamo_table = dynamo_resource.Table(os.environ.get('DYNAMODB_CACHE_TABLE_NAME'))
    
        kms_client = boto3.client('kms')
        kms_key_id = os.environ.get("KMS_KEY_ID")
    
        # Check if JTI exists in caching DB
        response = dynamo_table.get_item(Key={'jti': jti})
    
        if 'Item' in response:
            creds = json.loads((kms_client.decrypt(
                KeyId=kms_key_id,
                CiphertextBlob=response['Item']['Credentials'].value))['Plaintext'])
        else:
            creds = get_idc_iam_credentials(token)
            exp = creds['Expiration'].timestamp()
            creds.pop('Expiration')
            # Encrypt the credentials and store them in the caching DB
            encrypted_creds = \
                kms_client.encrypt(KeyId=kms_key_id,
                                   Plaintext=bytes(json.dumps(creds).encode()))['CiphertextBlob']
            dynamo_table.put_item(Item={'jti': jti, 'ExpiresAt': int(exp), 'Credentials': encrypted_creds})
    
        # Assume the qbusiness role with the IDC IAM credentials to create the qbusiness client
        assumed_session = boto3.Session(
            aws_access_key_id=creds['AccessKeyId'],
            aws_secret_access_key=creds['SecretAccessKey'],
            aws_session_token=creds['SessionToken']
        )
    
        qbusiness_client = assumed_session.client("qbusiness")
        amazonq_response = get_amazonq_response(userInput, amazonq_context, attachments, qbusiness_client)
        response = format_response(event, amazonq_response, True)
    except:
        messageArray = [{'contentType': 'PlainText',  "content": "Could not retrieve a Q Business answer. Please ensure you are logged in and have a valid subscription"}]
        sessionState = event.get('sessionState', {})
        sessionAttributes = sessionState.get("sessionAttributes", {})
        intent = sessionState.get("intent", {})
        intent['state'] = 'Fulfilled'
        response = close(intent, sessionAttributes, messageArray)
            
    print("Returning response: %s" % json.dumps(response))
    return response