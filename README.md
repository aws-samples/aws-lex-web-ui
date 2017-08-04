# Sample Amazon Lex Web Interface

> Sample Amazon Lex Web Interface

## Overview
This is a sample [Amazon Lex](https://aws.amazon.com/lex/)
web interface that can be integrated in your website. This web interface
allows to interact with a Lex bot directly from a browser using by text
or voice (from a webRTC capable browser).

## Quick Launch

<p>
<a target="_blank" href="https://console.aws.amazon.com/mobilehub/home?#/?config=https://github.com/awslabs/aws-lex-web-ui/blob/master/dist/lex-web-ui-mobile-hub.zip">
  <span>
    <img height="100%" src="https://s3.amazonaws.com/deploytomh/button-deploy-aws-mh.png"/>
  </span>
</a>
</p>

<img src="./img/webapp-screenshot.png" width=480>

## Integrating into your Site
You can quickly deploy this project using [AWS Mobile Hub](https://aws.amazon.com/mobile/)
by clicking the button above. Oonce the bot is deployed, you can load it
as an iframe on your website. The Mobile Hub project includes a sample
page illustrating this setup.

Additionally, you can consume this project as a library that
could render the chatbot UI component on your site. The library can be
npm installed in your web application and imported as a module in a
[webpack](https://webpack.github.io/) based project. The component is
built as a reusable [Vue.JS](https://vuejs.org/) plugin.

For advanced use cases, this project provides a set of
[AWS CloudFormation](https://aws.amazon.com/cloudformation/) templates
that can be used to automatically build and deploy the chatbot UI and
related resources.

### Script Tag
A pre-built version of the library can be found under the
[dist](dist) directory. You can copy the JavaScript and CSS files from
that directory to your web server and use them to load the chatbot
UI. Similarly, for quick testing, you could directly source the library
and other dependencies from a CDN distribution.

You would need to pass required parameters such as the
[Amazon Cognito Identity Pool](http://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html) and Lex bot when you instantiate the component.

### Npm Install
You can use the [npm](https://docs.npmjs.com/)
command to install this project. The npm install provides a library that
you can import as a module into your JavaScript code.

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
```

### CloudFormation Deployment
To deploy a CloudFormation stack with a working demo of the application, see
the accompanying [templates](templates) directory and its
[README](templates/README.md) file.

## Details
The source of the chatbot UI component resides under the
[lex-web-ui](lex-web-ui) directory. The library provided here packages
this component and distributes it as a pre-built bundle. For details
about the chatbot UI component, see its [README](lex-web-ui/README.md).
