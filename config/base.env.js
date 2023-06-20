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
  connect: {
    contactFlowId : process.env.CONNECT_CONTACT_FLOW_ID,
    instanceId : process.env.CONNECT_INSTANCE_ID,
    apiGatewayEndpoint : process.env.CONNECT_API_GATEWAY_ENDPOINT,
    promptForNameMessage: process.env.CONNECT_PROMPT_FOR_NAME_MESSAGE,
    waitingForAgentMessage: process.env.CONNECT_WAIT_FOR_AGENT_MESSAGE,
    waitingForAgentMessageIntervalSeconds: process.env.CONNECT_WAIT_FOR_AGENT_MESSAGE_INTERVAL_IN_SECONDS,
    agentJoinedMessage: process.env.CONNECT_AGENT_JOINED_MESSAGE,
    agentLeftMessage: process.env.CONNECT_AGENT_LEFT_MESSAGE,
    chatEndedMessage: process.env.CONNECT_CHAT_ENDED_MESSAGE,
    attachChatTranscript: process.env.CONNECT_ATTACH_CHAT_TRANSCRIPT,
    liveChatTerms: process.env.CONNECT_LIVE_CHAT_TERMS,
    transcriptMessageDelayInMsec: process.env.CONNECT_TRANSCRIPT_MESSAGE_DELAY_IN_MSEC,
  },
  lex: {
    v2BotId: process.env.V2_BOT_ID,
    v2BotAliasId: process.env.V2_BOT_ALIAS_ID,
    v2BotLocaleId: process.env.V2_BOT_LOCALE_ID,
    botName: process.env.BOT_NAME,
    botAlias: process.env.BOT_ALIAS,
    initialText: process.env.BOT_INITIAL_TEXT,
    initialSpeechInstruction: process.env.BOT_INITIAL_SPEECH,
    initialUtterance: process.env.BOT_INITIAL_UTTERANCE,
    reInitSessionAttributesOnRestart: (process.env.REINIT_SESSION_ATTRIBUTES_ON_RESTART === undefined) ? undefined : (process.env.REINIT_SESSION_ATTRIBUTES_ON_RESTART === 'true') ? true : false,
    region: process.env.AWS_DEFAULT_REGION,
    retryOnLexPostTextTimeout: process.env.BOT_RETRY_ON_LEX_POST_TEXT_TIMEOUT,
    retryCountPostTextTimeout: process.env.BOT_RETRY_COUNT_POST_TEXT_TIMEOUT
  },
  ui: {
    parentOrigin: process.env.PARENT_ORIGIN,
    toolbarTitle: process.env.UI_TOOLBAR_TITLE,
    toolbarLogo: process.env.UI_TOOLBAR_LOGO,
    toolbarStartLiveChatLabel: process.env.CONNECT_START_LIVE_CHAT_LABEL,
    toolbarEndLiveChatLabel:  process.env.CONNECT_END_LIVE_CHAT_LABEL,
    toolbarStartLiveChatIcon: process.env.CONNECT_START_LIVE_CHAT_ICON,
    toolbarEndLiveChatIcon: process.env.CONNECT_END_LIVE_CHAT_ICON,
    positiveFeedbackIntent: process.env.POSITIVE_INTENT,
    negativeFeedbackIntent: process.env.NEGATIVE_INTENT,
    helpIntent: process.env.HELP_INTENT,
    minButtonToolTipContent: process.env.MIN_BUTTON_TOOLTIP_CONTENT,
    minButtonContent: process.env.MIN_BUTTON_CONTENT,
    avatarImageUrl: process.env.BOT_AVATAR_IMG_URL,
    backButton: (process.env.BACK_BUTTON === undefined) ? undefined : (process.env.BACK_BUTTON === 'true') ? true : false,
    messageMenu: (process.env.MESSAGE_MENU === undefined) ? undefined : (process.env.MESSAGE_MENU === 'true') ? true : false,
    hideButtonMessageBubble: (process.env.HIDE_BUTTON_MESSAGE_BUBBLE === undefined) ? undefined : (process.env.HIDE_BUTTON_MESSAGE_BUBBLE === 'true') ? true : false,
    enableLogin: (process.env.ENABLE_LOGIN === undefined) ? undefined : (process.env.ENABLE_LOGIN === 'true') ? true : false,
    enableLiveChat: (process.env.ENABLE_LIVE_CHAT === undefined) ? undefined : (process.env.ENABLE_LIVE_CHAT === 'true') ? true : false,
    forceLogin: (process.env.FORCE_LOGIN === undefined) ? undefined : (process.env.FORCE_LOGIN === 'true') ? true : false,
    AllowSuperDangerousHTMLInMessage: (process.env.ENABLE_MARKDOWN_SUPPORT === undefined) ? undefined : (process.env.ENABLE_MARKDOWN_SUPPORT === 'true') ? true : false,
    shouldDisplayResponseCardTitle: (process.env.SHOW_RESPONSE_CARD_TITLE === undefined) ? undefined : (process.env.SHOW_RESPONSE_CARD_TITLE === 'true') ? true : false,
    saveHistory:
      process.env.SAVE_HISTORY === undefined
        ? undefined
        : process.env.SAVE_HISTORY === "true"
        ? true
        : false,
  },
  polly: {},
  recorder: {},
  iframe: {
    iframeOrigin: process.env.IFRAME_ORIGIN,
    shouldLoadIframeMinimized: (process.env.IFRAME_LOAD_MINIMIZED === undefined) ? undefined : (process.env.IFRAME_LOAD_MINIMIZED === 'true') ? true : false,
  },
};
