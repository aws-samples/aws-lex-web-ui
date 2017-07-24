# Sample Amazon Lex Web Interface

> Sample Amazon Lex Web Interface

## Overview
This repository provides a sample [Amazon Lex](https://aws.amazon.com/lex/)
web interface that can be integrated in your website. This web interface
allows to interact with a Lex bot directly from a browser using by text
or voice (from a webRTC capable browser).
Here is a screenshot of it:

<img src="./img/webapp-screenshot.png" width=480>

## Integrating into your Site
You can consume this project as a library that renders the chatbot
UI component in your site. The library can be included in your web
application by importing it as a module in a
[webpack](https://webpack.github.io/)
based project or by directly sourcing it in an HTML `<script>` tag.
Additionally, this project provides a set of
[AWS CloudFormation](https://aws.amazon.com/cloudformation/) templates
that can be used to automatically build and deploy the chatbot UI and
related resources.

### Script Tag
This project provides a pre-built version of the library under the
[dist](dist) directory. You can copy the JavaScript and CSS files from
that directory to your web server and use them to load the chatbot
UI. Similarly, for quick testing, you could directly source the library
and other dependencies from a CDN distribution.

You would need to pass required parameters such as the
[Amazon Cognito Identity Pool](http://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html) and Lex bot when you instantiate the
component. See an example here: [index.html](dist/index.html).

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
this component and distributes it as a pre-built library. For details
about the chatbot UI component, see its [README](lex-web-ui/README.md)
