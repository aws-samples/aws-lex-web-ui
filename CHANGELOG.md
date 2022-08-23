# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.19.6] - TBD
- Fix issue where some empty string variables would break the Code Deploy build
- Added more CloudFormation parameters for commonly used UI properties. The new variables include:
    * HideButtonMessageBubble
    * MessageMenu
    * BackButton
    * MinimizedButtonContent
- Updated parameter from WebAppConfHelp to WebAppConfHelpIntent in order to provide a bit more clarity around its purpose

## [0.19.5] - 2022-07-17
- Updated README to be more clear
- Updated Connect chat README
- Add the ability to send Lex session attributes prefixed with `connect_` to Connect chat
- Fix issue with master pipeline template not working properly for Lex V2 bots
- Fix issue where Connect agent and chat user have same name
- Bump dependencies
- Custom CloudFront response policy that allows iFrame embedding
- Changed attaching Amazon Connect chat transcripts to false by default

## [0.19.4] - 2022-03-05
- Add setSessionAttribute function to iframe api, add optional messageType parameter to postText function. 
- Add the ability to manually configure a help message in lex-web-ui-loader-config.json per locale. This message is displayed in response to clicking the help button rather then sending to the lex bot. In addition, the last message from the bot can be re-displayed after the help message giving the user context on next action again
- Prefer Lex V1 response cards over Lex V2 in the case where both are present. In a QnABot result, both a V1 and V2 response card will be present. V1 response cards might contain additional buttons not present in the V2 response card. When both are present, prefer the V1 response card.
- Fix for when user sends live chat message while within live chat
- Change Connect CloudFormation parameters to have default empty strings
- Updated default CSS for input container to be visible on screen in iOS/Safari 15

## [0.19.3] - 2021-12-17
- Update use of amazon-connect-chatjs to version "^1.1.7" in lex-web-ui/package.json
- Support response from LexV2 bots with response card only - no message text
- Add Build/Deploy section to bottom of toplevel readme

## [0.19.2] - 2021-11-12
- Update Connect Live Chat README to clarify CORS settings
- Fix problem where CodeBuild was not executed when Connect associated template parameters were changed
- Fix use of template parameter to disable Connect attach chat transfer 

## [0.19.1] - 2021-11-02
- Fix reference to chatbotUiConfig in build/create-iframe-snippet-file.sh to correct capitalization error

## [0.19.0] - 2021-10-22
- Adjust the OPTIONS request on the new API allowing Connect live chat to set Access-Control-Allow-Origin to the ParentOrigin supplied in the template
- Deliver full transcript of user interaction to agent when opening live chat to Connect
- Parameterize all Connect Live messages in CF template
- Update dependent component versions to address several dependabot alerts
- Add commented example to set session attributes on startup to snippet, parent.html, and index.html.

## [0.18.2] - 2021-08-28
- Add feature for connect live chat. Allow client to optionally interact with an agent via Connect.

## [0.18.1] - 2021-06-01
- Change package.json revision to 0.18.1
- Provide distribution location in Canada (Central) region - ca-central-1   
- Update aws sdk to current revision  
- Change codebuild-deploy.yaml to use amazon linux image vs nodejs10 image.
- Change codebuild-deploy.yaml and pipeline.yaml buildspec and codebuild role to invalidate cloudfront distribution after syncing s3 bucket
- Fix Lex V2 client state mapping - specific for audio
- Enhance Lex V2 support to
  - allow configuration of multiple V2 locale ids via template in comma separated list
  - provide menu based selection of configured V2 locales  
- Enhance postMessage to better filter messages between iframe and parent
- Make CognitoAppUserPoolClientId and CognitoUserPoolId optional in master-pipeline.yaml
## [0.18.0] - 2021-04-21
- Move from webpack V3 to webpack V4 in the lex-web-ui component.
- Move to npm version 7.10.0.
- Update component package versions.
- Resolve dependabot alerts.
- Fix to resolve update problem where Cognito Supported Identity Providers is reset to just Cognito. An update
  will now preserve the existing Supported Identity Providers.
- Set AWS sdk to version 2.875.0.
- Improve Lex V2 support to handle responseCard defined as a session attribute in sessionAttributes.appContext.responseCard.
- Removed support for AWS mobilehub based distribution.
## [0.17.9] - 2021-03-03
- Support Lex Version 2 Bots
- Parameter to support initial utterance to send to the bot
- Changed behavior of button date message to use "n min ago"
- Changed behavior of ShouldLoadIframeMinimized to take precedence over last known state
- Added mechanism in loginutils.js to prevent looping
- Support mixed case web ParentOrigin URLs and WebAppPath in Cognito user pool
- Allow multiple values for WebAppPath to allow UI with login to be enabled on multiple pages on the same site (origin)
- Update the Cognito Callback and Signout URLs when updated via CloudFormation template update

