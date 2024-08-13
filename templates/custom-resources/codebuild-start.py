#!/usr/bin/env python

##########################################################################
# Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
#
# Licensed under the Amazon Software License (the "License"). You may not use this file
# except in compliance with the License. A copy of the License is located at
#
# http://aws.amazon.com/asl/
#
# or in the "license" file accompanying this file. This file is distributed on an "AS IS"
# BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
# License for the specific language governing permissions and limitations under the License.
##########################################################################
""" CodeBuild Starter

CloudFormation Custom Resource Lambda Function
"""

import logging
import boto3
import cfnresponse


codebuild_client = boto3.client('codebuild')

DEFAULT_LOGGING_LEVEL = logging.INFO
logging.basicConfig(format='[%(levelname)s] %(message)s', level=DEFAULT_LOGGING_LEVEL)
logger = logging.getLogger(__name__)
logger.setLevel(DEFAULT_LOGGING_LEVEL)

def start_build(resource_properties):
    project_name = resource_properties.get('ProjectName')
    if (not project_name):
        raise ValueError(
          'missing ProjectName resource property'
        )

    response = codebuild_client.start_build(
        projectName=project_name
    )
    return response

def handler(event, context):
    logger.info('event: {}'.format(cfnresponse.json_dump_format(event)))
    request_type = event.get('RequestType')
    resource_properties = event.get('ResourceProperties')

    response = {}
    response_status = cfnresponse.SUCCESS
    request_id = ''
    reason = ''

    if (request_type in ['Create', 'Update']):
        try:
            start_build_response = start_build(resource_properties)
            logger.info(
                'start_build response: {}'.format(
                    cfnresponse.json_dump_format(start_build_response)
                )
            )
            # only return specific fields to prevent "response object is too long" errors
            response = {
              'build_id':  start_build_response['build']['id'],
              'project_name':  start_build_response['build']['projectName'],
              'arn':  start_build_response['build']['arn'],
            }
            response_status = cfnresponse.SUCCESS
            request_id = start_build_response['ResponseMetadata']['RequestId']
            reason = 'Create'
        except Exception as e:
            error = 'failed to start build: {}'.format(e)
            logger.error(error)
            response_status = cfnresponse.FAILED
            reason = error
            pass

    cfnresponse.send(
        event,
        context,
        response_status,
        response,
        request_id,
        reason
    )
