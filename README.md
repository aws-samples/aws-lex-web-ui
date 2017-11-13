# Sample Amazon Lex Web Interface

> Sample Amazon Lex Web Interface

## Overview
This is a sample [Amazon Lex](https://aws.amazon.com/lex/)
web interface. It provides a chatbot UI component that can be integrated
in your website. The interface allows to interact with a Lex bot directly
from a browser using text or voice (on webRTC capable browsers).

It can be used as a full page chatbot UI:

<img src="./img/webapp-full.gif" width=480>

Or embedded into an existing site as a chatbot widget:

<img src="./img/webapp-iframe.gif" width=480>

## Getting Started
The easiest way to test drive the chatbot UI is to deploy it using the
[AWS CloudFormation](https://aws.amazon.com/cloudformation/) templates
provided by this project. Once you have launched the CloudFormation stack,
you will get a fully working demo hosted in your account.

See the [CloudFormation Deployment](#cloudformation-deployment) section for details. Click this button to launch it:

<a target="_blank" href="https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/new?stackName=lex-web-ui&templateURL=https://s3.amazonaws.com/aws-bigdata-blog/artifacts/aws-lex-web-ui/artifacts/templates/master.yaml"><span><img height="24px" src="https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png"/></span></a>

Additionally, see the [Sample
Site](#sample-site) section for details about a simple website that
demonstrates how to load the chatbot UI in HTML pages. The sample website
can be run locally on a development machine for quick testing.

## Integrating into your Site and Deploying
In addition to the CloudFormation deployment mentioned above, there are
other methods to integrate and deploy this project. Here is a summary
of the various methods:

| # | Method | Description | Use Case |
| --- | --- | --- | --- |
| 1 | [CloudFormation Deployment](#cloudformation-deployment) using the CloudFormation [templates](templates) provided by this project | Fully automated deployment of a hosted web application to an S3 bucket with an optional CI/CD pipeline. By default, it also creates a Cognito Identity Pool and a sample Lex bot | Use when you want to have a infrastructure as code approach that automatically builds and configures the chatbot UI resources |
| 2 | [Mobile Hub Deployment](#mobile-hub-deployment) using the import file: [lex-web-ui-mobile-hub.zip](dist/lex-web-ui-mobile-hub.zip) | Deploys a pre-built version of the chatbot UI to S3 and CloudFront. It creates the Cognito Identity Pool and a sample Lex bot. You can use the Mobile Hub Console to manage it or make changes (e.g. linking to another bot) | Use when you want an easy deployment using the AWS Console or for quick manual testing |
| 3 | Incorporate the pre-built library from the [dist](dist) directory of this repo | We provide a pre-built version of the chatbot UI that you can use on your web application as a [stand alone page](#stand-alone-page) or as an [Iframe](#iframe) embedded | Use when you have an existing site and want to add the chatbot UI to it by simply copying the library files |
| 4 | Use npm to install and use the chatbot UI as a Vue component | Enables developers to consume this project as an [npm](https://www.npmjs.com/) package that provides a [Vue](https://vuejs.org/) component. See the [Npm Install and Vue Component Use](#npm-install-and-vue-component-use) section for details | Use when developing front-end based web applications built using JavaScript and bundled with tools such as [webpack](https://webpack.github.io) |

### Configuration
The chatbot UI supports controlling various features and UI elements
using configurable values. Additionally, since the chatbot UI works
by making Lex API calls from the browser, you have to point its
configuration to an existing Lex bot and to an [Amazon Cognito Identity
Pool](http://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html)
which provides the credentials used to authenticate the Lex API calls. For
details about the various configuration options, see the [Configuration
and Customization](lex-web-ui#configuration-and-customization) section
of the component.

The CloudFormation and Mobile Hub deployment methods help with automating
the configuration of the chatbot UI and associated resources (i.e. Lex and
Cognito). When deploying with those methods the initial configuration will
be done automatically for you. The [Sample Site](#sample-site) included
in this project shows various examples on how to load the configuration.

### Stand-Alone Page
The [dist](dist) directory contains pre-built JavaScript and CSS
files that are ready to be included directly into a full page
chatbot UI. You can copy the files from the `dist` directory
to your web server and load the chatbot UI in a page using the
[chatbot-ui-loader.js](src/website/chatbot-ui-loader.js) script. This
script facilitates the process of loading dependencies and passing the
run-time configuration. For more details about the `chatbot-ui-loader.js`
script, see the [full page](src/website/README.md#full-page) section
in the README file of the sample website included in this project.

Here is an example of the HTML tags used to load the chatbot UI with
the `chatbot-ui-loader.js` script:

```html
  <!-- LexWebUi loader - creates LexWebUiLoader in global scope -->
  <script src="./chatbot-ui-loader.js"></script>
  <script>
    // Sample of a few loader options
    // The loader options controls how the dependencies and config are loaded
    // These are passed as a parameter to the constructor of LexWebUiLoader
    var loaderOptions = {
      shouldLoadConfigFromMobileHubFile: false,
      configUrl: './chatbot-ui-loader-config.json'
    };

    // instantiate the LexWebUiLoader
    var lexWebUiLoader = new LexWebUiLoader(loaderOptions);

    // sample of a few lex-web-ui configuration options
    // you need to at least pass the poolId and botName fields
    var config = {
      cognito: {
        poolId: 'us-east-1:deadbeef-fade-babe-cafe-0123456789ab'
      },
      lex: {
         initialText: 'How can I help you?',
         botName: 'helpBot'
       },
       ui: {
         toolbarTitle: 'Help Bot',
         toolbarLogo: 'https://example.org/mylogo.png'
       },
     };

     // To load the UI, you call the `load` method
     // You can pass the config as a parameter.
     // The loader can also get its config dynamically
     // from a JSON file or from the Mobile Hub config script
     lexWebUiLoader.load(config);
   </script>
```

The chatbot UI component is provided by a library
contained in the [lex-web-ui.js](dist/lex-web-ui.js)
and [lex-web-ui.css](dist/lex-web-ui.css) files (or their
minimized equivalent also found in the `dist` directory). This
component depends on the [Vue](https://vuejs.org/),
[Vuex](https://vuex.vuejs.org/), [Vuetify](https://vuetifyjs.com/)
and [AWS SDK](https://aws.amazon.com/sdk-for-browser/) libraries. You
should either host these dependencies on your site or load them from a
third-party CDN (the `chatbot-ui-loader.js` script loads them fron CDNs
by default).

The following is an illustration of directly loading the chatbot UI
library and its dependencies without the use of the `chatbot-ui-loader.js`
script:


```html
<html>
  <head>
    <!-- Font Dependencies -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons" rel="stylesheet" type="text/css">

    <!-- Vuetify CSS Dependencies -->
    <link href="https://unpkg.com/vuetify@0.16.9/dist/vuetify.min.css" rel="stylesheet" type="text/css">

    <!-- LexWebUi CSS from dist directory -->
    <link href="./lex-web-ui.css" rel="stylesheet" type="text/css">
    <!-- page specific LexWebUi styling -->
    <style type="text/css">
      #lex-web-ui-app { display: flex; height: 100%; width: 100%; }
      body, html { overflow-y: auto; overflow-x: hidden; }
    </style>
  </head>
  <body>
    <!-- application will be dynamically mounted here -->
    <div id="lex-web-ui"></div>

    <!--
      Vue, Vuex, Vuetifiy and AWS SDK dependencies must be loaded before lex-web-ui.js.
      Loading from third party CDN for quick testing
    -->
    <script src="https://unpkg.com/vue@2.5.2"></script>
    <script src="https://unpkg.com/vuex@3.0.0"></script>
    <script src="https://unpkg.com/vuetify@0.16.9"></script>
    <script src="https://sdk.amazonaws.com/js/aws-sdk-2.138.0.min.js"></script>

    <!-- LexWebUi Library from dist directory -->
    <script src="./lex-web-ui.js"></script>

    <!-- instantiate the web ui with a basic config -->
    <script>
      // LexWebUi supports numerous configuration options. Here
      // is an example using just a couple of the required options.
      var config = {
        cognito: {
          // Your Cognito Pool Id - this is required to provide AWS credentials
          poolId: '<your cognito pool id>'
        },
        lex: {
          // Lex Bot Name in your account
          botName: '<your lex bot name>'
        }
      };
      // load the LexWebUi component
      var lexWebUi = new LexWebUi.Loader(config);
      // instantiate Vue
      new Vue({
        el: '#lex-web-ui',
        store: lexWebUi.store,
        template: '<div id="lex-web-ui-app"><lex-web-ui/></div>',
      });
    </script>
  </body>
</html>
```
### Iframe
You can embed the chatbot UI into an existing page using an iframe.
This project provides two files to facilitate this setup:
[chatbot-ui-iframe-loader.js](dist/chatbot-ui-iframe-loader.js) and
[chatbot-ui-iframe-loader.css](dist/chatbot-ui-iframe-loader.css).

The iframe loader script dynamically creates the iframe tag and supports
passing asynchronous configuration using events and JSON files. It
also provides an API between the iframe and the parent page which can
be used to pass Lex state and other events. These options are detailed
in the [README](src/website/README.md) of the sample website included
in this project.

The HTML below is a basic example of a parent page that adds the
chatbot UI as an iframe. Please note that the `LexWebUiIframe.options`
variable has a field (`iframeSrcPath`) which defines the path to the
full page chatbot UI. This variable can be pointed to a page like the
one described in the [stand-alone page](#stand-alone-page) section.
For a more complete sample of the iframe setup, see the source of
the [parent.html](src/website/parent.html) page and the [Sample
Site](#sample-site) section.
```html
<html>
  <head>
    <!-- iframe loader css -->
    <link rel="stylesheet" type="text/css" href="./chatbot-ui-iframe-loader.css">
  </head>
  <body>
    <h1>Welcome to my parent page</h1>
    <!-- LexWebUi iFrame loader options - overrides defaults if defined before the loader -->
    <!-- this is only a sample of the various options supported by the script -->
    <script>
      var LexWebUiIframe = {};
      LexWebUiIframe.options = {
        // URI of stand-alone chatbot page to be loaded in iframe URI
        // Passing thelexWebUiEmbed=true query string activates the embedded mode
        iframeSrcPath: '/path-to-stand-alone-bot-page/bot.html#/?lexWebUiEmbed=true',

        // By default, it attempts to load the config from a file and an event
        // Disabling for sample purposes
        shouldLoadConfigFromJsonFile: false,
        shouldLoadConfigFromEvent: false,

        // controls whether the bot loader script should
        // automatically initialize and load the iframe.
        // If set to false, you should manually initialize using the init() method
        shouldAutoLoad: false,
      };
    </script>

    <!-- iframe loader script -->
    <script src="./chatbot-ui-iframe-loader.js"></script>
    <script>
      var config = {
        // origin where the iframe is loaded set to the same as the parent page
        iframeOrigin: window.location.origin,
        aws: {
          cognitoPoolId: '<my cognito pool id>'
        },
        iframeConfig: {
          lex: {
            botName: '<my lex bot name>'
          }
        }
      };
      var lexWebUi = new LexWebUiIframe();
      // Assigning basic config
      // The config can be alternatively passed asynchronously
      // from a JSON file or from an event
      // init the iframe
      lexWebUi.init(config);
    </script>
  </body>
</html>
```

### Npm Install and Vue Component Use
You can use the [npm](https://docs.npmjs.com/) package manager to
install this project. The npm installation provides a library that you
can import as a module into your JavaScript code. The component is built
as a reusable [Vue](https://vuejs.org/) plugin. This approach is geared
to be used in a [webpack](https://webpack.github.io) based project.

Package installation using `npm`:

```shell
# install npm package from github repo
npm install --save awslabs/aws-lex-web-ui
# you may need to install co-dependencies:
npm install --save vue vuex vuetify material-design-icons roboto-fontface
```

You can then import the library in your project:

```JavaScript
// assumes that a bundler like webpack will handle import/require
// using es6 module
import LexWebUi from 'aws-lex-web-ui';
// or using require
var LexWebUi = require('aws-lex-web-ui');
// import the debug non-minimized version
import LexWebUi from 'aws-lex-web-ui/dist/lex-web-ui';
```

The source of the chatbot UI component resides under the
[lex-web-ui](lex-web-ui) directory. For further details about the chatbot
UI component and its configuration, see its [README](lex-web-ui/README.md)
file.

### Sample Site
This repository provides a sample site that you can use
as a base for development. Its source can be found in the
[src/website](src/website) directory. The sample site includes the
[index.html](src/website/index.html) file which loads the chatbot UI in
a stand-alone page and the [parent.html](src/website/parent.html) which
page loads the chatbot UI in an iframe. For details of this sample site
and the iframe setup, see its [README](src/website/README.md) file.

This sample site requires proper configuration values in the files
located under the [src/config](src/config) directory. You can run it using
[Node.js](https://nodejs.org) on your local machine or a test server.

#### Running Locally
If you want to quickly test the pages in the [src/website](src/website)
directory on your local host, modify the values in the
`chatbot-ui-loader-config.json` and/or `aws-config.js` files under the
`src/config` directory. Specifically, you would need to pass an existing
Cognito Pool Id and Lex Bot name.

If you deploy a site using Mobile Hub or CloudFormation as described
in the [Deploying](#deploying) section, you can copy the automatically
generated files stored in the S3 buckets created by the deployment.

After you setup the configuration files in the `src/config`
directory, issue the command: `npm start` to run a local
web server on port `8000`. For a more advanced local host
development and test environment, see the [Dependencies and Build
Setup](lex-web-ui#dependencies-and-build-setup) documentation of the
component.

## Deploying
This project provides deployment options using [AWS
CloudFormation](https://aws.amazon.com/cloudformation/) or [AWS Mobile
Hub](https://aws.amazon.com/mobile/).  Both deployment options can be
used to launch a fully configured working demo site and related resources
(e.g. Lex bot and Cognito Identity Pool).

The CloudFormation deployment is the preferred method as it allows to
automatically build, configure and deploy the application using a CI/CD
pipeline and it provides a higher degree of flexibility when integrating
with an existing environment. The Mobile Hub deployment allows to quickly
create a demo site with minimal pre-deployment configuration requirements
but may need manual post-deployment steps.

### CloudFormation Deployment
The CloudFormation stack creates a web app in an S3 bucket which you
can link from your site. The S3 bucket also hosts the configuration,
JavaScript and CSS files which can be loaded by your existing web
pages. The CloudFormation deployment is documented in the
[README](templates/README.md) file under the [templates](templates)
directory.

### Mobile Hub Deployment
The Mobile Hub deployment is done by importing
the [lex-web-ui-mobile-hub.zip](dist/lex-web-ui-mobile-hub.zip) file
using the Mobile Hub console. When this file is imported by Mobile Hub,
it creates a project that hosts the chatbot UI web app in
[S3](https://aws.amazon.com/s3/) and
[CloudFront](https://aws.amazon.com/cloudfront/).
It also automatically deploys and configures a sample Lex bot based on the
[Order Flowers bot](http://docs.aws.amazon.com/lex/latest/dg/gs-bp-create-bot.html) (you can later change it to import a different bot into the project)
and an [Amazon Cognito Identity Pool](http://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html).

To launch with Mobile Hub:
1. Sign in to the [AWS Mobile Hub console](https://console.aws.amazon.com/mobilehub/)
2. Click this button: <a target="_blank" href="https://console.aws.amazon.com/mobilehub/home?#/?config=https://github.com/awslabs/aws-lex-web-ui/blob/master/dist/lex-web-ui-mobile-hub.zip"><span><img height="24px" src="https://s3.amazonaws.com/deploytomh/button-deploy-aws-mh.png"/></span></a>
3. Once the project is imported, you should be able to browse to the
sample web app by choosing **Hosting and Streaming** in the Mobile
Hub project and clicking the links under **Launch my web app**

**NOTE:** If the Mobile Hub deployed site causes the browser to download
the files instead of rendering it, you will have to re-sync the files
to the S3 bucket using the S3 console or aws cli. See the
[Add Mobile Hub Hosting and Streaming to Your Mobile App](https://docs.aws.amazon.com/mobile-hub/latest/developerguide/add-aws-mobile-hosting-and-streaming.html#add-aws-mobile-hosting-and-streaming-app)
section of the Mobile Hub documentation for details.