## [0.17.8] - 2021-02-02
- Fix for pipeline based deployments - issue 264 - template error
- Fix to full page web client (index.html) using forceLogin to require a direct to login page
- Fix to move to python 3.8 Lambda Runtime for yaml CloudFormation template embedded functions which remove use of boto3 vendored library
- Add ability for Lex Web UI to automatically retry a request if the Lex bot times out after 30 seconds using a configurable number of attempts. 
By default the timeout retry feature is disabled. When enabled, the default retry count is 1. 

## [0.17.7] - 2020-12-31
- Build script fix
- Move min button icon to the left of text

## [0.17.6] - 2020-12-20
- Additional fixes to support upgrades. Upgrades from 0.17.1 and above are supported. Older versions will need to perform a fresh install to migrate to this version.
- Additions to CSS style documentation

## [0.17.5] - 2020-12-12
- Fix to allow use of CF template upgrade to disable WebAppConfHelp, WebAppConfPositiveFeedback, and WebAppConfNegativeFeedback
- Fix to improve resizing of lex-web-ui button at bottom of page when text is used in addition to icon

## [0.17.4] - 2020-12-06
- Improved upgrade support
- Chat history can now be preserved and redisplayed when the user comes back to the original parent page.
- Lambda function upgrade to Python 3.7.

## [0.17.3] - 2020-11-05
- Added loader config option (forceLogin) to templates which configures UI to require the user to authenticate through Cognito prior to using the bot.
- Added loader config option (minButtonContent) which allows text to be added to the button which appears on the parent page when the iframe is minimized. 
- Added XRay support to Lambda functions.
- Added VPC actions to Lambda IAM Roles to support future deployment of Lambdas in VPC. 
- Encrypted S3 buckets using AES-256 default KMS key
- Prebuilt deployments now available for Singapore, Tokyo, London, and Frankfurt regions

## [0.17.2] - 2020-08-21
- Added option to hide message bubble on button click
- Resolved current github dependabot security issues
- Use default encryption for all S3 buckets using AES-256 encryption
- Added instructions in readme for adding additional vue components 

## [0.17.1] - 2020-08-01
- Create uniquely named Cognito UserPool on stack creation
- Removed display of Back button in title bar and instead provide a replay button using the text from prior 
message directly in the message bubble. Back button can be re-enabled though configuration json if desired. 
- Enhanced css attributes of the minimized chatbot button to help allow clicking on items in the parent
window as well as selecting text next the button. 

## [0.17.0] - 2020-07-12
- Improved accessibility - big thanks to @pdkn for this significant contribution
  * Improve screen reader experience
    - Add screen reader specific text to questions & answer (hidden visually)
      so messages are prepended with ( `bot says: `/ `I say: `)  helping to
      give context to visually impaired
    - Hide message date from screen readers
    - Hide loading message from screen readers
    - Hide avatar image from screen readers
    - Make the chatbot titlebar title a \<h1> heading – (Pages must contain
      a level-one heading)
    - Change \<footer> tag to a \<div> as it's content doesn't conform to
      normal content of a footer so adding role="contentinfo" isn't applicable
  * Improve aria
    - Add aria-label and aria-hidden
    - Add alt attribute to images (logo)
    - Add aria-live 'polite' to chat messages list
  * Improve tabbing
    - Fix element tabindex greater than zero
    - Make feedback buttons tabbable
    - Remove focusability from loading message
    - Remove focusability from avatar image
  * Add sound effects
    - Dispatch event when a message is sent or received (so client app can
      respond and play audio effect)
    - Play a SFX when sending/receiving messages
    - Add a SFX on/off button in toolbar
    - Allow setting of SFX .mp3 files in config
      * ui.messageSentSFX and ui.messageReceived
    - Add config ui.enableSFX to enable sound effects
* Style changes
  - ResponseCard buttons css, remove !important so it can be overridden by
    custom implementation
  - ResponseCard buttons, change font-size from 12px to 1em so it defaults to
    a percent size of parent
  - Adjusted panel dimensions
  - Removed toolbar dense setting in fullscreen
