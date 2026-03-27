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
 * Asynchronous store actions - composed from domain-specific modules
 */

import initActions from './init-actions';
import audioActions from './audio-actions';
import lexActions from './lex-actions';
import liveChatActions from './live-chat-actions';
import credentialsActions from './credentials-actions';
import uiActions from './ui-actions';

export default {
  ...initActions,
  ...audioActions,
  ...lexActions,
  ...liveChatActions,
  ...credentialsActions,
  ...uiActions,
};
