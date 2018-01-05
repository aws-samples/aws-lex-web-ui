/**
 * Base config common to builds
 */
module.exports = {
  cognito: {
    poolId: process.env.POOL_ID,
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
  },
  polly: {},
  recorder: {},
  iframe: {
    iframeOrigin: process.env.IFRAME_ORIGIN,
  },
};
