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
""" S3 Clean Up

CloudFormation Custom Resource Lambda Function
"""

import logging
import boto3
import cfnresponse

DEFAULT_LOGGING_LEVEL = logging.INFO
logging.basicConfig(format='[%(levelname)s] %(message)s', level=DEFAULT_LOGGING_LEVEL)
logger = logging.getLogger(__name__)
logger.setLevel(DEFAULT_LOGGING_LEVEL)

boto3.set_stream_logger('boto3', level=DEFAULT_LOGGING_LEVEL)

s3_client = boto3.client('s3')
s3_resource = boto3.resource('s3')

def get_buckets_from_properties(resource_properties):
    buckets = resource_properties.get('Buckets')
    logger.info('buckets in properties {}'.format(buckets))
    if type(buckets) != list:
        raise ValueError('invalid Buckets property type - not an array')
    if not len(buckets):
        raise ValueError('empty Buckets property')
    for bucket in buckets:
        bucket_type = type(bucket)
        if not (bucket_type == str or bucket_type == unicode):
            raise ValueError(
                'invalid bucket name type in Buckets property: {}'.format(
                    bucket_type
                )
            )
        s3_client.head_bucket(Bucket=bucket)

    return buckets

def delete_buckets(buckets):
    for bucket in buckets:
        bucket_resource = s3_resource.Bucket(bucket)
        for object_version in bucket_resource.object_versions.all():
            object_version.delete()
        for s3_object in bucket_resource.objects.all():
            s3_object.delete()

        bucket_resource.delete()

def handler(event, context):
    logger.info('event: {}'.format(cfnresponse.json_dump_format(event)))
    request_type = event.get('RequestType')
    resource_properties = event.get('ResourceProperties')

    response_status = cfnresponse.SUCCESS
    response = {}
    response_id = event.get('RequestId')
    reason = ''
    error = ''

    if (request_type == 'Delete'):
        try:
            buckets = get_buckets_from_properties(resource_properties)
            delete_buckets(buckets)
            logger.info('delete_buckets completed')
            reason = 'Delete'
        except Exception as e:
            error = 'failed to delete buckets: {}'.format(e)
            pass

    if error:
        logger.error(error)
        response_status = cfnresponse.FAILED
        reason = error

    cfnresponse.send(
        event,
        context,
        response_status,
        response,
        response_id,
        reason
    )
