# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

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
