# CloudFormation Stack

> Sample CloudFormation Stack

## Overview
This directory provides a set of
[AWS CloudFormation](https://aws.amazon.com/cloudformation/) templates to
automatically build and deploy a sample
[Amazon Lex](https://aws.amazon.com/lex/)
web interface.

The CloudFormation templates supports two deployment modes which are
controlled by `CreatePipeline` parameter:
1. **CodeBuild Mode** configures and deploys directly to S3 from a
CodeBuild project. This is the default mode. It is used when the
`CreatePipeline` parameter is set to false. This mode uses the pre-built
library.
2. **Pipeline Mode** configures, builds and deploys using CodeCommit,
CodeBuild and CodePipeline. This mode creates an automated deployment
pipeine that performs a full build of the application from source.

## Launch
[![cloudformation-launch-stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/new?stackName=lex-web-ui&templateURL=https://s3.amazonaws.com/aws-bigdata-blog/artifacts/aws-lex-web-ui/artifacts/templates/master.yaml).

### CloudFormation Resources
Depenpending on the deployment mode, the CloudFormation stack can create
resources in your AWS account including:
- A [Amazon Lex](http://docs.aws.amazon.com/lex/latest/dg/what-is.html)
bot. You can optionally pass the bot name of an existing one to avoid
creating a new one.
- A [Cognito Identity Pool](http://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html)
used to pass temporary AWS credentials to the web app. You can optionally
pass the ID of an existing Cognito Identity Pool to avoid creating a
new one.
- A [CodeBuild](https://aws.amazon.com/codebuild/) project to configure
and deploy to S3 when using the CodeBuild Deployment Mode. If using the
Pipeline Deployment Mode, a CodeBuild project is created to bootstrap
a CodeCommit repository whit the application source.
- [S3](https://aws.amazon.com/s3/) buckets to host the web application
and to store build artifacts.
- [Lambda](https://aws.amazon.com/lambda/) functions used as CloudFormation
[Custom Resources](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources.html)
to facilitate custom provisioning logic
- [CloudWatch Logs](http://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html)
groups automatically created to log the output of Lambda the functions
- Associated [IAM roles](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html)
for the stack resources

If using the Pipeline Deployment Mode, the stack creates the following resources:
- A [CodeCommit](https://aws.amazon.com/codecommit/)
repository loaded with the source code in this project. This is only
created when using the pipeline deployment mode
- A continuous delivery pipeline using [CodePipeline](https://aws.amazon.com/codepipeline/)
and [CodeBuild](https://aws.amazon.com/codebuild/).
The pipeline automatically builds and deploys changes to the app committed
  to the CodeCommit repo

### CloudFormation Templates
The following table lists the CloudFormation templates used to create the stacks:

| Template | Description |
| --- | --- |
| [master.yaml](./master.yaml) | This is the master template used to deploy all the stacks. It uses nested sub-templates to include the ones listed below. |
| [lexbot.yaml](./lexbot.yaml) | Lex bot and associated resources (i.e. intents and slot types). |
| [cognito.yaml](./cognito.yaml) | Cognito Identity Pool and IAM role for unauthenticated identity access. |
| [codebuild-deploy.yaml](./codebuild-deploy.yaml) | Uses CodeBuild to configure and deploy to S3 |
| [coderepo.yaml](./coderepo.yaml) | CodeCommit repo dynamically initialized with the files in this repo using CodeBuild and a custom resource. |
| [pipeline.yaml](./pipeline.yaml) | Continuous deployment pipeline of the Lex Web UI Application using CodePipeline and CodeBuild. The pipeline takes the source from CodeCommit, builds the Lex web UI application using CodeBuild and deploys the app to an S3 bucket. |

### Parameters
When launching the stack, you will see a list of available parameters
and a brief explanation of each one. You can take the default values of
most of the CloudFormation parameters. The parameters that you may need
to modify are:

- `BotName`: Name of pre-existing Lex bot. This is an optional parameter.
  If left empty, a sample bot will be created based on the
  [OrderFlowers](http://docs.aws.amazon.com/lex/latest/dg/gs-bp.html)
  bot in the Lex
  [Getting Started](http://docs.aws.amazon.com/lex/latest/dg/gs-console.html)
  documentation.
- `CognitoIdentityPoolId`: Id of an existing Cognito Identity Pool.
  This is an optional parameter. If left empty, a Cognito Identity Pool
  will be automatically created. The pool ID is used by the web ui to
  get AWS credentials for making calls to Lex and Polly.
- `ParentOrigin`: [Origin](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
  of the parent window. Only needed if you wish to embed the web app
  into an existing site using an iframe. The origin is used to control
  which sites can communicate with the iframe
- `CreatePipeline`: Controls the deployment mode as explained above

### Output
Once the CloudFormation stack is successfully launched, the status of
all nested stacks will be in the `CREATE_COMPLETE` green status. At
this point, the master stack will reference the resources in the output
section. Here is a list of the output variables:

- `PipelineUrl`: Link to CodePipeline in the AWS console.  After the stack
is successfully launched, the pipeline automatically starts the build and
deployment process. You can click on this link to monitor the pipeline.
- `CodeCommitRepoUrl`: When using the Pipeline Deployment Mode, this
CodeCommit repository clone URL. You can clone the repo using this link
and push changes to it to have the pipeline build and deploy the web app.
- `WebAppUrl`: URL of the web app running on a full page. The
web app will be available once the pipeline has completed deploying
- `ParentPageUrl`: URL of the web app running in an iframe. This is an
optional output that is returned only when the stack creates the sample
when page. It is not returned if an existing origin is passed as a
parameter to the stack during creation.
- `CognitoIdentityPoolId`: Pool ID of the Cognito Identity Pool created
by the stack. This is an optional output that is returned only when the
stack creates a Cognito Identity Pool. It is not returned if an existing
pool ID was passed as a parameter to the stack during creation.

## Pipeline Deployment Mode
When using this option, the stack creates a deployment pipeline using
[CodeCommit](https://aws.amazon.com/codecommit/)
[CodePipeline](https://aws.amazon.com/codepipeline/)
and [CodeBuild](https://aws.amazon.com/codebuild/).
which automatically builds and deploys changes to the app committed
to the CodeCommit repo. The stack can also deploy related resources such
as the
[Cognito Identity Pool](http://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html) and Lex bot.

### Diagram
Here is a diagram of the CloudFormation stack created by the pipeline deployment mode:

<img src="../img/cfn-stack.png" width=640>

### Launching Using the Pipeline
To deploy a CloudFormation stack with a working demo of the application,
follow the steps below:

1. Click the following CloudFormation button to launch your own copy of
the sample application stack in the us-east-1 (N. Virginia) AWS region:
[![cloudformation-launch-stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/new?stackName=lex-web-ui&templateURL=https://s3.amazonaws.com/aws-bigdata-blog/artifacts/aws-lex-web-ui/artifacts/templates/master.yaml).
2. Change the `CreatePipeline` parameter to `true`. After that,
you can accept the defaults in the CloudFormation Create Stack Wizard up
until the last step. At the last step, when prompted to create the stack,
select the checkmark that says: "I acknowledge that AWS CloudFormation
might create IAM resources with custom names". It takes about 10 minutes
for the CloudFormation stacks to got to `CREATE_COMPLETE` status.
3. Once the status of all the CloudFormation stacks
is `CREATE_COMPLETE`, click on the `PipelineUrl` link in the output
section of the master stack.  This will take you to the CodePipeline
console. You can monitor the progress of the deployment pipeline from
there. It takes about 10 minutes to build and deploy the application.
4. Once the pipeline has deployed successfully, go back to the
output section of the master CloudFormation stack and click on the
`ParentPageUrl` link. You can also browse to the `WebAppUrl` link. Those
links will take you to the sample application running as an embedded
iframe or as a stand-alone web application respectively.

### Deployment Pipeline
When the stacks have completed launching, you can see the status of
the pipeline as it builds and deploys the application. The link to the
pipeline in the AWS console can be found in the `PipelineUrl` output
variable of the master stack.

Once the pipeline successfully finishes deploying, you should be able to
browse to the web app. The web app URL can be found in the `WebAppUrl`
output variable.

The source of this project is automatically forked into a CodeCommit
repository created by the CloudFormation stack. Any changes pushed to
the master branch of this forked repo will automatically kick off the
pipeline which runs a CodeBuild job to build and deploy a new version
of the web app. You will need to
[setup](http://docs.aws.amazon.com/codecommit/latest/userguide/setting-up.html)
CodeCommit to push changes to this repo. You can obtain the CodeCommit
git clone URL from the `CodeCommitRepoUrl` output variable of the
master stack.

Here is a diagram of the deployment pipeline:

<img src="../img/pipeline.png" width=640>

## Directory Structure
The following directories are relevant to the CloudFormation setup:

```
 .
 |__ build                 # Makefile used for uploading the project sources into S3
 |__ lex-web-ui            # sample Lex web ui application source
 |__ templates             # cloudformation templates and related lambda functions
    |__ custom-resources   # lambda functions used in cfn custom resources
```
# How do I ...?

## Use or deploy my own bot?
The `BotName` CloudFormation parameter can be used to point the
stack to an existing bot. In the application, you can also change
the configuration files or pass parameters to it (see the application
[README](../lex-web-ui/README.md) file for details).

If you want to make changes to the sample
bot deployed by the stack, you can edit the
[bot-definition.json](./custom-resources/bot-definition.json)
file. This file is used by the
[lex-manager.py](./custom-resources/lex-manager.py) which is
run in Lambda by a CloudFormation Custom Resource in the bot stack
created by the
[lexbot.yaml](./lexbot.yaml) template.
The bot definition is in a JSON file that contains all the resources
associated with the bot including intents and slot types.

The lex-manager.py script can be also used as a stand-alone shell script.
It allows to export existing bots (including associated resources like
intents and slot types) into a JSON file. The same script can be
used to import a bot definition into an account or to recursively delete
a bot and associated resources. Here is the script usage:

```
$ python lex-manager.py  -h
usage: lex-manager.py [-h] [-i [file] | -e [botname] | -d botname]

Lex bot manager. Import, export or delete a Lex bot. Used to
import/export/delete Lex bots and associated resources (i.e. intents, slot
types).

optional arguments:
  -h, --help            show this help message and exit
  -i [file], --import [file]
                        Import bot definition from file into account. Defaults
                        to: bot-definition.json
  -e [botname], --export [botname]
                        Export bot definition as JSON to stdout Defaults to
                        reading the botname from the definition file: bot-
                        definition.json
  -d botname, --delete botname
                        Deletes the bot passed as argument and its associated
                        resources.
```

## Delete the CloudFormation stacks?
The resources created by this stack can be easily removed from your
account by deleting the master CloudFormation stack. The master stack
is the one that was first created using the "Launch Stack" button. By
deleting this stack, the rest of the sub-stacks and resources will be
deleted with the exception of the CloudWatch Logs groups created by the
stack (these are retained for troubleshooting purposes).

The S3 buckets created by the stacks are deleted by default. If you wish
to retain the data in these buckets, you should set the `CleanupBuckets`
parameter to false in the master stack.

## Deploy Using My Own Bootstrap S3 Bucket
The source used to bootstrap the CodeCommit repo created by CloudFormation
is dynamically downloaded from a predefined S3 bucket. If you want
to use your own S3 bucket, this project provides a `Makefile` under the
`build` directory to facilitate uploading the bootstrap artifacts. Follow
these steps:

1. Create your own S3 bucket (you might want to enable
[bucket
versioning](http://docs.aws.amazon.com/AmazonS3/latest/dev/Versioning.html)
on this bucket).
2. Modify the [master.yaml](./master.yaml) template to point to
your bucket. The bucket and path are configured by the `BootstrapBucket`
and `BootstrapPrefix` variables under the `Mappings` section of the
template.
3. Modify the variables in the local build environment file:
[config/env.mk](../config/env.mk). These variables control the build
environment and web application deployment. In specific, you should
modify the following variables:
     - `BOOTSTRAP_BUCKET_PATH`: point it to your own bucket and prefix
       merged together as the path to the artifacts (same as step 2)
4. Upload the files to your S3 bucket using `make upload`. The
[build](../build) directory under the root of the repo contains a `Makefile`
that can be used to build the artifacts and upload the files to your S3
bucket. It uses the [aws cli](https://aws.amazon.com/cli/) to copy the
files to S3. To upload the files to your s3 bucket, issue the following
commands (from the root of the repository):
```shell
cd build
make upload # requires a properly configured aws cli installation
```
