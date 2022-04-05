const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });
const connect = new AWS.Connect();
const parentOrigin = process.env.PARENT_ORIGIN;

exports.handler = (event, context, callback) => {
    console.log("Received event: " + JSON.stringify(event));
    const body = JSON.parse(event["body"]);
    console.log(`parent origin in environment: ${parentOrigin}`);

    startChatContact(body).then((startChatResult) => {
        callback(null, buildSuccessfulResponse(startChatResult));
    }).catch((err) => {
        console.log("caught error " + err);
        callback(null, buildResponseFailed(err));
    });
};

function startChatContact(body) {
    let contactFlowId = "";
    if (body.hasOwnProperty('ContactFlowId')) {
        contactFlowId = body["ContactFlowId"];
    }
    console.log("CF ID: " + contactFlowId);

    let instanceId = "";
    if (body.hasOwnProperty('InstanceId')) {
        instanceId = body["InstanceId"];
    }
    console.log("Instance ID: " + instanceId);

    let initialMsgContent = "";
    let initialMsgContentType = "";
    if (body.hasOwnProperty("InitialMessage")) {
        if (body["InitialMessage"].hasOwnProperty("Content")) {
            initialMsgContent = body["InitialMessage"]["Content"];

        }
        if (body["InitialMessage"].hasOwnProperty("ContentType")) {
            initialMsgContentType = body["InitialMessage"]["ContentType"];
        }
    }
    
    let topic = "";
    if (body.hasOwnProperty("Attributes")) {
        if (body["Attributes"].hasOwnProperty("topic")) {
            topic = body["Attributes"]["topic"];
        }
                    
    }

    let lexSessionAttributes = "";
    if (body.hasOwnProperty("lexSessionAttributes")) {
            lexSessionAttributes = body["lexSessionAttributes"];
                    
    }

    return new Promise(function(resolve, reject) {
        const startChat = {
            "InstanceId": instanceId == "" ? process.env.INSTANCE_ID : instanceId,
            "ContactFlowId": contactFlowId == "" ? process.env.CONTACT_FLOW_ID : contactFlowId,
            "Attributes": {
                "customerName": body["ParticipantDetails"]["DisplayName"],
                "topic" : topic,
                "lexSessionAttributes": lexSessionAttributes
            },
            "ParticipantDetails": {
                "DisplayName": body["ParticipantDetails"]["DisplayName"]
            }
        };
        
        if (initialMsgContent && initialMsgContentType != "" ){
            startChat.InitialMessage = {
                "Content": initialMsgContent,
                "ContentType": initialMsgContentType
            };
        };
        
        console.log('startChat params', startChat);
        connect.startChatContact(startChat, function(err, data) {
            if (err) {
                console.log("Error starting the chat.");
                console.log(err, err.stack);
                reject(err);
            }
            else {
                console.log("Start chat succeeded with the response: " + JSON.stringify(data));
                resolve(data);
            }
        });

    });
}

function buildSuccessfulResponse(result) {
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": parentOrigin,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'
        },
        body: JSON.stringify({
            data: { startChatResult: result }
        })
    };
    console.log("RESPONSE" + JSON.stringify(response));
    return response;
}

function buildResponseFailed(err) {
    const response = {
        statusCode: 500,
        headers: {
            "Access-Control-Allow-Origin": parentOrigin,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
        },
        body: JSON.stringify({
            data: {
                "Error": err
            }
        })
    };
    return response;
}