* Other
  - **\[BREAKING CHANGE\]** Changed minimized view to look like a round button
    with a chat icon (rather than toolbar). The button has a tooltip with a
    message that can be changed wit the config option:
    `ui.minButtonToolTipContent`.
    This changes the UI style and sizes so you may need to adapt your existing
    custom styles to it.
  - Add new config option `ui.shouldDisableClickedResponseCardButtons` to
    control whether response card buttons should be disabled after being clicked
  - Message list window auto scrolls to top of response message rather than
    bottom (handy if responses are long else user may have to scroll back up
    to the start of message)
  - Allow tooltips and icons to be easily customised/themed via css
- Fix CloudFront CORS issue. Added CloudFront configuration `CacheMethods` for
  GET, HEAD and OPTIONS; Also forward headers: Origin,
  Access-Control-Request-Method and Access-Control-Request-Headers

## [0.16.0] - 2020-06-06
- Lex-web-ui now ships with cloudfront as the default distribution method
  * better load times
  * non public access to S3 bucket
  * better future integration to cloudfront features such as WAF and Lambda@Edge
- Updated package.json dependencies

## [0.15.0] - 2020-05-15
- Moved to Webpack 4
- Changed default parameter ShowResponseCardTitle to be false - was default of true
- Added back default parameter BotAlias of '$LATEST'. The '$LATEST'
alias should only be used for manual testing. Amazon Lex limits
the number of runtime requests that you can make to the $LATEST version of the bot.

## [0.14.15] - 2020-05-06
- Fixed text input focus issues on IE11 after pressing enter to send request.
- Added new Iframe API entry points to deleteSession and startNewSession for fine grain control of Lex sessions

## [0.14.14] - 2020-04-23
- Disabled text input fields during Lex processing
- Fixed IE11 message bubble width issue via css adjustment
- Switched default load option to use minimized libraries
- Removed default of '$LATEST' from template and added message for Bot Alias to indicate that a real alias should be specified

## [0.14.13] - 2020-03-30
- Added configuration setting that allows the input area of the UI to be hidden when Response Card
buttons are present. This feature is disabled by default.
- Removed use of botocore.vendored.requests module

## [0.14.12] - 2020-03-25
- Defect fixes for CORS processing
- Updates for multi-region support
- Easy URLs to launch in us-east-1 (N. Virginia), eu-west-1 (Ireland), ap-southeast-2 (Sydney)

## [0.14.11] - 2020-03-22

### Added
- Installation support for eu-west-1 and ap-southeast-2
- CSS Style information and default customization css file
- Fixed defects with respect to the default Order Flowers Bot installation
- Several pull requests

## [0.14.9] - 2019-11-25

### Added
- Update to use NodeJS 10.x for pipeline based build
- Moved Polly initial speech instruction use on mic click to be available in Cognito Auth Role only

## [0.14.8] - 2019-11-15

### Added
- Inline message feedback buttons
- Toolbar Buttons
- Help Button
- Back Button

## [0.13.2] - 2018-06-14

### Fixed
- Error in IE11 and Edge in Snippet URL. [f2c7c4332e6bfa6b0cc9dc495881be9bedaeb46f]
- Error in IE11 and Edge to access localStorage. [4f91fbe9e462a680c0bf3476203589a88afccc84]

## [0.13.1] - 2018-06-07

### Fixed
- error in dependency in codebuild. [44d9c86a2ec4c693c9ea5a17223254f10756ec80]

## [0.13.0] - 2018-05-23

### Added
- Add Support for Markdown and HTML alternate messages.[3ed88858411b4d85618be9b28c588c368507cdc6]
- Add a loading icon [f892a7b85f079006483461d685109edd6d0f7749]

## [0.12.0] - 2018-01-12
This release brings significant improvements which include various
breaking changes (see items with the **[BREAKING]** label). It overhauls
the following areas:
1. The loader script has been integrated into a single library. This
makes it easier to load the chatbot UI component since now there's only
one JavaScript file and a unified configuration
2. CloudFormation master template has been split into two different
templates based on the deployment mode (CodeBuild or Pipeline). This
simplifies the templates and their parameters
3. The chatbot UI messages are now encapsulated in a custom component
instead of a chip. The messages now display a date when clicked and can
show a bot avatar image next to the bot messages. More importantly, the
new message component will makes it easier in the future to extend the
content displayed in messages (e.g. adding html/markup rendering)

