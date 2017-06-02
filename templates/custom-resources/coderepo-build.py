#!/usr/bin/env python

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
            response = start_build(resource_properties)
            logger.info(
                'start_build response: {}'.format(
                    cfnresponse.json_dump_format(response)
                )
            )
            response_status = cfnresponse.SUCCESS
            request_id = response['ResponseMetadata']['RequestId']
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
