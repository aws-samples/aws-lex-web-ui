# Overview
This directory contains a sample site to showing how to load the chatbot
UI as a full page or in an iframe. These are meant to be quick examples
on how to integrate the chatbot UI into exising websites.

The sample website depends on configuration files in the
[/src/config](/src/config) directory. As a minimum, you should configure
a valid Cognito Pool Id and Lex Bot name to test it.

Once you have the right config, you can start the test server:
```shell
npm start
```

You can also use the chatbot UI in your web application as a
component. For details about the component and configuration, please
refer to its
[README](https://github.com/awslabs/aws-lex-web-ui/blob/master/lex-web-ui/README.md)
file.

# Full Page
The [index.html](index.html) file in this directory is an example on
how to display the chatbot UI as a full page. It loads third party
dependencies from public CDNs as a quick way to test it. This page also
depends on the chatbot UI library files in the [/dist](/dist) directory.

# ChatBot UI Iframe Embedding
The [parent.html](parent.html) file in this directory is a sample
implementation of embedding the chatbot UI in an iframe. This includes
embedding it in a cross-origin setup where the chatbot is served from
a server, S3 bucket or CloudFront distribution in a domain that is
different from the hosting web site. This section describes how to embed
the chatbot UI as an iframe and the API used to send data between the
parent page and the iframe.

## Adding the ChatBot UI to your Website
This directory contains a sample JavaScript loader
([chatbot-ui-iframe-loader.js](chatbot-ui-iframe-loader.js))
and CSS file
([chatbot-ui-iframe-loader.css](chatbot-ui-iframe-loader.css))
that can be used to add the chatbot to an existing web site using a
dynamically created iframe. This can be done by adding a couple of HTML
tags to your web page:

```html
  <!-- add CSS link inside the HEAD tag -->
  <link rel="stylesheet" type="text/css" href="chatbot-ui-iframe-loader.css">

  <!-- add script tag towards the bottom of the html BODY section -->
  <script src="chatbot-ui-iframe-loader.js"></script>
```

## Passing Data between the Parent Page and the ChatBot UI
The chatbot UI activates an API when the `lexWebUiEmbed` URL query parameter
is set to `true`. This API can be used to pass data to and from a hosting parent
page. This is done using the JavaScript
[postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
call. The messages use the
[MessageChannel](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel)
API to asynchronously send responses to the events. The API can pass
data between the parent hosting site and the chatbot UI using dedicated
message channel in each event. It also uses the message channel to
respond an event as resolved or rejected to pose as a
[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

This mechanism enables use cases such as:
- Passing credentials from the parent hosting site to the chat iframe
- Passing events (e.g. windows minimize) from the chat window to the
parent window
- Programmatically sending a text message to be posted by the chatbot UI

**SECURITY NOTE:** Passing messages with postMessage can work in
a cross-origin setup where the iframe is hosted in a domain/origin
different from parent site. The chatbot UI and the chatbot-ui-iframe-loader.js script
validate the event Origin against configured values as a security access
control measure. This avoids unauthorized sites posting arbitrary messages
to your site or posing as the chatbot UI. Make sure to use origins as
specific as possible. See the Cross Origin Configuration section below
for details of configuring the origin.

### Bot Loader Global Objects
The [chatbot-ui-iframe-loader.js](./chatbot-ui-iframe-loader.js) script includes a reference
implementation of the chatbot UI API. This is exposed as a global
class function named `LexWebUiIframe` created by the script. The script
also instantiates an object of this class in a global variable named
`lexWebUi`.

#### LexWebUiIframe Constructor
The `LexWebUiIframe` class accepts the following options in the constructor:
```javascript
  var options = {
    // div container class to insert iframe
    containerClass: 'lex-web-ui',

    // iframe source uri. use embed=true query string when loading as iframe
    iframeSrcPath: '/index.html#/?lexWebUiEmbed=true',

    // AWS SDK script dynamically added to the DOM
    // https://github.com/aws/aws-sdk-js
    sdkUrl: 'https://sdk.amazonaws.com/js/aws-sdk-2.98.0.min.js',

    // controls whether the AWS SDK is dynamically added to the DOM
    shouldAddAwsSdk: true,

    // URL to download config JSON file
    configUrl: '/chatbot-ui-iframe-loader-config.json',

    // controls whether the config should be downloaded from `configUrl`
    shouldLoadConfigFromJsonFile: true,

    // controls whether the config should be obtained using events
    shouldLoadConfigFromEvent: true,

    // controls whether the bot loader script should
    // automatically initialize and load the iframe.
    // If set to false, you should manually initialize
    // using the init() method
    shouldAutoLoad: true,
  };

  var lexWebUi = new LexWebUi(options);
```

#### Overriding LexWebUiIframe Default Options
You can override the default class options by creating the
`LexWebUiIframe.options` variable in the global scope before the
chatbot-ui-iframe-loader.js script runs. For example, the following snippet prevents
the bot loader script to automatically load the iframe:
```javascript

   /* in a script that runs before chatbot-ui-iframe-loader.js */
  // Set LexWebUiIframe.options.shouldAutoLoad to false to prevent auto loading
  // This should be set in a script that runs before the chatbot-ui-iframe-loader.js script
  // In that case, you would need to load it later using the init() function
  var LexWebUiIframe = {
    options: {
      shouldAutoLoad: true,
    }
  };

   /* in a script that runs after chatbot-ui-iframe-loader.js */
  // the iframe should not have been loaded by chatbot-ui-iframe-loader.js
  var lexWebUi = new LexWebUiIframe();

  // manually init the iframe
  lexWebUi.init();
```

## Events Based API
The chatbot-ui-iframe-loader.js script relays messages to and from the postMessage
interface described above. This allows an alternate interface that serves
as a proxy to the postMessage mechanism. This interface operates at a
higher level and is intended to be a simpler compatibility layer. You
can use this event based API as a mechanism to quickly integrate the
chatbot UI to your site. This works by using
[custom events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)
and [event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
in the parent page that pass data to and from the postMessage interface.

### Lex State Updates From Iframe
The chatbot UI iframe sends Lex bot state update events to the parent
site via postMessage. This can be used to have the parent react to the
dialog state of the bot. The chatbot-ui-iframe-loader.js script relays these messages
back to the parent by emitting the `updatelexstate` events. The event
object will contain the Lex state variables in the `details.state` field.

For example, the following snippet grabs the Lex response variables from
the events:
```javascript
  // the bot loader script receives the state from the iframe via postMessage
  // and relays it to the parent by dispatching 'updatelexstate' events
  document.addEventListener('updatelexstate', onUpdateLexSate, false);

  function onUpdateLexState() {
    var slots = evt.detail.state.slots;
    var dialogState = evt.detail.state.dialogState;
    var intentName = evt.detail.state.intentName;
    var sessionAttributes = evt.detail.state.sessionAttributes;
    var responseCard = evt.detail.state.responseCard;
  }
```

### Passing Event Messages from Parent to ChatBot UI
The chatbot-ui-iframe-loader.js script creates an event handler to receive
messages from the parent site that are passed down to the iframe using
postMessage. This handler listens on `lexWebUiMessage` events. The event
object should contain the message in the `details.message` field. The
message should contain an `event` field with the event name. For example,
to dynamically minimize the chatbot UI, you can send a `toggleMinimizeUi`
message from the parent like this:
```javascript
  var event = new CustomEvent(
    'lexWebUiMessage',
    // chatbot ui has a handler for the toggleMinimizeUi event
    { detail: {message: {event: 'toggleMinimizeUi'} } }
  );
  // this event is relayed to the iframe using postMessage
  document.dispatchEvent(event);
```

### ChatBot UI Ready
The chatbot-ui-iframe-loader.js script emits the `lexWebUiReady` event when it has
finished loading the chatbot UI. This event can signal the parent when
it is ready to interact dynamically. You should wait for this event
before you send messages from the parent to the iframe.

For example, the following JQuery snippet sends a ping message once the
chatbot UI is ready:
```javascript
$(document).on('lexWebUiReady', function onUpdateLexState(evt) {
  var event = new CustomEvent(
    'lexWebUiMessage',
    { detail: {message: {event: 'ping'} } }
  );
  document.dispatchEvent(event);
});
```

## Making API Calls Using The LexWebUi Objects
The `lexWebUi` global object (or any `LexWebUi` object) can be used to
manually interact with the chatbot UI interface. This can be used for
more advanced cases than the event based API described above allows
(such as using promises and responding with data).

### LexWebUi Object Methods
The `lexWebUi` object has the following methods that can be used
to interface with the chatbot UI via its API:
- **waitForChatBotReady**: returns a promise that resolves once the
chatbot UI is ready. The promise is rejected after a 15 seconds timeout.
- **sendMessageToIframe**: Used to make API calls from the parent
page to the ChatBot UI as a promise. See the Parent to ChatBot UI API
section below
- **onMessageFromIframe**: Handles API calls initiated from the chatbot
UI. See the ChatBot UI to Parent API section below

For example, you can use the `sendMessageToIframe` method to
programmatically send a text message to the bot using the postText API:
```javascript
lexWebUi.sendMessageToIframe({event: 'postText', message: 'order'})
  .then(() => console.log('message succesfully sent'))
  .catch((error) => console.error(`error ${error}`));
```

## API Details
This section describes the low level API and related sample code. The
chatbot-ui-iframe-loader.js script implements this API as discussed above. You may
want to use the chatbot-ui-iframe-loader.js implementation instead of the examples
here which are meant to be an illustration of how it works under the hood.

### Parent to ChatBot UI API
The chatbot UI receives events from postMessage calls which are used as
an API for functionality in the chatbot UI that can be triggered from
the parent. The API includes a list of event types that are passed to
handlers in the chatbot UI. The event type is included in the `event`
field of the message object sent to the chatbot UI via postMessage. The
responses to these events are sent back in the associated message channel.
These responses include a field named `event` that is set to the string
'resolve' when successful and to 'reject' there was a failure.

The chatbot UI implements the following event types:

- **ping**. Logs a pong response in the console. Used for testing.
- **toggleMinimizeUi**. Toggles from the iframe from being minimized
to maximized. It allows the chatbot UI to be minimized/maximized
programmatically. This works in conjunction with the parent page where
the chatbot-ui-iframe-loader.js script minimizes the iframe by resizing it using CSS.
- **parentReady**. Signals the chatbot UI that the parent has successfully
loaded the chatbot UI and is ready to interact with it.
- **postText**. Injects a text message in the chatbot UI. This
allows to programmatically issue utterances to the bot from the parent
page. The message itself is in the `message` field.

For example, you can use the following code to programmatically minimize
the chatbot UI by sending the toggleMinimizeUi event type:

```javascript
  var iframeContainerClassSelector = '.lex-web-ui';
  var iframeElement = document.querySelector(
    iframeContainerClassSelector + ' iframe'
  );
  var messageChannel = new MessageChannel();

  // event type in event field
  var message = { event: 'toggleMinimizeUi' };
  // origin is a security access control and should be explicitly set
  // as specific as possible
  var iframeOrigin = 'https://chatbotiframe.example.com';

  function sendMessageToIframe(evt) {
    messageChannel.port1.close();
    messageChannel.port2.close();
    // successful message responses include the event field set to 'resolve'
    if (evt.data.event === 'resolve') {
      console.log('iframe successfully handled our message', evt.data);
    } else {
      console.error('iframe failed to handle our message', evt.data);
    }
  };

  messageChannel.port1.onmessage = sendMessageToIframe;

  iframeElement.contentWindow.postMessage(message,
    iframeOrigin, [messageChannel.port2]);
```

### ChatBot UI to Parent API
The chatbot UI sends `message` events to the parent page using postMessage
calls. The parent page should create an event listener in its `window`
object to receive these messages. The event object sent to the message
handler includes its type (or API call) in `data.event` field.

The messages contain a message channel that can be used to respond to
the chatbot UI with data. The responses should include an object with
a field named `event` with the string value of 'resolve' to indicate
that the parent page was successful in handling the event. Otherwise,
set the field value to 'reject'.

The chatbot UI can send the following message containing events or API calls:

- **ready**. Signals to the parent that the chatbot UI component was
successfully initialized
- **getCredentials**. Requests AWS credentials from the parent to be
used for AWS API calls to Lex and Polly. The response to this call should
contain an [AWS Credentials](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Credentials.html)
object (which could be obtained with Cognito)
- **initIframeConfig**. Requests the initial chatbot UI
configuration. This is used to pass a dynamic configuration object to the
iframe. The response to this call should have a configuration object. See
the ChatBot UI Configuration section for details
- **toggleMinimizeUi**. Requests the parent to minimize the ChatBot UI
iframe. This is sent when the ChatBot UI minimize/maximize button is
pressed to signal the parent to resize it accordingly.
- **updateLexState**. Sends Lex Bot state updates to the parent
containing response fields from the
[Lex Runtime Service](http://docs.aws.amazon.com/lex/latest/dg/API_Operations_Amazon_Lex_Runtime_Service.html) calls

Here's an example of how to handle API calls from the chatbot UI:
```javascript
  function onMessageFromChatBot(evt) {
    // origin is a security access control and should be explicitly set
    // as specific as possible
    var iframeOrigin = 'https://chatbotiframe.example.com';

    // security check
    if (evt.origin !== iframeOrigin) {
      console.warn('postMessage from invalid origin', evt.origin);
      return;
    }
    if (!evt.ports) {
      console.error('postMessage not sent over MessageChannel', evt);
      return;
    }

    switch (evt.data.event) {
      case 'updateLexState':
        onUpdateLexState(evt);
        break;
      // other handlers go here
      default:
        console.error('unknown message in event', evt);
        break;
    }
  }

  function onUpdateLexState(evt) {
    // evt.data will contain the Lex state
    console.log('lex state update:', evt.data);
    // send resolve ressponse to the chatbot ui
    evt.ports[0].postMessage({ event: 'resolve', type: evt.data.event });
  }

  function onGetCredentials(evt) {
    // assumes that credential is a valid AWS SDK Credential object
    return credential.getPromise()
      .then(function resolveGetCredentials(creds) {
        evt.ports[0].postMessage({
          event: 'resolve',
          type: evt.data.event,
          data: creds,
        });
      })
      .catch(function onGetCredentialsError(error) {
        console.error('failed to get credentials', error);
        evt.ports[0].postMessage({
          event: 'reject',
          type: evt.data.event,
          error: 'failed to get credentials',
        });
      });
  }

  window.addEventListener('message', onMessageFromChatBot, false);
```

## Configuration
The [chatbot-ui-iframe-loader.js](./chatbot-ui-iframe-loader.js) script can load its configuration
from a JSON file or from an asynchronous event. See below for a description
of each approach.

### Configuration from JSON File
The chatbot-ui-iframe-loader.js] script loads its initial configuration from the JSON
config file: [config.json](./config.json).  This file is meant to be used
as the build-time configuration of the chatbot-ui-iframe-loader.js script. It serves
as the base config so the root level keys in the JSON object should not
be removed.

NOTE: The values in this file may be overwritten by environmental
variables in the build process.

Here's an example of the file format:
```
  {
    // iframe origin - see: Cross Origin Configuration section below
    "iframeOrigin": "http://localhost:8080",

    // controls whether the iframe is loaded minimized or expanded
    "loadIframeMinimized": false,

    // time to wait for the config event in ms
    "configEventTimeOutInMs": 10000,

    // used to initialize the AWS SDK and Cognito
    "aws": {
      "cognitoPoolId": "us-east-1:deadbeef-cac0-babe-abcd-abcdef01234",
      "region": "us-east-1"
    }
    // chatbot UI configuration passed from parent - see: ChatBot UI Configuration section below
    "iframeConfig": {
      ...
      "lex": {
        "sessionAttributes": {
        }
      }
      ...
    }
  }
```

### Configuration Configuration via Event
The parent page can also set the bot loader configuration via an event.
The chatbot-ui-iframe-loader.js script emits the `receivelexconfig` event which
signals to the parent that it is ready to receive a configuration
object. At which point, the chatbot-ui-iframe-loader.js script will wait a 10
seconds timeout (by default) to receive a event named `loadlexconfig`.
Your site should respond to the event if you don't want the bot loader
to wait for the whole duration.  The timeout can be controlled by the
`configEventTimeOutInMs` field in the config JSON file. The event object
contains the config in the `detail.config` field.


The configuration from the JSON file is merged with the value for this
event. The values received via this event take precedence over the
JSON file.

For example, the code below dynamically passes the browser
[user agent](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorID/userAgent),
to the Lex bot as a
[session attribute](http://docs.aws.amazon.com/lex/latest/dg/context-mgmt.html#context-mgmt-session-attribs) which will be merged with the chatbot UI config:
```javascript
document.addEventListener('receivelexconfig', onReceiveLexConfig, false);

function onReceiveLexConfig() {
  document.removeEventListener('receivelexconfig', onReceiveLexConfig, false);
  var config = {
    iframeConfig: {
      lex: {
        sessionAttributes: {
          userAgent: navigator.userAgent,
        },
      },
    },
  };

  var event = new CustomEvent('loadlexconfig', { detail: { config: config } });
  document.dispatchEvent(event);
}
```

### ChatBot UI Configuration
The chatbot UI has its own configuration (see the
[README](https://github.com/awslabs/aws-lex-web-ui/blob/master/lex-web-ui/README.md#configuration-and-customization)
for details. You can also pass or override the chatbot UI configuration
from the parent site via the following mechanisms:

1. **Config Object.** The parent configuration config object (either from
the [config.json](./config.json) file or passed via the `loadlexconfig`
event) contains the `iframeConfig` field which is passed to the chatbot
UI. This configuration is dynamically sent to the chatbot UI as a
response of the the `onInitIframeConfig` message. The values delivered
via this mechanism override the chatbot UI local config files and URL
config parameter.
2. **URL Parameter.** The chatbot UI configuration can be initialized using
the `lexWebUiConfig` URL parameter. For details, see the
[URL Parameter](https://github.com/awslabs/aws-lex-web-ui/blob/master/lex-web-ui/README.md#url-parameter)
section. NOTE: the chatbot-ui-iframe-loader.js script does not pass URL parameters to
the chatbot UI by default. You can override this by dynamically setting
the `iframeSrcPath` option of the `LexWebUiIframe` class.

### Cross Origin Configuration
If the chatbot UI is hosted on a different
[Origin](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
from the parent window, you need to configure the `iframeOrigin` field
in the parent `config.json` file to point to the origin of the iframe. This
origin configuration is used to control which sites can communicate with
the iframe. Conversely, you would need to configure the `ui.parentOrigin`
field in the iframe config. The origin configuration of this sample page
was done at build time by the CloudFormation stack that created it.
