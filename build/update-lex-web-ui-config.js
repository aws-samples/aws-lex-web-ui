/**
 * Updates config files used by the build environment
 * It merges the values from the environment with the
 * existing values in the config files.
 * Values from the environment take precendence.
 *
 * This is called during the build process by
 * the Makefile in the root dir which is run by CodeBuild
 */
const fs = require('fs');
const config = require('../config');

// dump relevant env vars
[
  'AWS_DEFAULT_REGION',
  'V2_BOT_ID',
  'V2_BOT_ALIAS_ID',
  'V2_BOT_LOCALE_ID',
  'BOT_NAME',
  'BOT_ALIAS',
  'BOT_INITIAL_TEXT',
  'BOT_INITIAL_SPEECH',
  'BOT_INITIAL_UTTERANCE',
  'BOT_RETRY_ON_LEX_POST_TEXT_TIMEOUT',
  'BOT_RETRY_COUNT_POST_TEXT_TIMEOUT',
  'IFRAME_ORIGIN',
  'PARENT_ORIGIN',
  'ENABLE_LOGIN',
  'ENABLE_LIVE_CHAT',
  'FORCE_LOGIN',
  'POOL_ID',
  'APP_USER_POOL_CLIENT_ID',
  'CONNECT_CONTACT_FLOW_ID',
  'CONNECT_INSTANCE_ID',
  'CONNECT_API_GATEWAY_ENDPOINT',
  'APP_DOMAIN_NAME',
  'UI_TOOLBAR_TITLE',
  'UI_TOOLBAR_LOGO',
  'NEGATIVE_INTENT',
  'POSITIVE_INTENT',
  'HELP_INTENT',
  'MIN_BUTTON_TOOLTIP_CONTENT',
].forEach(function (envVar) {
  console.log('[INFO] Env var - %s: [%s]', envVar, process.env[envVar]);
});

Object.keys(config)
.map(function (confKey) { return config[confKey]; })
.forEach(function (item) {
  fs.writeFile(item.file, JSON.stringify(item.conf, null, 2), function (err) {
    if (err) {
      console.error('[ERROR] could not write file: ', err);
      process.exit(1);
    }
    console.log('[INFO] Updated file: ', item.file);
    console.log('[INFO] Config contents: ', JSON.stringify(item.conf));
  });
});
