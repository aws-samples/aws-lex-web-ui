/**
 * Base config common to builds
 */
module.exports = {
  cognito: {
    poolId: process.env.POOL_ID,
    appUserPoolClientId: process.env.APP_USER_POOL_CLIENT_ID,
    appUserPoolName: process.env.APP_USER_POOL_NAME,
    appDomainName: process.env.APP_DOMAIN_NAME,
  },
  lex: {
    botName: process.env.BOT_NAME,
    initialText: process.env.BOT_INITIAL_TEXT,
    initialSpeechInstruction: process.env.BOT_INITIAL_SPEECH,
  },
  ui: {
    parentOrigin: process.env.PARENT_ORIGIN,
    toolbarTitle: process.env.UI_TOOLBAR_TITLE,
    toolbarLogo: process.env.UI_TOOLBAR_LOGO,
    enableLogin: process.env.ENABLE_LOGIN,
  },
  polly: {},
  recorder: {},
  iframe: {
    iframeOrigin: process.env.IFRAME_ORIGIN,
  },
};
