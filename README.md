# Sample Amazon Lex Web Interface

> Sample Amazon Lex Web Interface

## Overview
This is a sample [Amazon Lex](https://aws.amazon.com/lex/)
web interface. It provides a chatbot UI component that can be integrated
in your website. The interface allows to interact with a Lex bot directly
from a browser using text or voice (on webRTC capable browsers).

## Quick Launch
Click the button below to test drive this project using
[AWS Mobile Hub](https://aws.amazon.com/mobile/).
It will deploy the chatbot UI to
[S3](https://aws.amazon.com/s3/) and
[CloudFront](https://aws.amazon.com/cloudfront/). It also deploys
the sample [Order Flowers Lex bot](http://docs.aws.amazon.com/lex/latest/dg/gs-bp-create-bot.html)
automatically for you.

<p>
<a target="_blank" href="https://console.aws.amazon.com/mobilehub/home?#/?config=https://github.com/awslabs/aws-lex-web-ui/blob/master/dist/lex-web-ui-mobile-hub.zip">
  <span>
    <img height="100%" src="https://s3.amazonaws.com/deploytomh/button-deploy-aws-mh.png"/>
  </span>
</a>
</p>

**NOTE**: If the Mobile Hub deployed site causes the browser to download
the files instead of rendering it, you can re-upload the files to the
S3 bucket using the S3 console or aws cli.

## Integrating into your Site
This project provides a sample page showing how to load the chatbot
UI and related dependencies in a full page. There is also a sample
page showing how to load the chatbot UI into an existing site
using an iframe. These pages and their configuration can be
automatically deployed using the Mobile Hub button above.

This project also provides a set of
[AWS CloudFormation](https://aws.amazon.com/cloudformation/)
templates that can be used to automatically build and deploy the chatbot
UI and related resources. Additionally, you can consume this project as an
[npm](https://www.npmjs.com/) package that provides a component library.


### Full Page
To display the chatbot UI as a full page, you can use the JavaScript
and CSS files in the [dist](dist) directory. You can copy those files
to your web server or host them in an S3 bucket. The JavaScript and CSS
can be loaded in a web page by including them with `script` and `link`
HTML tags.

<img src="./img/webapp-full.gif" width=600>

The chatbot UI component depends on libraries that should also be
loaded in the page. For quick testing, you could directly source these
dependencies from a CDN distribution. A sample page illustrating this
setup is found in here: [index.html](src/website/index.html).

#### Configuration
You need to pass the chatbot UI configuration including
required parameters such as the [Amazon Cognito Identity
Pool](http://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html)
and Lex bot name. The [index.html](src/website/index.html)
sample page loads this configuration from the both the
[bot-config.json](src/config/bot-config.json) and Mobile Hub AWS SDK
[aws-config.js](src/config/aws-config.js) files. You can modify the values
in those files to change the chatbot UI configuration. When deploying
with Mobile Hub or with the CloudFormation templates described below,
the configuration will be done automatically for you. For details about
the component configuration, see the
[Configuration and Customization](https://github.com/awslabs/aws-lex-web-ui/tree/master/lex-web-ui#configuration-and-customization)
section of its README file.

#### Running Locally
If you want to quickly test the [src/website](src/website) pages on
your local host, modify the values in the `bot-config.json` and/or
`aws-config.js` files under the `src/config` directory. Specifically,
you would need to pass a Cognito Pool Id and Lex Bot name. If
you deploy the site using Mobile Hub or CloudFormation, you can
copy the configuration files from the S3 buckets automatically
created in there. After you setup the configuration files in
the `src/config` directory, issue the command: `npm start`. For
a more advanced local host test, see the
[Dependencies and Build Setup](https://github.com/awslabs/aws-lex-web-ui/tree/master/lex-web-ui#dependencies-and-build-setup)
documentation of the component.

### Iframe
You can embed the *Full Page* setup described above in an iframe to
display it on your site as a chatbot widget. This project provides a
sample page showing this setup here:
[parent.html](src/website/parent.html). This includes a loader script
that creates an API between the iframe and the parent page. For details,
see its:
[README](https://github.com/awslabs/aws-lex-web-ui/tree/master/lex-web-ui/src/website).

<img src="./img/webapp-iframe.gif" width=600>

### Npm Install
You can use the [npm](https://docs.npmjs.com/)
command to install this project. The npm install provides a library that
you can import as a module into your JavaScript code. The library can
be npm installed in your web application and imported as a module in a
[webpack](https://webpack.github.io/) based project. The component is
built as a reusable [Vue.JS](https://vuejs.org/) plugin. The library
bundle files are found under the [dist](dist) directory.


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

### CloudFormation Deployment
To deploy a CloudFormation stack with a working demo of the application, see
the accompanying [templates](templates) directory and its
[README](templates/README.md) file.

## Details
The source of the chatbot UI component resides under the
[lex-web-ui](lex-web-ui) directory. The library provided in the
[dist](dist) directory packages this component and distributes it as
a pre-built bundle. For details about the chatbot UI component and its
configuration, see its [README](lex-web-ui/README.md) file.
