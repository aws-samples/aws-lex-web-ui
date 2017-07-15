# Lex Chatbot Web Interface

> Sample Lex Chatbot Web Interface Application

## Overview
This application provides a sample chatbot web interface for [Amazon
Lex](https://aws.amazon.com/lex/). It is a responsive user interface that
can be run as a mobile friendly stand-alone web app or embedded into an
existing site using an iframe. The interface supports interacting with
Lex using text and voice.

## Application Architecture
The chatbot interface is a JavaScript driven web application.
It works by making calls to the Lex service directly from a
user's browser using temporary credentials obtained from [Amazon
Cognito](https://aws.amazon.com/cognito/). This allows the chatbot web app
to be served from S3 or CloudFront in a scalable serverless architecture.

The chatbot web app is built using the [Vue.js](https://vuejs.org/)
JavaScript framework. The user interface is structured as modular
components using [Vuetify.js](https://vuetifyjs.com/). The application
state management is done using [Vuex](https://vuex.vuejs.org/en/). The
code base employs ECMAScript 6 (ES6) features such as modules, arrow
functions and classes to improve modularity and brevity.

## Embedding as an iframe
This project includes a sample script that can be used to embed
the chatbot UI in a parent hosting site using an iframe. The chatbot UI uses a
[postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
and
[MessageChannel](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel)
based API to establish a bi-directional asynchronous communication
channel between the parent and the iframe. For details, please refer to
the README and the files in the
[static/iframe](static/iframe) directory.

## Credential Management
This sample application uses [Amazon
Cognito](https://aws.amazon.com/cognito/) to provide temporary AWS
credentials for use with the Lex and Polly services.

The accompanying CloudFormation stack in this project, automatically
creates a
[Cognito Identity Pool](http://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html)
for you. If you want to manually use your own Cognito Identity Pool,
you will need to link a role to it. The associated role should
allow access to the Lex PostText/PostContent API calls and Polly
SynthesizeSpeech.

## Voice Support
Users can interact with the bot using voice on compatible browsers.
The application uses the
[getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
call from the
[WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
API to record the voice interaction from the browser.

The audio recorder (based on
[Recorderjs](https://github.com/mattdiamond/Recorderjs)
is implemented using the
[Web Audio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
API to detect silence and to process the audio. Processing supports
optional frequency filtering around the human voice to reduce noise.
It automatically encodes the sound in PCM WAV file format using a
[Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).
The web worker also resamples the audio and optionally trims silence in
the beginning and end of the recording to make the sound files smaller
and to achieve faster network transfers.

The encoded sound is automatically passed to the Lex service. In turn,
Lex performs automatic speech recognition (ASR), natural language
understanding (NLU), transcription and bot processing.

The voice interaction has been tested with recent versions of Chrome
and Firefox on both PC and Mac desktops plus Microsoft Edge on PCs. It
is also compatible with Android devices using Chrome and FireOS Tablets
using Silk. Safari and iOS devices do not support WebRTC yet so voice
interaction is not enabled in that platform. For compatibility, see:
[caniuse webrtc](http://caniuse.com/#search=webrtc)

NOTE: browsers may require the application to be served using HTTPS for
the WebRTC API to work. Make sure to serve the application from an HTTPS
enabled server or if hosting on S3 or CloudFront, use https in the URL.

## Configuration and Customization
The web ui supports configuration from 1) config files, 2) URL query
parameter and 3) via `postMessage` when running in an iframe. The
configuration is overriden in that order where the latter takes
precedence.

The application requires configuration of resources such as the Lex
Bot name and the Cognito Identity Pool ID that may be dynamically
created. Additionally, you may want to change the default configuration
or pass dynamic parameter at run time. See the configuration mechanisms
listed below for details.

### Default configuration
Various aspects of the chatbot UI web app can be configured in the
[default config](src/config/index.js) file. This includes UI details
such as colors, titles and text fields and Lex bot configuration.

### Environment Configuration
To run this sample web UI, you are going to need externally created
resources such as the Lex Bot name and the Cognito Identity Pool ID
(this repo includes CloudFormation templates to create the Cognito
resources). These parameters can be passed to the application using a JSON
config file under the `src/config` directory. The default configuration
values in the `src/config/index.js` file can be overriden with this JSON
config file.

The JSON config file should contain the the same key/value structure
as the `configDefault` object in the `src/config/index.js` file. The
content of the JSON config is merged with the values of `configDefault`
overriding any defaults.

The JSON config files reside under the `src/config` directory. They
follow the naming convention: `config.<ENV>.json` where `<ENV>`
depends on the on the environment type as determined by the `NODE_ENV`
environmental variable (e.g. development, production). This allows to
pass a configuration that is specific to the specific build or runtime
environment.  The files follow this directory structure:

```
.
|__ src
   |__ config
      |__ config.dev.json   # local development config
      |__ config.prod.json  # production config
      |__ config.test.json  # testing config
```

Here's an example of the `config.dev.json` file:

```
{
  "cognito": {
    "poolId": "us-east-1:deadbeef-cac0-babe-abcd-abcdef01234",
  },
  "lex": {
    "bot": "MyLexBotName",
    ...
  },
  "ui": {
    "parentOrigin": "http://localhost:8080",
    ...
  }
}
```

### Dynamic Configuration
#### URL Parameter
The chatbot UI configuration can be initialized using the `config` URL
parameter. This is supported both in iframe and stand-alone mode of the
chatbot UI.

The `config` URL parameter should follow the same JSON structure of the
`configDefault` object in the `src/config/index.js` file. This parameter
should be a JSON serialized and URL encoded JavaScript object. Values
from this parameter override the ones from the environment config files.

For example to change the initialText config field, you can use a URL
like this:

`https://mybucket.s3.amazonaws.com/index.html#/?config=%7B%22lex%22%3A%7B%22initialText%22%3A%22Ask%20me%20a%20question%22%7D%7D`

### Iframe Config
When running in an iframe, the chatbot UI can obtain its config from the
parent page. Additionally, the parent page has its own config. Please
refer to the README in the [static/iframe](static/iframe) directory
for details.

### Playback Options
The voice responses from the Lex `postContent` API calls are automatically
played back. The chatbot UI provides options to control the playback.
For example, you can allow to interrupt the playback of long responses and
fine tune the various values associated with interruptions:

```
...
lex: {

  // allow to interrupt playback of lex responses by talking over playback
  enablePlaybackInterrupt: true,

  // microphone volume level to cause an interrupt
  // lower values makes interrupt more likely
  playbackInterruptVolumeThreshold: -60,

  // only allow to interrupt playback longer than this value (in seconds)
  playbackInterruptMinDuration: 3,
}
...
```

### Logos
You can change the default logo and favorite icon images by placing
your own images in `src/assets/logo.(png|jge?g|svg)` and
`src/assets/favicon.(png|jpe?g|svg|ico)`
respectively. The favorite icon is set to the logo image if the
`src/assets/favicon.*` file is not found.

Alternatively, you can set the `ui.toolbarLogo` and `ui.favIcon` fields
in the config files to an image URL.

### Lex Session Attributes
The Lex service supports
[session attributes](http://docs.aws.amazon.com/lex/latest/dg/context-mgmt.html#context-mgmt-session-attribs)
as a way to pass application context to a bot or to share information
accross intents. This chatbot UI passes the `sessionAttributes` parameter
to the Lex API and automatically updates it from the bot responses.

The `sessionAttributes` parameter can be initialized so that the client
passes a value in the first request. This is supported both in iframe
and stand-alone mode of the chatbot UI.

### Response Cards
The chatbot UI supports Lex
[Response Cards](http://docs.aws.amazon.com/lex/latest/dg/ex-resp-card.html).
For Lex `postText` API calls, response cards are supported natively.
When using the `postContent` API call, response cards can be passed
using session attributes in the `appContext.responseCard` key of the
`sessionAttributes` object. For example, the following python snippet
can be used in a Lambda code hook to add a responseCard in a postContent
API call:

```python
response['sessionAttributes']['appContext'] =
    json.dumps({'responseCard': response_card})
```

For details about the response cards format,
see the
[ResponseCard documentation](http://docs.aws.amazon.com/lex/latest/dg/API_runtime_ResponseCard.html).

## Dependencies and Build Setup
The application dependencies are managed using
[npm](https://www.npmjs.com/). The build artifacts are bundled using
[webpack](https://webpack.js.org/). Initial scaffolding of this project
was done with [vue-cli](https://github.com/vuejs/vue-cli).

For detailed explanation on how things work, checkout the
[guide](http://vuejs-templates.github.io/webpack/) and
[docs for vue-loader](http://vuejs.github.io/vue-loader).

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

### NOTE: tests are not implemented

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