### Changed
- **[BREAKING]** Merged fullpage and iframe loader functionality
into a library that loads from a single script. If you were using
including the `chatbot-ui-*loader.js` scripts, you should change it to
`lex-web-ui-loader.js`. This new library uses a constructor to create
a loader object. The loader object must explicitly call its `load()`
function to load the component. For details, see the README under the
`src/lex-web-ui-loader` directory and the html files under `src/website`.
[0892314ef516ae31a7c0bb6d43369b9a9d1108e5]
- **[BREAKING]** Changed loader config to use a unified file for both the
iframe and full page loader. The new default configuration file name is:
`lex-web-ui-loader-config.json`. See a sample under the `src/config/`
directory. [dbcac4cc241b94e8669843b19fcd082f94b7cc84]
- Changed loader to allow keeping parent origin in config when
embedded [245ac70e647464e6abca01edd511d2b6963014be] - Changed
loader build environment to be based on webpack. This includes
integration with babel, eslint, post-css and webpack-dev-server
[8f1b7ac44c80e85811196930489931d1ea05704e]
- Changed message bubble from vuetify chips to a custom component. This
was done to allow greater flexibility in the style and structure of the
message bubbles and in preparation to render a more complex message format
[67192a0792c2d7433b24dda3b311d419e000b871]
- Changed vertical overflow in non-mobile devices to allow scrolling. This
enables mobile browsers to go full-screen when scrolling
[3b8efc9c8c9f3e838624cfe15e6249cf37db6bf4]
- Changed height calculation of toolbar, inputbar and message list to
make it more deterministic across browsers
[8b9132d17312468292893198061ed79fd7d89543]
- Bumped dependency versions [48aa6ace3e89554de6dcc49c81286b5770606715,
72fb152b9ff7615df1051629cd768fdaff8da9f2]

### Added
- Added time stamps to messages. It is shown under message bubbles when
focused [bd9e9f32fbb25ec8658bb3d1775a5ba735f59fbc]
- Added basic mobile resolution detection
[afa316bf926c671a1a8023b68c4257963cef8e69]
- Added the ability to include an avatar image next to the bot messages
[814069738d0c9caaa0347723bea917684d3182cd]
- Added message list event handler to scroll down to the bottom
[2a20d339d74c5c0684ec07408d4f45c3980a031b]
- Added CSS to auto hyphernation and word break text in messages
[502aa92018e4a704f635ab7e93ac27cd4bb0d0af]
- Added automated test for MessageList and Message components
[1667fc6bc7e6b75eb0023778b1f49d4cf9a86db4]
- Added origin configuration support to CodeBuild deployment
[1d459d93bf03cd5f3c442f5d030cc57a88dd03dc]
- Added a dynamically created page containing a code snippet and config
[7636bac7d94b2684ff0736ed5b34011625bbc8d7]
- added a base URL parameter to the loader which is used to
with relative links for the JSON configuration and dependencies
[9c954f635d473037cd3b8e19a193b5f2962ac675]

### Removed
- **[BREAKING]** Removed iframe loader config file:
`src/config/chatbot-ui-iframe-loader-config.json`. Its functionality
is now integrated in `src/config/lex-web-ui-loader-config.json`.
[2e158f7ec33d4dc0950bdce0a7bead8a1d97a965]
- **[BREAKING]** Splitted the master cloudformation template into two
different template to separate the CodeBuild and Pipeline deployment
modes. This makes the templates much simpler and easier to configure
[ee2ef487f0413f60b4a13d1ceb95b1b3f1408123]
- Removed the need to include CSS to manage overflow at the
body tag level and removed display flex for the app element
[8bf32f8b745b96660291a80a37bd25d0d40868fd]
- Removed promise catch statements in loader script to allow user scripts
to handle exceptions [bd929d6b5d86e1e26af41985734c2690eb9ef04b]

### Fixed
- Fixed a bug where the AWS SDK was loaded in the incorrect order
[1b4637b87b823d4964aeefb08d2fe00523d5dae4]
- Fixed a bug where the component config initialization had a timing issue
when running in embedded mode [66de81cd29b9444362ece87ab24b743efca49298]
- Fixed a bug where the toolbar image caused an error when not present
[de77de6a2633eb925e270028fcb513932dbde93b]
- Fixed a bug where the display of dialog state in messages had the
wrong alignment [d993d7a8cd70ef530eada79d60fd804561fbed6d]
- Fixed parent page in dev/test environment of component
[39a1e1c79fc1c3b0585e08510fad7c266c6fc32b]

