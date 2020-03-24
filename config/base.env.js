/**
 * Base config common to builds
 */
module.exports = {
  region: process.env.AWS_DEFAULT_REGION,
  cognito: {
    poolId: process.env.POOL_ID,
    appUserPoolClientId: process.env.APP_USER_POOL_CLIENT_ID,
    appUserPoolName: process.env.APP_USER_POOL_NAME,
    appDomainName: process.env.APP_DOMAIN_NAME,
    aws_cognito_region: process.env.AWS_DEFAULT_REGION,
    region: process.env.AWS_DEFAULT_REGION,
  },
  lex: {
    botName: process.env.BOT_NAME,
    botAlias: process.env.BOT_ALIAS,
    initialText: process.env.BOT_INITIAL_TEXT,
    initialSpeechInstruction: process.env.BOT_INITIAL_SPEECH,
    reInitSessionAttributesOnRestart: (process.env.REINIT_SESSION_ATTRIBUTES_ON_RESTART === undefined) ? undefined : (process.env.REINIT_SESSION_ATTRIBUTES_ON_RESTART === 'true') ? true : false,
    region: process.env.AWS_DEFAULT_REGION,
  },
  ui: {
    parentOrigin: process.env.PARENT_ORIGIN,
    toolbarTitle: process.env.UI_TOOLBAR_TITLE,
    toolbarLogo: process.env.UI_TOOLBAR_LOGO,
    positiveFeedbackIntent: process.env.POSITIVE_INTENT,
    negativeFeedbackIntent: process.env.NEGATIVE_INTENT,
    helpIntent: process.env.HELP_INTENT,
    enableLogin: (process.env.ENABLE_LOGIN === undefined) ? undefined : (process.env.ENABLE_LOGIN === 'true') ? true : false,
    AllowSuperDangerousHTMLInMessage: (process.env.ENABLE_MARKDOWN_SUPPORT === undefined) ? undefined : (process.env.ENABLE_MARKDOWN_SUPPORT === 'true') ? true : false,
    shouldDisplayResponseCardTitle: (process.env.SHOW_RESPONSE_CARD_TITLE === undefined) ? undefined : (process.env.SHOW_RESPONSE_CARD_TITLE === 'true') ? true : false,
  },
  polly: {},
  recorder: {},
  iframe: {
    iframeOrigin: process.env.IFRAME_ORIGIN,
    shouldLoadIframeMinimized: (process.env.IFRAME_LOAD_MINIMIZED === undefined) ? undefined : (process.env.IFRAME_LOAD_MINIMIZED === 'true') ? true : false,
  },
};
