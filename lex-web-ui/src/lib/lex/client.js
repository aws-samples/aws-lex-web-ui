/*
 Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import LexRuntime from 'aws-sdk/clients/lexruntime';

export default class {
  constructor({
    botName,
    botAlias = '$LATEST',
    user,
    region = 'us-east-1',
    credentials = {},

    // AWS.Config object that is used to initialize the client
    // the region and credentials argument override it
    awsSdkConfig = {},
  }) {
    this.botName = botName;
    this.botAlias = botAlias;
    this.user = user || 'lex-web-ui-' +
      `${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}`;
    this.region = region || awsSdkConfig.region;
    this.credentials = credentials || awsSdkConfig.credentials;
    this.identityId = (this.credentials.identityId) ?
      this.credentials.identityId : this.user;

    if (!this.botName || !this.region) {
      throw new Error('invalid lex client constructor arguments');
    }

    this.lexRuntime = new LexRuntime(
      { ...awsSdkConfig, region: this.region, credentials: this.credentials },
    );
  }

  initCredentials(credentials) {
    this.credentials = credentials;
    this.lexRuntime.config.credentials = this.credentials;
    this.identityId = this.credentials.identityId;
  }

  postText(inputText, sessionAttributes = {}) {
    const postTextReq = this.lexRuntime.postText({
      botAlias: this.botAlias,
      botName: this.botName,
      inputText,
      sessionAttributes,
      userId: this.identityId,
    });

    return this.credentials.getPromise()
      .then(() => postTextReq.promise());
  }

  postContent(
    blob,
    sessionAttributes = {},
    acceptFormat = 'audio/ogg',
    offset = 0,
  ) {
    const mediaType = blob.type;
    let contentType = mediaType;

    if (mediaType.startsWith('audio/wav')) {
      contentType = 'audio/x-l16; sample-rate=16000; channel-count=1';
    } else if (mediaType.startsWith('audio/ogg')) {
      contentType =
      'audio/x-cbr-opus-with-preamble; bit-rate=32000;' +
        ` frame-size-milliseconds=20; preamble-size=${offset}`;
    } else {
      console.warn('unknown media type in lex client');
    }

    const postContentReq = this.lexRuntime.postContent({
      accept: acceptFormat,
      botAlias: this.botAlias,
      botName: this.botName,
      contentType,
      inputStream: blob,
      sessionAttributes,
      userId: this.identityId,
    });

    return this.credentials.getPromise()
      .then(() => postContentReq.promise());
  }
}