## [0.11.0] - 2017-11-13
### Changed
- Various changes to support IE11 in text mode (no voice). IE11 support
requires babel-polyfil to be loaded
- [BREAKING] Renamed bot-config.json file to chatbot-ui-loader.json
to be consistent with the iframe loader and new chatbot loader script
- Moved CloudFormation bootstrap bucket configuration from a map to a
parameter to make it easier to deploy from different sources without
modifying the template
- Changed the parent page setup when using the CreatePipeline deployment
from the CloudFormation templates. It now uses the same page, iframe
loader and configuration as the pre-built deployment. The parent page is
also mounted under /static/iframe/parent.html when running the localhost
dev server (i.e. npm run dev under the lex-web-ui dir)
- Improved dist Makefile to only build the library when there are
changes to the component. Additionally added support to build the new
chatbot loader

### Added
- Added a chatbot loader script that can be used to load dependencies
and config. The loader simplifies the creation of a full page chatbot
site by removing the need to manually add the dependencies and config
- Added CloudFormation parameters to support setting basic chatbot
UI configuration including toolbar title and initial messages. These
parameters are used when deploying the pre-built library from the dist
directory (default)
- Added an allow="microphone" attribute to the iframe tag created by the
iframe loader script. This was done to avoid issues with cross-origin
iframes in newer versions of Chrome

### Removed
- Removed webrtc-adapter dependency from the recorder component
- Removed the deprecated parent page under lex-web-ui/static/iframe. The
parent page in src/website is now copied dynamically during build time

### Fixed
- Fixed issue causing iframeOrigin to be overwritten by event in
sample parent.html. The iframe loader now defaults the iframeOrigin to
window.location.origin only if it is not found in the config.

## [0.10.0] - 2017-10-27
### Changed
- Detailed errors are no longer shown in bot response messages by default.
This is controlled by the `ui.showErrorDetails` config field which
defaults to false.
- Changed display of minimized message list to hide using use v-show
instead of v-if to maintain scroll position
- Changed components to be more compatible with latest vuetify version
- Changed tooltips to work with the latest vuetify and to clear on mobile
- Changed playback progress indicator to have smoother updates
- Clarified main readme including more HTML integration examples
- Changed viewport of index.html to prevent scaling issues
- Iframe loader script in the dist directory is now transpiled using babel
to improve browser compatibility
- Iframe loader css in the dist directory is now post-processed using
autoprefixer to improve browser compatibility
- Updated dependencies

### Added
- Added the ability to emit a vue event when the lex state changes.
This event can be handled with v-on when using the library as a Vue
component.
- Added a new config field: `ui.showErrorDetails` that can be set to true
to display detailed errors in bot response messages. When set to false
(default), only generic error messages are displayed in bot responses.
- Ability to pass a configuration object to the iframe loader during
initialization
- Added recorder options in default store config to make testing consistent

### Fixed
- Fixed a promise return issue when posting a text message
- Fixed audio playback ended index issue
- Fixed recording and playback interruption issue

### Removed
- Removed unused styles

## [0.9.1] - 2017-08-20
This release refactors the LexWeb component to make it easier to test
and include it in other applications/sites. The input toolbar is now more
compact and provides better visual feedback. It adds a send button to the
text input and a progress bar to better indicate processing and playback
status. This release also provides bug fixes and improved unit testing.

### Changed
- LexWeb component is now wrapped in a vuetify v-app component to avoid
having to use the vuetify v-app outside of it. The LexWeb component now
sets a min height that is dynamcally calculated based on the input bar
height. When minimized, all subcomponents are hidden with the exception
of the top toolbar.
- Input bar on the bottom of the chatbot UI is now wrapped in a vuetify
toolbar component. The container now has a fixed height which makes it
easier to calculate offsets
- The StatusBar component was renamed to RecorderStatus as that is a more
appropriate name. It is now loaded from the the InputContainer component
instead of directly from the LexWeb component
- Renamed bot-loader.\* files to chatbot-ui-iframe-loader.\* to better
reflect the use case
- Bump dependency versions

### Added
- Added a send button to the input container. This button is shown
when typing a message or when the mic is disabled
- Added an a linear progress bar when the bot audio is playing
- Added an indeterminate linear progress bar when the recorder is
processing
- Added title attribute to iframe in bot-loader.js script to improve
accessibility
- Added config options to chatbot-ui-iframe-loader.js to better control
the loading of the config and dependencies:
    * `shouldLoadConfigFromJsonFile`: controls if the script loads config
    from a JSON File
    * `shouldLoadConfigFromEvent`: controls if the script loads config
    from an event
    * `shouldAddAwsSdk`: controls if the AWS SDK is automatically added
