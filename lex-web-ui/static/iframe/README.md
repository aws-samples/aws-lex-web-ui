###Overview
The chatbot UI can be embedded in an existing web site by loading it as
an iframe. This includes embedding it in a cross-origin setup where the
chatbot is served from a server, S3 bucket or CloudFront distribution
in a domain that is different from the hosting web site.

If you want to know more about the chatbot UI component, please refer to
its [README](https://github.com/awslabs/aws-lex-web-ui/lex-web-ui) file.

###Adding the ChatBot UI to your Website
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

###Passing Data Between Parent and ChatBot UI
The chatbot iframe supports passing data to and from the hosting site. This
is done using the JavaScript
[postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
call. This enables use cases such as passing credentials from
the parent hosting site to the chat iframe or passing events (e.g.
windows resize) from the chat window to the parent window.

The chatbot iframe sends Lex bot state update events to the parent
site. This can be used to have the parent react to the dialog state
of the bot. The bot-loader.js script relays these messages back to the
parent by emitting the `updatelexstate` events. The event object will
contain the Lex state variables in the `details.state` field.

###Configuration
####Parent Configuration
The parent page configuration is held in a JSON config file:
[config.json](./config.json). This file is loaded by
the bot-loader.js script. Here's an example of the file format:
```json
  {
    "iframeOrigin": "http://localhost:8080",
    "aws": {
      "cognitoPoolId": "us-east-1:deadbeef-cac0-babe-abcd-abcdef01234",
      "region": "us-east-1"
    }
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

####ChatBot UI Configuration
The chatbot UI has a local build-time config (see:
`src/config/config.prod.json`). You can also pass or override this
configuration from the parent site via two mechanisms:

- **ChatBot UI Configuration from File.** The parent
[config.json](./config.json) file contains the `iframeConfig` field
which is passed to the chatbot UI. This configuration is dynamically
sent to the chatbot UI as a response of the the `onInitIframeConfig`
event. The values delivered via this mechanism override the chatbot
ui local config files and URL config parameter.
- **ChatBot Configuration form URL Parameter.** The chatbot UI
configuration can be initialized using the `config` URL parameter. Your
application can dynamically add the parameter to the URL This is supported
both in iframe and stand-alone mode of the chatbot UI. This config URL
parameter should follow the same JSON structure of the `configDefault`
object in the `src/config/index.js` file. This parameter should be a JSON
serialized and URL encoded string. Values from this parameter override
the ones from the chatbot ui local config files. For example to change
the initialText config field, you can use a URL like this:
`https://mybucket.s3.amazonaws.com/index.html#/?config=%7B%22lex%22%3A%7B%22initialText%22%3A%22Ask%20me%20a%20question%22%7D%7D`

####Cross Origin Configuration
If the chatbot UI is hosted on a different
[Origin](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
from the parent window, you need to configure the `iframeOrigin` field
in the parent config.json file to point to the origin of the iframe. This
origin configuration is used to control which sites can communicate with
the iframe. Conversely, you would need to configure the `ui.parentOrigin`
field in the iframe config. The origin configuration of this sample page
was done at build time by the CloudFormation stack that created it.

