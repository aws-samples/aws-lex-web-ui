/*
 Copyright 2017-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/**
 * Application configuration management.
 * This file contains default config values and merges the environment
 * and URL configs.
 *
 * The environment dependent values are loaded from files
 * with the config.<ENV>.json naming syntax (where <ENV> is a NODE_ENV value
 * such as 'prod' or 'dev') located in the same directory as this file.
 *
 * The URL configuration is parsed from the `config` URL parameter as
 * a JSON object
 *
 * NOTE: To avoid having to manually merge future changes to this file, you
 * probably want to modify default values in the config.<ENV>.js files instead
 * of this one.
 */

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

// TODO turn this into a class

// get env shortname to require file
const envShortName = [
  'dev',
  'prod',
  'test',
].find(env => process.env.NODE_ENV.startsWith(env));

if (!envShortName) {
  console.error('unknown environment in config: ', process.env.NODE_ENV);
}

// eslint-disable-next-line import/no-dynamic-require
const configEnvFile = (process.env.BUILD_TARGET === 'lib') ?
  {} : await import(`./config.${envShortName}.json`);

// default config used to provide a base structure for
// environment and dynamic configs
const configDefault = {
  // AWS region
  region: 'us-east-1',

  cognito: {
    // Cognito pool id used to obtain credentials
    // e.g. poolId: 'us-east-1:deadbeef-cac0-babe-abcd-abcdef01234',
    poolId: '',
  },
  connect: {
    // The Connect contact flow id - user configured via CF template
    contactFlowId: '',
    // The Connect instance id - user configured via CF template
    instanceId: '',
    // The API Gateway Endpoint - provisioned by CF template
    apiGatewayEndpoint: '',
    // Message to prompt the user for a name prior to establishing a session
    promptForNameMessage: 'Before starting a live chat, please tell me your name?',
    // The default message to message to display while waiting for a live agent
    waitingForAgentMessage: "Thanks for waiting. An agent will be with you when available.",
    // The default interval with which to display the waitingForAgentMessage. When set to 0
    // the timer is disabled.
    waitingForAgentMessageIntervalSeconds: 60,
    // Terms to start live chat
    liveChatTerms: 'live chat',
    // The delay to use between sending transcript blocks to connect
    transcriptMessageDelayInMsec: 150,
    // Utterance to send on end live chat
    endLiveChatUtterance: ''
  },
  lex: {
    // Lex V2 fields
    v2BotId: '',
    v2BotAliasId: '',
    v2BotLocaleId: '',

    // instruction message shown in the UI
    initialText: 'You can ask me for help ordering flowers. ' +
      'Just type "order flowers" or click on the mic and say it.',

    // instructions spoken when mic is clicked
    initialSpeechInstruction: 'Say "Order Flowers" to get started',

    // initial Utterance to send to bot if defined
    initialUtterance: '',

    // Lex initial sessionAttributes
    sessionAttributes: {},

    // controls if the session attributes are reinitialized a
    // after the bot dialog is done (i.e. fail or fulfilled)
    reInitSessionAttributesOnRestart: false,

    // TODO move this config fields to converser
    // allow to interrupt playback of lex responses by talking over playback
    // XXX experimental
    enablePlaybackInterrupt: false,

    // microphone volume level (in dB) to cause an interrupt in the bot
    // playback. Lower (negative) values makes interrupt more likely
    // may need to adjusted down if using low_latency preset or band pass filter
    playbackInterruptVolumeThreshold: -60,

    // microphone slow sample level to cause an interrupt in the bot
    // playback. Lower values makes interrupt more likely
    // may need to adjusted down if using low_latency preset or band pass filter
    playbackInterruptLevelThreshold: 0.0075,

    // microphone volume level (in dB) to cause enable interrupt of bot
    // playback. This is used to prevent interrupts when there's noise
    // For interrupt to be enabled, the volume level should be lower than this
    // value. Lower (negative) values makes interrupt more likely
    // may need to adjusted down if using low_latency preset or band pass filter
    playbackInterruptNoiseThreshold: -75,

    // only allow to interrupt playback longer than this value (in seconds)
    playbackInterruptMinDuration: 2,

    // when set to true, allow lex-web-ui to retry the current request if an exception is detected.
    retryOnLexPostTextTimeout: false,

    // defines the retry count. default is 1. Only used if retryOnLexError is set to true.
    retryCountPostTextTimeout: 1,

    // allows the Lex bot to use streaming responses for integration with LLMs or other streaming protocols
    allowStreamingResponses: false,

    // web socket endpoint for streaming
    streamingWebSocketEndpoint: '',

    // dynamo DB table for streaming
    streamingDynamoDbTable: '',
  },

  polly: {
    voiceId: 'Joanna',
  },

  ui: {
    // this dynamicall changes the pageTitle injected at build time
    pageTitle: 'Order Flowers Bot',

    // when running as an embedded iframe, this will be used as the
    // be the parent origin used to send/receive messages
    // NOTE: this is also a security control
    // this parameter should not be dynamically overriden
    // avoid making it '*'
    // if left as an empty string, it will be set to window.location.window
    // to allow runing embedded in a single origin setup
    parentOrigin: null,

    // mp3 audio file url for message send sound FX
    messageSentSFX: 'send.mp3',

    // mp3 audio file url for message received sound FX
    messageReceivedSFX: 'received.mp3',

    // chat window text placeholder
    textInputPlaceholder: 'Type here or click on the mic',

    // text shown when you hover over the minimized bot button
    minButtonContent: '',

    toolbarColor: 'red',

    // chat window title
    toolbarTitle: 'Order Flowers',

    // toolbar menu start live chat label
    toolbarStartLiveChatLabel: "Start Live Chat",

    // toolbar menu / btn stop live chat label
    toolbarEndLiveChatLabel: "End Live Chat",

    // toolbar menu icon for start live chat
    toolbarStartLiveChatIcon: "people_alt",

    // toolbar menu / btn icon for end live chat
    toolbarEndLiveChatIcon: "call_end",

    // logo used in toolbar - also used as favicon not specified
    toolbarLogo: '',

    // fav icon
    favIcon: '',

    // controls if the Lex initialText will be pushed into the message
    // list after the bot dialog is done (i.e. fail or fulfilled)
    pushInitialTextOnRestart: true,

    // controls if the Lex sessionAttributes should be re-initialized
    // to the config value (i.e. lex.sessionAttributes)
    // after the bot dialog is done (i.e. fail or fulfilled)
    reInitSessionAttributesOnRestart: false,

    // controls whether URLs in bot responses will be converted to links
    convertUrlToLinksInBotMessages: true,

    // controls whether tags (e.g. SSML or HTML) should be stripped out
    // of bot messages received from Lex
    stripTagsFromBotMessages: true,

    // controls whether detailed error messages are shown in bot responses
    showErrorDetails: false,

    // show date when message was received on buble focus/selection
    showMessageDate: true,

    // bot avatar image URL
    avatarImageUrl: '',

    // agent avatar image URL ( if live Chat is enabled)
    agentAvatarImageUrl: '',

    // Show the diaglog state icon, check or alert, in the text bubble
    showDialogStateIcon: true,

    // Give the ability for users to copy the text from the bot
    showCopyIcon: false,

    // Hide the message bubble on a response card button press
    hideButtonMessageBubble: false,

    // shows a thumbs up and thumbs down button which can be clicked
    positiveFeedbackIntent: '',
    negativeFeedbackIntent: '',

    // shows a help button on the toolbar when true
    helpIntent: '',

    // allowsConfigurableHelpContent - adding default content disables sending the helpIntent message.
    // content can be added per locale as needed. responseCard is optional.
    //     helpContent: {
    //       en_US: {
    //         "text": "",
    //         "markdown": "",
    //         "repeatLastMessage": true,
    //         "responseCard": {
    //           "title":"",
    //           "subTitle":"",
    //           "imageUrl":"",
    //           "attachmentLinkUrl":"",
    //           "buttons":[
    //             {
    //               "text":"",
    //               "value":""
    //             }
    //           ]
    //         }
    //       }
    //     }
    helpContent: {
    },

    // for instances when you only want to show error icons and feedback
    showErrorIcon: true,

    // Allows lex messages with session attribute
    // appContext.altMessages.html or appContext.altMessages.markdown
    // to be rendered as html in the message
    // Enabling this feature increases the risk of XSS.
    // Make sure that the HTML message has been properly
    // escaped/encoded/filtered in the Lambda function
    // https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)
    AllowSuperDangerousHTMLInMessage: true,

    // Lex webui should display response card titles. The response card
    // title can be optionally disabled by setting this value to false
    shouldDisplayResponseCardTitle: true,

    // Controls whether response card buttons are disabled after being clicked
    shouldDisableClickedResponseCardButtons: true,

    // Optionally display login menu
    enableLogin: false,

    // enable Sound Effects
    enableSFX: false,

    // Optionally force login automatically when load
    forceLogin: false,

    // Optionally direct input focus to Bot text input as needed
    directFocusToBotInput: false,

    // Optionally keep chat session automatically when load
    saveHistory: false,

    // Optionally enable live chat via AWS Connect
    enableLiveChat: false,

    // Optionally enable file upload
    enableUpload: false,
    uploadS3BucketName: '',
    uploadSuccessMessage: '',
    uploadFailureMessage: 'Document upload failed',
    uploadRequireLogin: true,
  },

  /* Configuration to enable voice and to pass options to the recorder
   * see ../lib/recorder.js for details about all the available options.
   * You can override any of the defaults in recorder.js by adding them
   * to the corresponding JSON config file (config.<ENV>.json)
   * or alternatively here
   */
  recorder: {
    // if set to true, voice interaction would be enabled on supported browsers
    // set to false if you don't want voice enabled
    enable: true,

    // maximum recording time in seconds
    recordingTimeMax: 10,

    // Minimum recording time in seconds.
    // Used before evaluating if the line is quiet to allow initial pauses
    // before speech
    recordingTimeMin: 2.5,

    // Sound sample threshold to determine if there's silence.
    // This is measured against a value of a sample over a period of time
    // If set too high, it may falsely detect quiet recordings
    // If set too low, it could take long pauses before detecting silence or
    // not detect it at all.
    // Reasonable values seem to be between 0.001 and 0.003
    quietThreshold: 0.002,

    // time before automatically stopping the recording when
    // there's silence. This is compared to a slow decaying
    // sample level so its's value is relative to sound over
    // a period of time. Reasonable times seem to be between 0.2 and 0.5
    quietTimeMin: 0.3,

    // volume threshold in db to determine if there's silence.
    // Volume levels lower than this would trigger a silent event
    // Works in conjuction with `quietThreshold`. Lower (negative) values
    // cause the silence detection to converge faster
    // Reasonable values seem to be between -75 and -55
    volumeThreshold: -65,

    // use automatic mute detection
    useAutoMuteDetect: false,

    // use a bandpass filter on mic input
    useBandPass: false,

    // trim low volume samples at beginning and end of recordings
    encoderUseTrim: false,
  },

  converser: {
    // used to control maximum number of consecutive silent recordings
    // before the conversation is ended
    silentConsecutiveRecordingMax: 3,
  },

  iframe: {
    shouldLoadIframeMinimized: false,
  },

  // URL query parameters are put in here at run time
  urlQueryParams: {},
};