- Added unit tests for InputContainer and RecorderStatus components
- Added getAudioProperties store action
- Added README.md under src/website. For now, this readme
is pretty much the same as the iframe embedding readme under
lex-web-ui/static/iframe. This is in preparation to deprecate the parent
page under lex-web-ui

### Fixed
- Fixed a bug affecting the enable config option of the recorder
- Fixed creds refresh issue when running in an iframe.
- Fixed an issue with space trimming in text input
- Fixed iframe height issue in MS Edge
- Fixed audio initialization that caused problems in unit tests

## [0.9.0] - 2017-08-04
This release adds a couple of simplified deployment options:
1. Simplfied CloudFormation stack without a deployment pipeline.
It uses CodeBuild to create the config files and to deploy directly
to S3.
This mode is the new default of the CloudFormation setup so if
you want to keep using the deployment pipeline setup (CodeCommit,
CodeBuild, CodePipeline), you are going to need to explicitly set the
`CreatePipeline` parameter to true.
2. AWS Mobile Hub project file that deploys the Web UI to S3 fronted
by a CloudFront distribution. The Mobile Hub project also creates the
Cognito Identity Pool, Lex Bot and IAM Roles. This allows to deploy the
application from a single file hosted in github.

**NOTE**: At this point, there is a Content-Type issue with the files
deployed using the Mobile Hub project file. The Mobile Hub deployed
files seem to have its content-type set to octect-stream which causes the
browser to download the files instead of rendering. To work around this
issue, you can re-upload the files using the S3 console or aws cli. The
Makefile in the root dir can be used to upload the files with the right
content type. Use the command: `make sync-website` (requires setting
the bucket name with the `WEBAPP_BUCKET` environmental variable). This
issue will be further investigated.

### Added
- Added Mobile Hub deployment
- Added new CloudFormation template `codebuild.yaml` used to deploy the
application without a pipeline
- Added `CreatePipeline` parameter to the master.yaml template to control
whether the stack should create a deployment pipeline
- Added build-time support to set web UI config fields that are commonly
changed using environmental variables. This is in preparation to set
these variables from CloudFormation parameters. The new variables include:
    * BOT_INITIAL_TEXT
    * BOT_INITIAL_SPEECH
    * UI_TOOLBAR_TITLE
    * UI_TOOLBAR_LOGO
- Added a new `config` directory in the root of the repo that includes
build configuration
- Added a new `src` directory in the root of the repo to hold the
website files. This includes a modified version of the iframe parent
page and bot-loader that resides in the `lex-web-ui/static/iframe`
directory. Eventualy, this new version should replace, somehow get
merged with the other, or sourced in both places from a single file.
- Added a `server.js` file for quick development and testing. It loads
the sample page from the dist and source directories. It can be used
with the command `npm start` from the root directory. You may need to put
the right values in the config files under `src/config` to make it work.
- Added CloudFormation format statement to all templates files
- Added .npmignore file
- Added sample code on how to use the Vue plugin for including the
component into an existing Vue application

### Changed
- **[BREAKING]** CloudFormation setup now defaults to not creating a
development pipeline and just copy the prebuilt files to an S3 bucket.
To use the pipeline, you now have to set the `CreatePipeline` parameter
to true
- Refactored the build scripts and Makefiles to have better separation
of config and code. The config config used by the Makefiles now resides
under: `config/env.mk`. Some of the names of the Makefile have changed so
you may need to change your environment if you were using the Makefiles
from other script.
- The `update-lex-web-ui-config.js` build script now takes its config from
a node js module in the `config` directory. The config is driven by the
`BUILD_TYPE` environmental variable which controls whether the deployment
is building the app from full source or using the dist dir. For this, the
value of the `BUILD_TYPE` variable can be set to either `full` or `dist`.
- Updated CodeBuild environment to node js v6.3.1 using ubuntu
- Renamed iframe bot.css to bot-loader.css
- Updated dependency versions
- Clarified READMEs

## [0.8.3] - 2017-07-29
### Changed
- Moved default icons from config to sample application
- Reduced the size of silent sounds
- Updated dependencies
- Added input validation and safer var initialization to store

### Fixed
- Fixed mic icon tooltip message to show correct status
- Excluded LexApp from unit testing which was causing unit test issues
- Fixed audio playback on mobile due to autoplay bug
- Fixed input container on mobile not showing on latest vuetify

