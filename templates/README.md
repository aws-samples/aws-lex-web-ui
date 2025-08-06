# CloudFormation Stack

> Sample CloudFormation Stack

## Overview
This directory provides a set of [AWS
CloudFormation](https://aws.amazon.com/cloudformation/) templates to
automatically build and deploy a demo site with the Lex web interface from
this project. The templates can be used to create and manage associated
resources such as the Lex Bot and Cognito Identity Pool.

By default, the web application is bootstrapped from source files
hosted in an AWS owned S3 bucket (see below for instructions on hosting
your own). Once deployed, the CloudFormation stack outputs links to
resources including the sample site and iframe embedding instructions.

### Deployment Mode
[CodeBuild Mode](#codebuild-deployment-mode) configures and deploys
directly to S3 from a CodeBuild project. It is deployed using he
[master.yaml](master.yaml) template.  This mode uses the pre-built
version of the chatbot UI library in the `dist` directory at the root
of this repository. By using the pre-built library, this makes this mode
faster and simpler to manage


### Regions
The lex-web-ui can be launched into regions other than us-east-1 where Lex, Polly, Cognito, Codebuild are supported. 
Note that a pre-staged bootstrap S3 bucket is available in us-east-1 (N. Virginia), eu-west-1 (Ireland), 
and ap-southeast-2 (Sydney). See the
[blog post](https://aws.amazon.com/blogs/machine-learning/deploy-a-web-ui-for-your-chatbot/) for these links in the Launch section. 
You can also build your own version and deploy to an S3 bucket you own in a region 
where you would like to run CloudFormation. Here are the easiest steps to accomplish this.

One requirement to build lex-web-ui version 0.14.13 and higher is python3. The release.sh
step below will fail until python3 becomes available. The build must now 
package the python requests module separately and python3 is required to 
install this module. Cloud9 environments based on Amazon Linux 
come with python3 support. 
 
* Launch the Cloud9 IDE
* In your Cloud9 workspace, clone the repository using git
* cd into the root folder, aws-lex-web-ui
* npm install
* cd lex-web-ui
* npm install
* cd ../build
* ./release.sh
* aws s3 mb s3://[your-lex-bootstrap-bucket-name] --region eu-west-1
* export BUCKET=[your-lex-bootstrap-bucket-name]
* ./upload-bootstrap.sh
 
Your bootstrap bucket now contains the necessary files which the CloudFormation template will utilize. When you
launch your bucket in the target region using the master.yaml, make sure to change the Bootstrap Bucket parameter to
"[your-lex-bootstrap-bucket-name]" and change the Bootstrap Prefix to be just "artifacts".

### Launch
To launch a stack click this button:

[![cloudformation-launch-stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/new?stackName=lex-web-ui&templateURL=https://s3.amazonaws.com/aws-bigdata-blog/artifacts/aws-lex-web-ui/artifacts/templates/master.yaml)

### CloudFormation Resources
The CloudFormation stack can create resources in your AWS account
including:
- [Amazon Lex](http://docs.aws.amazon.com/lex/latest/dg/what-is.html)
bot. You can optionally pass the bot name of an existing one to avoid
creating a new one.
- [Cognito Identity Pool](http://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html)
used to pass temporary AWS credentials to the web app. You can optionally
pass the ID of an existing Cognito Identity Pool to avoid creating a
new one.
- [CodeBuild](https://aws.amazon.com/codebuild/) project to configure
and deploy to S3 when using the CodeBuild Deployment Mode.
- [S3](https://aws.amazon.com/s3/) buckets to host the web application
and to store build artifacts.
- [Lambda](https://aws.amazon.com/lambda/) functions used as CloudFormation
[Custom Resources](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources.html)
to facilitate custom provisioning logic
- [CloudWatch Logs](http://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html)
groups automatically created to log the output of the Lambda functions
- Associated [IAM roles](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html)
for the stack resources

### CloudFormation Templates
The following table lists the CloudFormation templates used to create
the stacks:

| Template | Description |
| --- | --- |
| [master.yaml](./master.yaml) | This is the master template used to deploy the stack using the CodeBuild Mode |
| [lexbot.yaml](./lexbot.yaml) | Lex bot and associated resources (i.e. intents and slot types). |
| [cognito.yaml](./cognito.yaml) | Cognito Identity Pool and IAM role for unauthenticated identity access. |
| [cognitouserpoolconfig.yaml](./cognitouserpoolconfig.yaml) | This template updates the cognito user pool with application client and domain configuration to enable login through either Cognito or other Identity Providers linked via federation. |
| [codebuild-deploy.yaml](./codebuild-deploy.yaml) | Uses CodeBuild to create a configuration and deploy it along the site to S3. Used in CodeBuild Mode |

### Parameters
When launching the stack, you will see a list of available parameters
and a brief explanation of each one. You can take the default values
of all the CloudFormation parameters when you want to quickly test the
sample application. If you are deploying your own bot and/or integrating
with an existing page, you may want to modify the following parameters:

- `v2BotId`: Id of pre-existing Lex bot. This is an optional parameter.
- `v2BotAliasId`: Lex Bot Alias to use. This parameter defines the alias
  to be used by the Lex Web UI.
- `CognitoIdentityPoolId`: Id of an existing Cognito Identity Pool.
  This is an optional parameter. If left empty, a Cognito Identity Pool
  will be automatically created. The pool ID is used by the web ui to
  get AWS credentials for making calls to Lex and Polly.
- `ParentOrigin`: [Origin](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
  of the parent window. Only needed if you wish to embed the web app
  into an existing site using an iframe. The origin is used to control
  which sites can communicate with the iframe
- `EnableCognitoLogin`: The ChatBot will provide an optional login menu item 
  which supports use of Cognito to log in users via the Cognito User Pool,
  through social media login, or other SAML or OpenID based Identity Providers.
- `ReInitSessionAttributesOnRestart`: Lex session attributes are reset on new interactions
with Lex if this parameter is set to true. 

**NOTE**: Some parameters should be unique per AWS region. The parameter
descriptions specify when that is the case.

#### Chatbot UI Configuration Parameters
When deploying using the [CodeBuild Mode](#codebuild-deployment-mode),
you can pass some of the most commonly changed chatbot UI configuration by
using CloudFormation parameters. This includes the following parameters:

- `WebAppConfBotInitialText`: First bot message displayed in the chatbot UI
- `WebAppConfBotInitialSpeech`: Message spoken by bot when the microphone
is first pressed in a conversation
- `WebAppConfToolbarTitle`: Title displayed in the chatbot UI toobar
- `WebAppConfHelp`: String message sent by help button,  If empty icon will not be displayed in chatbot UI toolbar 
- `WebAppConfNegativeFeedback`: String message sent by the user to signal a negative feedback response if empty icon will not be displayed
- `WebAppConfPositiveFeedback`: String message sent by the user to signal a positive feedback response if empty icon will not be displayed
- `EnableMarkdownSupport`: Enables support of Markdown formatting in the UI by 
bots that provide Markdown formatting in their esponses.
- `ShouldLoadIframeMinimized`: When set to true and using the lex-web-ui embedded
in an iframe, the ChatBot Iframe will be minimized when the page is loaded. 
- `ShowResponseCardTitle`: Lex and Alexa based bots may return ResponseCards. 
ResponseCards always include a title. If this parameter is set to true, this title
is rendered in the lex-web-ui. Optionally this can be set to false, and the 
title is not displayed. This is a global setting. 
- `HideButtonMessageBubble`: This is an optional parameter, if set to true, 
hide the message bubble on a response card button press.
- `MessageMenu`: When set to true, each message will have an additional clickable menu on messages sent to the bot allowing you to repeat that message.
- `BackButton`: This is an optional parameter, if set to true, will show a back button to go back to a previous message.
- `MinimizedButtonContent`: Displays provided text when chat window is minimized.

### Output
Once the CloudFormation stack is successfully launched, the status of
all nested stacks will be in the `CREATE_COMPLETE` green status. At
this point, the master stack will reference the resources in the output
section.

Here is a list of the most relevant output variables:
- `WebAppUrl`: URL of the web app running on a full page
- `ParentPageUrl`: URL of the web app running in an iframe. This is an
optional output that is returned only when the stack creates the sample
site It is not returned if an existing origin is passed as a parameter
to the stack during creation
- `SnippetUrl`: URL of a simple page showing the config created by the
build process and a HTML snippet demonstrating how to load the chatbot
UI in an iframe based on the config
- `CognitoIdentityPoolId`: Pool ID of the Cognito Identity Pool created
by the stack. This is an optional output that is returned only when the
stack creates a Cognito Identity Pool. It is not returned if an existing
pool ID was passed as a parameter to the stack during creation.
- `BotId`: Id of the Lex bot created by the stack. This is an
optional output that is returned only when the stack creates the sample
Lex bot. It is not returned if an existing Bot was passed as a parameter
to the stack during creation
- `CodeBuildUrl`: Link to CodeBuild project in the AWS console. After the
stack is successfully launched, the build is automatically started. You
can click on this link to monitor the build progress


## Build and Deployment Overview
The CloudFormation stack builds and deploys the application using
CodeBuild. Various CloudFormation parameters and resource names
are passed as environmental variables to CodeBuild. This includes
references to the S3 Buckets, Cognito Identity Pool and Lex Bot created
by CloudFormation. CodeBuild uses the [Makefile](../Makefile) in the root
directory of this repository control the build and deployment process.

## CodeBuild Deployment Mode
This is the deployment mode used by the [master.yaml](master.yaml) file.
In this mode, the stack creates a CodeBuild project that creates
the application configuration and deploys the files to S3.

Click the following CloudFormation button to launch your own copy of
the sample application stack in the us-east-1 (N. Virginia) AWS region:

[![cloudformation-launch-stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/new?stackName=lex-web-ui&templateURL=https://s3.amazonaws.com/aws-bigdata-blog/artifacts/aws-lex-web-ui/artifacts/templates/master.yaml)

Once the CloudFormation stack is successfully launched and the status
of all nested stacks is `CREATE_COMPLETE`, browse to the `CodeBuildUrl`
link in the output section of the stack. Monitor the build run to make
sure it is successful. After the CodeBuild run completes, you can browse
to the `ParentPageUrl` or `WebAppUrl` links in the CloudFormation output
to see the deployed chatbot UI.

Once deployed, you can go back to the CodeBuild project to change the
application configuration by modifying the environmental variables
passed by CodeBuild. You can start a new build in CodeBuild to
reconfigure and redeploy the application.

The CodeBuild project uses a zip file, passed in the `BootstrapBucket`
parameter, as its source (defaults to an AWS owned S3 bucket). That zip
file contains the source in this project and it is regularly updated. If
you want to use your own source, see the [Deploy Using My Own Bootstrap
S3 Bucket](#deploy-using-my-own-bootstrap-s3-bucket) section below.

## Directory Structure
The following files and directories are relevant to the CloudFormation setup:

```
 .
 |__ Makefile              # Makefile run by CodeBuild
 |__ build                 # contains utilities for uploading the project sources to S3
 |__ config                # config files used during the build
 |__ lex-web-ui            # sample Lex web ui application source
 |__ templates             # cloudformation templates and related lambda functions
    |__ custom-resources   # lambda functions used in cfn custom resources
```
# How do I ...?

## Use or deploy my own bot?
The `v2BotId` and `v2BotAliasId` CloudFormation parameter can be used to point
the stack to an existing bot. In the application, you can also
change the configuration files or pass parameters to it (see the
[Configuration](/README.md#configuration) section of the main README
for details).

## Delete the CloudFormation stacks?
The resources created by this stack can be easily removed from your
account by deleting the master CloudFormation stack. The master stack
is the one that was first created using the "Launch Stack" button. By
deleting this stack, the rest of the sub-stacks and resources will be
deleted with the exception of the CloudWatch Logs groups created by the
stack (these are retained for troubleshooting purposes).

The S3 buckets created by the stacks are deleted by default. If you wish
to retain the data in these buckets, you should set the `CleanupBuckets`
parameter to `false` in the master stack.

## Deploy Using My Own Bootstrap S3 Bucket
By default, the CloudFormation stacks use pre-staged files from
an AWS owned S3 bucket. These files are dynamically downloaded by the
CodeBuild project created by the CloudFormation stack and copied to S3
buckets created in your account.

The bootstrap bucket name and prefix are controlled by the
`BootstrapBucket` and `BootstrapPrefix` parameters of the master
CloudFormation templates. If you want to use your own bootstrap S3
bucket, this project provides a `Makefile` under the `build` directory
to facilitate uploading the bootstrap artifacts. Follow these steps to
populate the S3 bucket:

1. Create your own S3 bucket (you might want to enable
[bucket
versioning](http://docs.aws.amazon.com/AmazonS3/latest/dev/Versioning.html)
on this bucket).
2. Modify the variables in the local build environment file:
[config/env.mk](../config/env.mk). These variables control the build
environment and web application deployment. In specific, you should
modify the following variables:
     - `BOOTSTRAP_BUCKET_PATH`: point it to your own bucket (step 1)
     and prefix merged together as the path to the artifacts
3. Upload the files to your S3 bucket using `make upload` from
the [build](../build) directory under the root of the repo. This
directory contains a `Makefile` that can be used to build the
artifacts and upload the files to your S3 bucket. It uses the [aws
cli](https://aws.amazon.com/cli/) to copy the files to S3
4. Deploy the stack by using the `master.yml` template. 
Change the the `BootstrapBucket` and `BootstrapPrefix`
parameters to point to your own bucket and path