/**
 * Obtains the URL query params and returns it as an object
 * This can be used before the router has been setup
 */
function getUrlQueryParams(url) {
  try {
    return url
      .split('?', 2) // split query string up to a max of 2 elems
      .slice(1, 2) // grab what's after the '?' char
      // split params separated by '&'
      .reduce((params, queryString) => queryString.split('&'), [])
      // further split into key value pairs separated by '='
      .map(params => params.split('='))
      // turn into an object representing the URL query key/vals
      .reduce((queryObj, param) => {
        const [key, value = true] = param;
        const paramObj = {
          [key]: decodeURIComponent(value),
        };
        return { ...queryObj, ...paramObj };
      }, {});
  } catch (e) {
    console.error('error obtaining URL query parameters', e);
    return {};
  }
}

/**
 * Obtains and parses the config URL parameter
 */
function getConfigFromQuery(query) {
  try {
    return (query.lexWebUiConfig) ? JSON.parse(query.lexWebUiConfig) : {};
  } catch (e) {
    console.error('error parsing config from URL query', e);
    return {};
  }
}

/**
 * Merge two configuration objects
 * The merge process takes the base config as the source for keys to be merged.
 * The values in srcConfig take precedence in the merge.
 *
 * If deep is set to false (default), a shallow merge is done down to the
 * second level of the object. Object values under the second level fully
 * overwrite the base. For example, srcConfig.lex.sessionAttributes overwrite
 * the base as an object.
 *
 * If deep is set to true, the merge is done recursively in both directions.
 */