## [0.8.2] - 2017-07-27
### Fixed
- Fixed config initialization issues

## [0.8.1] - 2017-07-25
### Fixed
- Fixed config initialization and parentOrigin issues
### Changed
- Clarified documentation
- Exported Vue plugin from library
- Added deep merge capability to mergConfig

## [0.8.0] - 2017-07-24
This release makes it easier to include the chatbot UI into existing
sites. The project now distributes a pre-built library in the dist
directory. This allows to use the chatbot UI without having to build the
application. The root directory of the repo now contains a package.json
file to make it easier to npm install it.

There are a few breaking changes regarding the supported URL parameters
which now use the `lexWebUi` prefix to avoid conflicts when including
the component in an existing site.

### Changed
- **[BREAKING]** Changed config passing URL query parameter from `config`
  to `lexWebUiConfig`
- **[BREAKING]** Changed URL query parameter to run in embedded mode from
  `embed` to `lexWebUiEmbed`
- The `parentOrigin` config variable now defaults to
  `window.location.origin` to support single origin iframe setups
  without having to set it in the the JSON config file
- Restructured Vuex store including:
    * Split state, mutations and actions to individual files
    * Moved audio, recorder, aws credentials/clients out of the state.
      Those now exist as module variables visible from the store actions
    * AWS credentials from parent are now manually recreated to avoid
      including the AWS SDK as part of the store
- Changed from using vuex mapGetter in components to instead use the
  store state variables. This was done to avoid redistributing vuex
  in the built library and to support vuex being loaded outside of the
  chatbot ui.
- Moved Vue component initialization from LexApp.vue to LexWeb.vue
- Moved Page component to LexApp.vue from LexWeb.vue
- Moved webpack related import config from recorder to the general
  webpack config
- Commented out webrtc-adapter import in preparation to deprecating it
- Changed constructor arguments of lex client to accept a
  lexRuntime client instead of AWS credentials or SDK config. This allows
  redistributing without having to include AWS SDK as a direct dependency
- Changed iframe container class name
- Rearranged the README files. The main README contains info about the
  npm package and instructions to use the library. The CloudFormation and
  application details where move to different README files.

### Added
- Created a Vue plugin that can be used to instantiate the chatbot ui
  both as an import in a webpack based project or by directly sourcing
  the library in a script tag. The plugin registers itself and adds
  a property named `$lexWebUi` to the Vue class. It adds a global Vue
  component name `LexWebUi`
- Added a distribution build config and related scripts
- Added an example on how to encode the URL query parameter config
- Added a new config object key `urlQueryParams` holding the url query
  parameters

## [0.7.1] - 2017-07-17
This release adds basic unit and e2e testing. Various components were
refactored to enable this.

### Changed
- Synched vue build environment with latest vue cli template
- Refactored store to make it more modular and easier to test including:
  * It no longer exports a Vuex object but instead exports an object that
    can be used as a vuex constructor argument
  * It no longer uses the global AWS object. It now creates its own AWS
    Config object
  * It no longer creates the bot audio element. The Audio element is set
    with an action
- Moved Vuex store instantiation to the LexApp component
- Refactored the lex run time client library to accept an AWS SDK Config
  object to avoid using the global one

### Added
- Added setup for running e2e test including:
  * Added nightwatch chrome options to fake devices for mocking mic
  * Changed nightwatch runner to connect dev server if already running
  * Basic e2e test for stand-alone and iframe
- Added setup to run unit tests including an initial set of basic tests
  for the vuex store and the LexWeb Vue component
- Added version from package.js to vuex store state
- Added babel-polyfill as an npm dev dependency for unit testing

## [0.7.0] - 2017-07-14
### Added
- Added capability to send messages from parent page to iframe using
postMessage
- Added config field to control whether the iframe should automatically
load
- Added a ready event sent by chatbot UI when running embedded to signal
the parent that the component loaded successfully
- Added capability to programatically post text messages to the
chatbot UI from a parent page when running embedded as an iframe
- Added capability to programatically minimize the chatbot UI
from a parent page when running embedded as an iframe
- Added Config field to control whether the iframe should load minimized

### Changed
- Major refactoring of the bot loader script to make it more modular
- Improved the documentation to include more details on embedding as an iframe
- Bumped dependency versions
- Changed indentation of various portions of the chatbot UI code to
conform to the the latest airbnb eslint config
- Changed vuetify components to work latest version
- Changed responseCard rendering style
- Changed bot loader CSS to better adapt to smaller resolutions
- Changed iframe minimize/expand to use new parent to iframe message passing

