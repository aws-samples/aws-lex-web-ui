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
  'BOT_NAME',
  'BOT_ALIAS',
  'BOT_INITIAL_TEXT',
  'BOT_INITIAL_SPEECH',
  'IFRAME_ORIGIN',
  'PARENT_ORIGIN',
  'POOL_ID',
  'APP_USER_POOL_CLIENT_ID',
  'APP_DOMAIN_NAME',
  'UI_TOOLBAR_TITLE',
  'UI_TOOLBAR_LOGO',
  'NEGATIVE_INTENT',
  'POSITIVE_INTENT',
  'HELP_INTENT'
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
