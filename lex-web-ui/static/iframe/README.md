### Overview
The chatbot UI can be embedded in an existing web site by loading it as
an iframe. This includes embedding it in a cross-origin setup where the
chatbot is served from a server, S3 bucket or CloudFront distribution
in a domain that is different from the hosting web site.

If you want to know more about the chatbot UI component, please refer to
its [README](https://github.com/awslabs/aws-lex-web-ui/blob/master/lex-web-ui/README.md) file.

### Adding the ChatBot UI to your Website
This project provides a sample JavaScript loader
[bot-loader.js](./bot-loader.js") and CSS file [bot.css](./bot.css)
that can be used to add the chatbot to an existing web site using a
dynamically created iframe. This can be done by adding a couple of HTML
tags to your web page:

```html
  <!-- add CSS link inside the HEAD tag -->
  <link rel="stylesheet" type="text/css" href="https://myboturl.example.com/static/iframe/bot.css">

  <!-- add script tag towards the bottom of the html BODY section -->
  <script src="https://myboturl.example.com/static/iframe/bot-loader.js"></script>
```

### Passing Data Between Parent Page and ChatBot UI
The chatbot iframe supports passing data to and from the hosting parent
page. This is done using the JavaScript
[postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
call. This mechanism enables use cases such as passing credentials
from the parent hosting site to the chat iframe or passing events (e.g.
windows resize) from the chat window to the parent window.

The chatbot iframe sends Lex bot state update events to the parent
site. This can be used to have the parent react to the dialog state
of the bot. The bot-loader.js script relays these messages back to the
parent by emitting the `updatelexstate` events. The event object will
contain the Lex state variables in the `details.state` field.

### Configuration
#### Parent Configuration File
The [bot-loader.js](./bot-loader.js) script loads its initial
configuration from the JSON config file: [config.json](./config.json).
This file is meant to be used as the build-time configuration of the
bot-loader.js script. It serves as the base config so the root level
keys in the JSON object should not be removed.

NOTE: The values in this file may be overwritten by environmental
variables in the build process.

Here's an example of the file format:
```
  {
    // iframe origin - see: Cross Origin Configuration section below
    "iframeOrigin": "http://localhost:8080",

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

#### Parent Event Configuration
The parent page can also set the bot loader configuration via an
event. The bot-loader.js script emits the `receivelexconfig` event which
signals to the parent that it is ready to receive a configuration
object. At which point, the bot-loader.js script will wait a 10
seconds timeout (by default) to receive a event named `loadlexconfig`.
The timeout is controlled by the `configEventTimeOutInMs` field in
the config JSON file. The event object contains the config in the
`detail.config` field.

The configuration from the JSON file is merged with the value for this
event. The values received via this event take precedence over the
JSON file.

For example, to pass the browser
[user agent](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorID/userAgent),
you can add code to your site along the lines of:
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

#### ChatBot UI Configuration
The chatbot UI has its own configuration (see the
[README](https://github.com/awslabs/aws-lex-web-ui/blob/master/lex-web-ui/README.md#configuration-and-customization)
for details.  You can also pass or override the chatbot UI configuration
from the parent site via the following mechanisms:

1. **Config Object.** The parent configuration config object (either from
the [config.json](./config.json) file or passed via the `loadlexconfig`
event) contains the `iframeConfig` field which is passed to the chatbot
UI. This configuration is dynamically sent to the chatbot UI as a
response of the the `onInitIframeConfig` event. The values delivered
via this mechanism override the chatbot UI local config files and URL
config parameter.
2. **URL Parameter.** The chatbot UI configuration can be initialized using
the `config` URL parameter. For details, see the
[URL Parameter](https://github.com/awslabs/aws-lex-web-ui/blob/master/lex-web-ui/README.md#url-parameter)
section. NOTE: the bot-loader.js script does not use URL parameters.

#### Cross Origin Configuration
If the chatbot UI is hosted on a different
[Origin](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
from the parent window, you need to configure the `iframeOrigin` field
in the parent `config.json` file to point to the origin of the iframe. This
origin configuration is used to control which sites can communicate with
the iframe. Conversely, you would need to configure the `ui.parentOrigin`
field in the iframe config. The origin configuration of this sample page
was done at build time by the CloudFormation stack that created it.