export function mergeConfig(baseConfig, srcConfig, deep = false) {
  function mergeValue(base, src, key, shouldMergeDeep) {
    // nothing to merge as the base key is not found in the src
    if (!(key in src)) {
      return base[key];
    }

    // deep merge in both directions using recursion
    if (shouldMergeDeep && typeof base[key] === 'object') {
      return {
        ...mergeConfig(src[key], base[key], shouldMergeDeep),
        ...mergeConfig(base[key], src[key], shouldMergeDeep),
      };
    }

    // shallow merge key/values
    // overriding the base values with the ones from the source
    return (typeof base[key] === 'object') ?
      { ...base[key], ...src[key] } :
      src[key];
  }

  // use the baseConfig first level keys as the base for merging
  return Object.keys(baseConfig)
    .map((key) => {
      const value = mergeValue(baseConfig, srcConfig, key, deep);
      return { [key]: value };
    })
    // merge key values back into a single object
    .reduce((merged, configItem) => ({ ...merged, ...configItem }), {});
}

// merge build time parameters
const configFromFiles = mergeConfig(configDefault, configEnvFile);

// TODO move query config to a store action
// run time config from url query parameter
const queryParams = getUrlQueryParams(window.location.href);
const configFromQuery = getConfigFromQuery(queryParams);
// security: delete origin from dynamic parameter
if (configFromQuery.ui && configFromQuery.ui.parentOrigin) {
  delete configFromQuery.ui.parentOrigin;
}

const configFromMerge = mergeConfig(configFromFiles, configFromQuery);

export const config = {
  ...configFromMerge,
  urlQueryParams: queryParams,
};
