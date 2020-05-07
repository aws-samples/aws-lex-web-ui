/*
 Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

export default class {
  constructor({
    botName,
    botAlias = '$LATEST',
    userId,
    lexRuntimeClient,
  }) {
    if (!botName || !lexRuntimeClient) {
      throw new Error('invalid lex client constructor arguments');
    }

    this.botName = botName;
    this.botAlias = botAlias;
    this.userId = userId ||
      'lex-web-ui-' +
      `${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}`;

    this.lexRuntimeClient = lexRuntimeClient;
    this.credentials = this.lexRuntimeClient.config.credentials;
  }

  initCredentials(credentials) {
    this.credentials = credentials;
    this.lexRuntimeClient.config.credentials = this.credentials;
    this.userId = (credentials.identityId) ?
      credentials.identityId :
      this.userId;
  }

  deleteSession() {
    const deleteSessionReq = this.lexRuntimeClient.deleteSession({
      botAlias: this.botAlias,
      botName: this.botName,
      userId: this.userId,
    });
    return this.credentials.getPromise()
      .then(creds => creds && this.initCredentials(creds))
      .then(() => deleteSessionReq.promise());
  }

  startNewSession() {
    const putSessionReq = this.lexRuntimeClient.putSession({
      botAlias: this.botAlias,
      botName: this.botName,
      userId: this.userId,
      dialogAction: {
        type: 'ElicitIntent',
      },
    });
    return this.credentials.getPromise()
      .then(creds => creds && this.initCredentials(creds))
      .then(() => putSessionReq.promise());
  }

  postText(inputText, sessionAttributes = {}) {
    const postTextReq = this.lexRuntimeClient.postText({
      botAlias: this.botAlias,
      botName: this.botName,
      userId: this.userId,
      inputText,
      sessionAttributes,
    });
    return this.credentials.getPromise()
      .then(creds => creds && this.initCredentials(creds))
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

    const postContentReq = this.lexRuntimeClient.postContent({
      accept: acceptFormat,
      botAlias: this.botAlias,
      botName: this.botName,
      userId: this.userId,
      contentType,
      inputStream: blob,
      sessionAttributes,
    });

    return this.credentials.getPromise()
      .then(creds => creds && this.initCredentials(creds))
      .then(() => postContentReq.promise());
  }
}