### Fixed
- Fixed responseCard parsing when using postContent

## [0.6.0] - 2017-07-07
### Added
- Added the ability to pass dynamic configuration from parent page to the
  bot loader via an event
- Added response cards object display to sample parent page

### Changed
- Bot loader script now uses its own credential variable instead of setting
  it into the global AWS object
- Bumped AWS SDK version in bot loader
- Added functionality to remove event handlers in bot loader for events that
  only fire once

### Fixed
- Typos, invalid links and display issues in README files

## [0.5.2] - 2017-07-05
### Fixed
- Credential loading issue in parent bot-loader.js

## [0.5.1] - 2017-06-06
### Changed
- Copyrights and Amazon software license

## [0.5.0] - 2017-06-05
### Added
- Ability to deploy a sample bot based on the OrderFlowers sample
 from the Lex [Create an Amazon Lex Bot (Console)](http://docs.aws.amazon.com/lex/latest/dg/gs-bp-create-bot.html)
 documentation.
- Added npm 5 package-lock.json file for more deterministic builds
- Copyrights and Apache license

### Changed
- Bumped dependency versions
- Default bot name using prefix
- Changed name of Lambda handler of CloudFormation custom resource for
  CodeBuild starter

### Fix
- Response Card rendering and sizing issues

## [0.4.1] - 2017-06-01
### Added
- Copyrights and Apache license
- Ability to provide Lex bot alias in config
- Added an event dispatcher to bot-loader.js to relay state from
  the chatbot ui to parent page
- Beefed up sample parent page

### Changed
- Bumped dependency versions
- Added an audio analyser to improve silence and interrupt detection
- Mute auto detection now defaults to false
- Changed default bot to OrderFlowers

### Fix
- General cleanup of docs and code

## [0.4.0] - 2017-05-26
### Added
- Support of response cards for postContent using
  sessionAttributes.appContext
- Ability to automatically change urls to links in bot message
  responses. This feature is controlled with the
  `ui.convertUrlToLinksInBotMessages` config field.
- Ability to automatically strip out tags (e.g. SSML or HTML) from
  bot responses. This can be controlled with the
  `ui.stripTagsFromBotMessages` config field.

### Changed
- Bumped dependency versions
- Using vuex getter mapper to reduce function clutter
- Moved message text to its own component MessageText
- Upgraded the vuetify library which changed the style of various
  components and adjusted the styling to make the UI work with the version.
- Made page wide scrollbar hidden

### Removed
- Got rid of the experimental playback controls for bot audio
- Removed work-around for mobile scrolling as the new vuetify library
  doesn't need it

### Fixed
- Improved bot playback interrupt async handlers. Now has visibility of audio
  duration.
- Fixed build-time config script to use the right bot name field and to
  incorporate other config fields

## [0.3.0] - 2017-05-12
### Added
- S3 bucket cleanup CloudFormation custom resource to optionally delete
  buckets created for the pipeline and to host the web application
- Support of Lex [Response Cards](http://docs.aws.amazon.com/lex/latest/dg/ex-resp-card.html)
- Console logging of processing time
- [Experimental] interruption of bot response playback by speaking over it
- [Experimental] playback controls for bot audio

### Changed
- Use of newly launched Cognito CloudFormation resources instead of Lambda
  based custom resources
- Bumped dependency versions

### Removed
- Removed Lambda python files used in Cognito CloudFormation custom resources

### Fixed
- Improved interruption of bot speech conversation when switching to text by
  avoiding Lex service conflicts (postText text while postContent processing)
- Mute autodetection config issue

## [0.2.0] - 2017-04-28
### Added
- Support to obtain dynamic config from URL query param or postMessage from
  parent iframe
- Config option to disable microphone echo cancellation in recorder
- Config option to disable recorder automatic mute detection
- Config options to control trimming silence in recorder/encoder
- Config option to reinitialize session attributes after bot is done
- Config option to control if initialText message should be pushed after bot
  is done
- Recorder config presets to optimize based on speech recognition or low latency
- Support to automatically increase the minimum recording time based on
  consecutive silent recordings

### Changed
- Improved recorder automatic mute detection
- Bumped dependency versions
- Moved page wide elements (e.g. title and fav icon) to Page component
- Consolidated config so that it is only imported by store

### Fixed
- Issue passing boolean options to recorder
- Rendering issue on mobile where it was needed to scroll down [WORKAROUND]

## [0.1.0] - 2017-04-14
### Added
- initial
