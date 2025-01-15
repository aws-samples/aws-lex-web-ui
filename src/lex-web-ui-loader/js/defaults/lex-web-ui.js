/*
 Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/**
 * Base configuration object structure
 *
 * NOTE: you probably don't want to be making config changes here but rather
 * use the config loader to override the defaults
 */

export const configBase = {
  region: 'us-east-1',
  lex: { botName: 'LZIKP1FQS6' },
  cognito: { poolId: 'us-east-1:18f07213-af0d-4d54-b677-c1c40a7ef92c' },
  ui: { parentOrigin: 'https://dwnjd0qi3xz2k.cloudfront.net' },
  polly: {},
  connect: {},
  recorder: {},
  iframe: {
    iframeOrigin: 'https://dwnjd0qi3xz2k.cloudfront.net',
    iframeSrcPath: '/index.html#/?lexWebUiEmbed=true',
  },
};

export default configBase;
