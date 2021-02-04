# Overview
This directory contains the source of a JavaScript loader library used
to integrate the chatbot UI component in an HTML page. The chatbot
UI component is the reusable widget that encapsulates the Lex Web UI
functionality (see its [README](/lex-web-ui/README.md) for details about
the component).

This loader library provides a runtime script used to
integrate the chatbot UI component with a web page. The loader
library assists with the process of adding the component to the
[DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
of a web page and loading its configuration and dependencies. It can be
used to integrate the chatbot UI component into an existing website as
a full page or embedded in an iframe.

# Getting Started
You can test the loader library on a development host using the sample
HTML pages under the [website](website) directory. These sample pages
can be served using a local HTTP server provided by this project (
requires a recent version of Node.js).

## AWS Resources
As a minimum, you need to need a valid [Cognito Identity
Pool](https://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html)
and Lex Bot to use the chatbot UI component. The Cognito Identity
Pool needs to have the right permissions to access the Lex bot (See the
[Credential Management](/lex-web-ui/README.md#credential-management)
section of the chatbot UI component README).

**NOTE:** If you deployed the sample website using CloudFormation or
Mobile Hub as described in the [Deploying](/README.md#deploying) section
of the main README, you can put the Cognito Identity Pool Id and Lex Bot
name created by CloudFormation in the local config. If you already have
a Lex bot and you just want to create a Cognito Identity Pool suitable
for testing, you can use the [cognito.yaml](/templates/cognito.yaml)
CloudFormation template.

## Minimum Configuration
The samples pages can obtain its configuration from the file
[config/lex-web-ui-loader-config.json](config/lex-web-ui-loader-config.json).
Set the Cognito Pool Id and Lex Bot name in the file:

```javascript
// file: /src/config/lex-web-ui-loader-config.json
...
  "cognito": {
    "poolId": "<my cognito pool id>"
...
  "lex": {
    "botName": "<my bot name>"
...
```

## Install
Before you run the test server, you have to install its dependencies by
running the following command from the root directory of the repo:
```
npm install
```

## Run Test Server
Once you have the right config, you can run the test HTTP server on:
`http://localhost:8000` by executing the following command under the
root directory of this repo:
```shell
npm start
```

The sample pages available from the test server include
[index.html](website/index.html) and [parent.html](website/parent.html)
which demonstrate how to load the chatbot UI component as a full page
or as an iframe respectively.

# Loader Library
The sample pages in this repository, use a JavaScript library to load
the chatbot UI component. You can use this library on your website to add
the chatbot UI as a full page or as an iframe. The source of this library
is found under the [lex-web-ui-loader](lex-web-ui-loader) directory.

## Functionality
In essence, the loader performs the following functions:
1. Loads the chatbot UI configuration. The UI's look-and-feel
(e.g. colors, titles) and resources (e.g. Lex bot name, Cognito Pool
Id) can be configured from various sources (e.g. JSON files, events
or programmatically). The loader can be used to control
how the config is loaded. See: [Chatbot UI Configuration
Loading](#chatbot-ui-configuration-loading)
2. Loads the chatbot UI component JavaScript and CSS files.
The chatbot UI component depends on various script and CSS files
including third-party libraries (e.g. AWS SDK, Vue.js). The loader
takes care of automatically adding these dependencies as well. See:
[Dependencies Loading](#dependencies-loading)
3. Creates an API between the parent and iframe when running the chatbot
UI embedded in a page. See: [Iframe API](#iframe-api)
4. Instantiates the chatbot UI component and adds it to the DOM

## Including the Library
In its most simple form, you can copy the files in the `dist` directory
to your web server and include the loader script in your HTML page:
```html
<!-- loader library script -->
<script src="./lex-web-ui-loader.js"></script>
<!--
  at this point the library global object `ChatBotUiLoader` is present
  and the library is ready to be used to load the chatbot UI
-->
```
**NOTE:** This project provides automated ways to deploy the files and
configuration to an S3 bucket so that you do not have manually copy or
change files. See: [Deploying](/README.md#deploying).

The `lex-web-ui-loader.js` script in the `dist` directory is a pre-built
version of the loader library described in this page. The library is
built using [webpack](https://webpack.js.org/) (see [dependencies and
build setup](#dependencies-and-build-setup)). When you add the library
script to your page, it creates a global object that is used to load
the chatbot UI component.

## Global Object
The loader script creates a global object named `ChatBotUiLoader`. In
turn, this object contains two fields that are constructors used to
create a loader object depending on the use case:
1. `FullPageLoader`. Loads the chatbot UI as a full page. See the [Full
Page](#full-page) section for details
2. `IframeLoader`. Loads the chatbot UI as an iframe in a parent page. See
the [Iframe Embedding](#iframe-embedding) for details

An instance of the loaders can be used to load the chatbot UI by calling
its `load` function. For example:
```javascript
// lex-web-ui-loader.js has already been included
// load as a full page using default values
new ChatBotUiLoader.FullPageLoader().load();
```

## Usage
To use the loader library, you 1) instantiate a loader object and 2)
call the `load` function of this object. See the next two sections for
quick examples of these steps.

### Instantiate the Loader
You first need to instantiate a loader object with one of constructors
depending on the use case (full page or iframe). Please note that
instantiating the loader does not load the chatbot UI component. It
creates an object that is used to load the component.

The loader constructors takes an options parameter used to control how
the chatbot UI component will load. You can see the available options and
defaults in the [Loader Constructor Options](#loader-constructor-options)
section.

For example:
```javascript
var loaderOpts = {
  shouldLoadConfigFromJsonFile: true,
  configUrl: 'https://mysite.example.com/configs/lex-web-ui-loader-config.json',
  shouldLoadConfigFromEvent: true,
  configEventTimeoutInMs: 3000,
};

// Instantiate the loader by optionally passing the loader options to
// control its behavior
var loader = new ChatBotUiLoader.FullPageLoader(loaderOpts);
```

### Call the Load Function
Once you have an instance of the loader, you call the
`load` function to trigger the load process as described in the
[Functionality](#functionality) section above. The load function takes a
chatbot UI component configuration object as an argument. This argument
is merged with the configuration passed from other sources (e.g. JSON
file, event) and overrides their values. For details see: [Chatbot UI
Configuration Loading](#chatbot-ui-configuration-loading) section.

For example:
```javascript
// continuation from script above
// override the toolbar title
var chatbotUiConfig = {
  ui: {
    toolbarTitle: 'My Bot'
  }
};

// pass chatbot UI config to load function
loader.load(chatbotUiConfig)
  // returns a promise that is resolved once the chatbot UI is loaded
  .then(function () {
    console.log('chatbot UI loaded');
  })
  .catch(function (error) {
    console.error('chatbot UI failed to load', error);
  });
```

## Loader Constructor Options
The `FullPageLoader` and `IframeLoader` constructors take an option
parameter with the following fields:

```javascript
var options = {
  // base URL to be prepended to relative URLs of dependencies
  // if left empty, a relative path will still be used
  baseUrl: '/',

  // time to wait for config event
  configEventTimeoutInMs: 10000,

  // URL to download config JSON file
  // uses baseUrl if set as a relative URL (not starting with http)
  configUrl: './lex-web-ui-loader-config.json',

  // controls whether the local config should be ignored when running
  // embedded (e.g. iframe) in which case the parent page will pass the config
  // Only the parentOrigin config field is kept when set to true
  shouldIgnoreConfigWhenEmbedded: true,

  // controls whether the config should be obtained using events
  shouldLoadConfigFromEvent: false,

  // controls whether the config should be downloaded from `configUrl`
  shouldLoadConfigFromJsonFile: true,

  // controls whether the config should be downloaded from Mobile Hub aws-config.js
  shouldLoadConfigFromMobileHubFile: true,

  // Controls if it should load minimized production dependecies
  // defaults to true for production builds and false in development
  shouldLoadMinDeps: false,

  // DOM element ID where the chatbot UI will be mounted
  // defaults to 'lex-web-ui-fullpage' in full page mode
  // and 'lex-web-ui-iframe' in iframe mode
  elementId: 'lex-web-ui-fullpage',

  // div container class to insert iframe
  containerClass: 'lex-web-ui-iframe',

  // iframe source path. this is appended to the iframeOrigin
  // must use the LexWebUiEmbed=true query string to enable embedded mode
  iframeSrcPath: '/index.html#/?lexWebUiEmbed=true',
};
```

## ChatBot UI Configuration Loading
The chatbot UI component (the actual widget rendered in a web page)
supports a number of configuration and customization options. The loader
library in this directory facilitates passing this config to the component.

### Config Object
The config object passed by the loader to the component has the
same structure as the component's base config. For a list of
fields and default values see `configDefault` object in the:
[/lex-web-ui/src/config/index.js](/lex-web-ui/src/config/index.js) file.

### Configuration Sources
The loader library can use various sources to compose the chatbot
UI component config. The configuration values from these sources are
merged in order of precedence into a single object that is passed to the
component when it gets created. Here is a list of the configuration
sources in order of precedence (lower overrides higher):

1. [Load Function Parameter](#load-function-parameter)
2. [Event Based Config](#event-based-config)
3. [Mobile Hub Config script](#mobile-hub-config-script)
4. [JSON File Config](#json-file-config)

See the sections below for a description of each.

#### Load Function Parameter
The config can be passed as a parameter to the `load` function of the
loader instance. This is used when you want to have a programmatic way
to directly override the chatbot UI component config through the loader
instance just before the component is instantiated. See the example in
the [Call the Load Function](#call-the-load-function) section for an
illustration of how to pass this parameter.

#### Event Based Config
The loader library can use events to pass a config object to the
chatbot UI component. This is useful when you want an asynchronous and
decoupled way to pass a the config. This mechanism is disabled by
default and can be enabled by setting the `shouldLoadConfigFromEvent`
[loader constructor option](#loader-constructor-options) to `true`.

At creation time, the chatbot UI
component emits the `receivelexconfig` [custom
event](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)
which sends a signal to the loader that the component is ready to receive
a configuration object. When `shouldLoadConfigFromEvent` is enabled,
the loader waits for a 10 seconds timeout (default) to receive this
event. The timeout can be controlled by the `configEventTimeOutInMs`
field in the constructor options.

Once you have received the `receivelexconfig` event, you send the
configuration by emitting a `loadlexconfig` event with the config object
contained in the `detail.config` field.

For example, the code below dynamically passes the browser
[user agent](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorID/userAgent),
to the Lex bot as a
[session attribute](http://docs.aws.amazon.com/lex/latest/dg/context-mgmt.html#context-mgmt-session-attribs) which will be merged with the chatbot UI config:
```javascript
document.addEventListener('receivelexconfig', onReceiveLexConfig, false);

function onReceiveLexConfig() {
  document.removeEventListener('receivelexconfig', onReceiveLexConfig, false);
  var config = {
    lex: {
      sessionAttributes: {
        userAgent: navigator.userAgent,
      },
    },
  };

  var event = new CustomEvent('loadlexconfig', { detail: { config: config } });
  document.dispatchEvent(event);
}
```

#### Mobile Hub Config Script
The loader can obtain the Cognito Identity Pool
id and Lex bot name from config variables set
by the Mobile Hub `aws-config.js` script. See [Hosting and
Streaming](https://docs.aws.amazon.com/aws-mobile/latest/developerguide/hosting-and-streaming.html)
for a description of Mobile Hub project configuration files. When using
Mobile Hub, the `aws-config.js` file is dynamically created and managed
for you by the service.

By default, the loader library automatically includes the
`aws-config.js` script file if present in the same directory
as the loader JavaScript file. This behavior can be disabled by
setting the `shouldLoadConfigFromMobileHubFile` [loader constructor
option](#loader-constructor-options) to `false`. The loader references
the Mobile Hub `aws_bots_config` and `aws_cognito_identity_pool_id`
variables made global by `aws-config.js`. The values of these variables
are merged with the chatbot UI component config. See a sample of the
Mobile Hub config script: [aws-config-.js](config/aws-config.js).


#### JSON File Config
The configuration object can be sourced from a JSON file. By default,
the loader fetches a file named `lex-web-ui-loader-config.json` in the
same directory where the library resides and merges its values into the
config object.

See the
[lex-web-ui-loader-config.json](../config/lex-web-ui-loader-config.json)
file for a sample of its structure. The URL of the JSON file
is controlled by the `configUrl` [loader constructor
option](#loader-constructor-options). Please
note that if the URL points to another
[Origin](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy),
the web server needs to correctly set
[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
[Access Controls
Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin).

## Dependencies Loading
The loader library dynamically adds the chatbot UI component files and
its runtime dependencies (e.g. Vue.js, Vue, Vuetify, AWS SDK) to the
DOM. By default, the chatbot UI runtime dependencies are loaded from
third-party CDNs. (**NOTE:** You may want to host these third-party
dependencies on your own site for production.)

The chatbot UI component is provided as pre-built JavaScript
and CSS files under the [/dist](/dist) directory (`lex-web-ui.*`
files). The loader uses those files to load the chatbot UI. At
runtime, the chatbot UI depends on third party libraries (see the
[dependencies](/lex-web-ui/README.md#dependencies) section of the
component README file for details).

The URLs and load order of these dependencies are controlled
by the `dependencies` option of the loader constructor. You
can see the structure and defaults of this option in the
[dependencies.js](/lex-web-ui-loader/js/defaults/dependencies.js) file.

By default, the chatbot UI component files are added from a relative URL.
If you want to point the dependencies to another URL, you can use the
`baseUrl` option of the loader constructor. For example:
```javascript
var loaderOpts = {
  baseUrl: 'https://my-cdn.example.org/'
}

var new iframeLoader = new ChatBotUiLoader.IframeLoader(loaderOpts);

// when you call iframeLoader.load(), it will obtain the chatbot UI
// component files relative from baseUrl
```

# Full Page
The loader library can render the chatbot UI component to take the full
size of a page. This can be used when you want to pop-up the chatbot
on a dedicated page. The [index.html](website/index.html) file under the
`website` directory shows how to load the chatbot UI as a full page.

## Loading the ChatBot UI as a Full Page Component
Here is an HTML snippet showing how to render the chatbot UI as a full page:
```html
  <!--
    Add the loader library to the page.
  -->
  <script src="./lex-web-ui-loader.js"></script>
  <!--
    Loader script creates a global variable named ChatbotUiLoader.
  -->
  <script>
    // ChatBotUiLoader contains the FullPageLoader constructor
    var lexWebUiLoader = new ChatBotUiLoader.FullPageLoader();

    // An instance of FullPageLoader, by default, loads the chatbot UI
    // config from ./chatbot-ui-loader-config.json and/or ./aws-config.js
    // These config files point to the Lex bot, Cognito Pool and other
    // chatbot UI configurable features.
    // If those config files are present whith the appropriate configuration,
    // the load function will load the chatbot UI component.
    lexWebUiLoader.load();
  </script>
```

For greater configuration control, you can pass options to the loader
and configuration to the chatbot UI component:
```html
  <!-- LexWebUi loader -->
  <script src="./lex-web-ui-loader.js"></script>
  <script>
    // loader options control how the loader obtains the config and
    // dependencies. It can be optionally passed as an argument to the
    // FullPageLoader constructor to override the defaults
    var loaderOptions = {
      shouldLoadConfigFromMobileHubFile: false,
      configUrl: './chatbot-ui-loader-config-2.json'
    };

    // instantiate the loader
    var lexWebUiLoader = new ChatBotUiLoader.FullPageLoader(loaderOptions);

    // this config is used to pass run-time configuration to the chatbot UI
    // as an argument to the load() function. The config passed through
    // load() is merged with the config from other sources and overrides
    // their values
    var chatbotUiconfig = {
     cognito: {
       poolId: 'us-east-1:deadbeef-fade-babe-cafe-0123456789ab'
     },
     lex: {
        initialText: 'How can I help you?',
        botName: 'helpBot'
      },
      ui: {
        toolbarTitle: 'Help Bot',
        toolbarLogo: ''
      },
    };
    // You can pass the config as a parameter.
    // The loader can also get its config dynamically
    // from a JSON file or from the Mobile Hub config script
    lexWebUiLoader.load(chatbotUiConfig)
      // returns a promise that is resolved once the chatbot UI is loaded
      .then(function () {
        console.log('chatbot UI loaded');
      })
      .catch(function (error) {
        console.error('chatbot UI failed to load', error);
      });
   </script>
```
## Full Page API - Preview
Several requests were made to enable an API when using the Full Page mode 
to directly utilize the VUE component. There are two approaches to satisfying 
this need. The first would be to access the component using the Vue Global 
registration of the component. The methods and properties available for 
the component then become available to the client including the LexClient. 
The VueComponent would be directly accessed to post a text message to Lex.
If not using VUE this approach becomes more difficult.  

The second approach as an alternative is to use a new API available in 
preview mode. This API is available from the FullPageComponentLoader 
(fullpage-component-loader.js). 

The API supports two operations

* ping()
* postText(message)

Differing from the Iframe API, both operations complete asynchronously returning 
immediately. Ping will be responded to by the VUE component with a "pong" message. 

postText(message) will invoke the Lex API and call postText against Lex. No return or 
confirmation is supplied. 

```aidl
  var Loader = ChatBotUiLoader.FullPageLoader;
  var loaderOpts = {
  };
  var loader = new Loader(loaderOpts);
  var chatbotUiConfig = {
      lex: {
        sessionAttributes: {
          userAgent: navigator.userAgent
        }
      }
  };
  loader.load(chatbotUiConfig);
  
  ...
  ...
  ...
    
  **loader.compLoader.ping();**
  
  **loader.compLoader.postText("Hello");**
  
```
The use of loader.compLoader.ping() or loader.compLoader.postText("message") are 
examples of invoking the API. 

Please provide feedback on the use of this API. 

# Iframe Embedding
The loader library can add the chatbot UI component to an existing page
as an iframe. This works by dynamically creating an iframe that wraps
the [full page](#full-page) setup described above. This is used when you
want to embed the chatbot UI as a contained widget in an existing page.

This approach also provides an API that allows interaction
between the hosting parent page and the chatbot UI component. The
[parent.html](website/parent.html) file in the `website` directory is
a sample implementation of embedding the chatbot UI in an iframe.

## Iframe Config Field
In addition to the chatbot UI component config described in the [ChatBot
UI Configuration Loading](#chatbot-ui-configuration-loading) section,
the loader library supports an extra config field named `iframe` that
provides control of the iframe loading process.

```javascript
{
  // same fields as the lex-web-ui component
  lex: {...},
  ...
  ui: {
    // controls which origin can communicate and load the chatbot UI
    parentOrigin: 'https://parentpage.example.com',
  },
  ...
  // add an iframe field used when embedding in an iframe
  iframe: {
    // origin of the iframe containing the chatbot UI
    iframeOrigin: 'https://iframe.example.com',

    // Path and url query string used to point where
    // where the page chatbot UI page is located and to indicate that
    // the component is loading as an iframe.
    // This is appended to iframeOrigin
    iframeSrcPath: '/index.html#/?lexWebUiEmbed=true',

    // indicates if the chatbot UI in the iframe should load minimized
    shouldLoadIframeMinimized: true,
  }
}
```

### Cross Origin Configuration
As you may have noticed in the example above, the iframe can be loaded
using a cross-origin setup where the parent page and iframe are hosted
on different
[Origins](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).
For this setup to work, you need to configure the correct origins in
the `iframeOrigin` field under the `iframe` key and the `parentOrigin`
under the `ui` key.

This configuration is used to control which parent sites can communicate
with the iframe and vice-versa. When deploying with the CloudFormation
[templates](/templates) from this project, the origin fields are
automatically set in the loader JSON config file.

**SECURITY NOTE:** You should set the origin fields to
be as specific as possible to prevent unauthorized hosts
from interacting with your page. See details in the [data
passing](#passing-data-between-the-parent-page-and-the-chatbot-ui)
section of the API.

## Adding the ChatBot UI to your Website as an Iframe
The snippet below is a cross-origin example showing how to load the
iframe to an existing page. In this example, you host the loader and
chatbot UI files in a separate web server (this can be an S3 bucket or
a CloudFront distribution). This web server must hold all the JavaScript
and CSS files in the [/dist](/dist) directory.

**NOTE:** This project provides automated ways to deploy the files and
configuration to an S3 bucket so that you do not have manually copy
them. See: [Deploying](/README.md#deploying).

```html
  <!--
    Add a script tag pointing to the loader library towards the bottom
    of the html BODY section

    The library and its dependencies can be hosted on another site,
    S3 bucket or a CDN (e.g. CloudFront)

    This script creates a global variable named ChatbotUiLoader which
    provides the loader library functionality
  -->
  <script src="https://iframe-host.example.org/lex-web-ui-loader.js">
  </script>

  <!--
    After the loader script tag has been included, you can use it to
    load the chatbot UI in an iframe
  -->
  <script>
    // Point the baseUrl to download the dependencies from the site hosting
    // the loader and the chatbot UI files
    // This url should host the JavaScript and CSS files in the dist directory
    var loaderOpts = {
      baseUrl: 'https://iframe-host.example.org/'
    }
    // ChatBotUiLoader contains the IframeLoader constructor
    // Instantiate the loader and pass the loader options
    var lexWebUiLoader = new ChatBotUiLoader.IframeLoader(loaderOpts);

    // You can override the chatbot UI config by passing a parameter
    // if the iframe page is hosted on a different site,
    // you should configure the parentOrigin and iframeOrigin
    var chatbotUiconfig = {
      ui: {
        // origin of the parent site where you are including the chatbot UI
        parentOrigin: 'https://mysite.example.org'
      },
      iframe: {
        // origin hosting the HTML file that will be embedded in the iframe
        iframeOrigin: 'https://iframe-host.example.org'
      }
    };

    // load the iframe
    lexWebUiLoader.load(chatbotUiconfig)
      .catch(function (error) {
        console.error('chatbot UI failed to load', error);
      });
  </script>
```

## Iframe API
The loader library provides an API that can be used to dispatch actions
from the parent page to the chatbot UI iframe (e.g. send text content
to the bot) or to receive requests from the chatbot UI iframe (e.g. get
credentials).

This API can be invoked by using events and/or functions in an instance of
`IframeLoader`. It enables use cases such as:
- Passing credentials from the parent hosting site to the chatbot iframe
- Programmatically sending a text message to be sent to the bot by the
chatbot UI
- Passing events (e.g. windows minimize) from the chat window to the
parent window

The API can be used with two mechanisms:
1. [Iframe Loader API functions](#iframe-loader-api-functions). The
loader object created with `IframeLoader` has a set of functions that
can be used to call actions in the chatbot UI component
2. [Iframe Loader Event Based API](#iframe-loader-event-based-api). The
loader library transparently relays events to and from the chatbot UI
component. You can use these events to receive updates from the iframe
or to emit action events to the chatbot UI

### Iframe Loader API Functions
Instances of `IframeLoader` have a field named `api` which contains
functions used invoke actions in the chatbot UI component. These functions
return a promise that is resolved when the function is successfully
completed or rejected if there was an issue.

This is a list of the available functions:

1. `posText(testMessage)`. Sends an utterance to the bot using the
chatbot UI this is equivalent to a user actually writing the message in
the chatbot UI
2. `toggleMinimizeUi()`. Toggles the chatbot UI between being minimized
and maximized
3. `ping()`. Tests communication with the chatbot UI component
4. `startNewSession()`. Builds a new Lex Session and sets the Bot to elicit an intent
5. `deleteSession()`. Calls the Lex DeleteSession api to terminate a Lex session

You can use it like this:
```javascript
var lexWebUiLoader = new ChatBotUiLoader.IframeLoader();

// you should wait until the chatbot UI component is loaded
// before using the API. The load function is a promise that
// resolves once the component is fully loaded
lexWebUiLoader.load()
  .then(function () {
    // test communication channel
    return lexWebUiLoder.ping();
  })
  .then(function () {
    // toggles chatbot UI between minimize and maximized
    return lexWebUiLoader.api.toggleMinimizeUi()
  })
  .then(function () {
    // send an utterance to the bot
    return lexWebUiLoader.api.postText('Buy flowers')
  })
  .catch(function (error) {
    console.error('oops... ', error);
  });
```

### Iframe Loader Event Based API
The `lex-web-ui-loader.js` loader script relays messages to
and from the chatbot UI component using events. It serves as a
proxy to the low level postMessage mechanism discussed in the
[Iframe API Details](#iframe-api-details) section. It works by using [custom
events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)
and [event
listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
in the parent page that pass data to and from the low level message
interface.

#### Lex State Updates From Iframe
The chatbot UI iframe sends Lex bot state update events to the parent
site via postMessage. This can be used to have the parent react to the
dialog state of the bot. An instance of `IframeLoader` creates an event
handler to receive these messages and relays them back to the parent
by emitting `updatelexstate` events. Thes event objects contain the Lex
state variables in the `details.state` field.

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

#### Passing Event Messages from Parent to ChatBot UI
The `lex-web-ui-loader.js` script creates an event handler to receive
messages from the parent site that are relayed down to the iframe using
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

#### ChatBot UI Ready
The `lex-web-ui-loader.js` script emits the `lexWebUiReady` event when it
has finished loading the chatbot UI. This event signals the parent that
the chatbot UI component it is ready to interact dynamically. You should
wait for this event before you start sending messages to the iframe.

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

## Iframe API Details
This section describes the chatbot UI component low level API used when
it runs in embedded mode (iframe). The `lex-web-ui-loader.js` loader
script implements this low level API and provides a compatibility layer
using functions and event (See [Iframe API](#iframe-api)). You may want
to use that compatibility layer instead of the examples here which are
meant to be an illustration of how it works under the hood. This section
is meant to provide details to someone trying to re-implement the loader
API functionality.

### Passing Data between the Parent Page and the ChatBot UI
The chatbot UI component activates an API when the page loading it has
the `lexWebUiEmbed` URL query parameter set to `true`. This API can be
used to pass data to and from a hosting parent page. This is done using
the JavaScript
[postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
call. The messages use the
[MessageChannel](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel)
API to asynchronously send responses to the events. The API can pass data
between the parent hosting site and the chatbot UI using a dedicated
message channel in each event. It also uses the message channel to
respond an event as resolved or rejected to pose as a
[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

**SECURITY NOTE:** Passing messages with postMessage can work in a
cross-origin setup where the iframe is hosted in a domain/origin different
from the parent site. The chatbot UI component (`lex-web-ui.js`) and the
loader (`lex-web-ui-loader.js`) scripts validate the event Origin against
configured values as a security access control measure. This avoids
unauthorized sites posting arbitrary messages to your site or posing as
the chatbot UI. Make sure to use origins as specific as possible.

### Parent to ChatBot UI API
The chatbot UI component receives events from postMessage calls which are
used as an API for functionality in the chatbot UI that can be triggered
from the parent. The API includes a list of event types that are passed
to handlers in the chatbot UI. The event type is included in the `event`
field of the message object sent to the chatbot UI via postMessage. The
responses to these events are sent back in the associated message channel.
These responses include a field named `event` that is set to the string
`resolve` when successful and to `reject` there was a failure.

The chatbot UI component implements the following event types:

- **ping**. Logs a pong response in the console. Used for testing
- **toggleMinimizeUi**. Toggles the iframe from being minimized
to maximized and vice-versa. It allows the chatbot UI to be
minimized/maximized programmatically. This works in conjunction with
the parent page where the `lex-web-ui-loader.js` script minimizes the
iframe by resizing it using CSS
- **parentReady**. Signals the chatbot UI that the parent has successfully
loaded the chatbot UI and is ready to interact with it
- **postText**. Injects a text message in the chatbot UI. This
allows to programmatically issue utterances to the bot from the parent
page. The message itself is in the `message` field

For example, you can use the following code to programmatically minimize
the chatbot UI by sending the toggleMinimizeUi event type:

```javascript
  var iframeContainerClassSelector = '.lex-web-ui-iframe';
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
a field named `event` with the string value of `resolve` to indicate
that the parent page was successful in handling the event. Otherwise,
set the field value to `reject`.

The chatbot UI supports the following messages:

- **ready**. Signals to the parent that the chatbot UI component was
successfully initialized
- **getCredentials**. Requests AWS credentials from the parent to be
used for AWS API calls to Lex and Polly. The response to this call should
contain an [AWS Credentials](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Credentials.html)
object (which could be obtained with Cognito)
- **initIframeConfig**. Requests the initial chatbot UI
configuration. This is used to pass a dynamic configuration object to the
iframe. The response to this call should have a configuration object. See
the [Config Object](#config-object) section for details
- **toggleMinimizeUi**. Requests the parent to minimize the ChatBot UI
iframe. This is sent when the ChatBot UI minimize/maximize button is
pressed to signal the parent that it should resize the iframe accordingly
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

### Iframe Loader Object Methods
Instances of `IframeLoader` have the following methods that can be used
to interact with the chatbot UI component postMessage interface:
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
var lexWebUiLoader = new ChatBotUiLoader.IframeLoader();
lexWebUiLoader.sendMessageToIframe({event: 'postText', message: 'order'})
  .then(() => console.log('message succesfully sent'))
  .catch((error) => console.error(`error ${error}`));
```

# Dependencies and Build Setup
If you want to hack the loader library code under
[lex-web-ui-loader](lex-web-ui-loader), you
would need to install the project dependencies using
[npm](https://www.npmjs.com/). The build files are bundled using
[webpack](https://webpack.js.org/). The development environment provides
a [Webpack DevServer](https://webpack.js.org/configuration/dev-server/)
configuration to automatically bundle and hot reload changes while you
make changes.

``` bash
# install dependencies
npm install

# serve the sample site with hot reload at localhost:8000
npm run dev

# build the library
npm run build
