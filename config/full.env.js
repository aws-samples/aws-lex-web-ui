/**
 * Configs to be updated when performing a full build from source
 * This module exports an object with a key for each config file
 * Each key contains the file name and the associated config object
 */

const mergeConfig = require('./utils/merge-config');
const baseConfig = require('./base.env');

// config files to update
const confFileNames = {
  appProd:
    process.env.WEBAPP_CONFIG_PROD ||
    '../lex-web-ui/src/config/config.prod.json',

  appDev:
    process.env.WEBAPP_CONFIG_DEV ||
    '../lex-web-ui/src/config/config.dev.json',

  iframe:
    process.env.IFRAME_CONFIG ||
    '../src/config/chatbot-ui-iframe-loader-config.json',
};

const appProdConfig = require(confFileNames.appProd);
const appDevConfig = require(confFileNames.appDev);
const iframeConfig = require(confFileNames.iframe);

// iframe config has its own format so its environment
// config is constructed here
const iframeEnvConfig = {
  iframeOrigin: process.env.IFRAME_ORIGIN,
  aws: {
    cognitoPoolId: process.env.POOL_ID,
    region: process.env.AWS_DEFAULT_REGION,
  },
};

module.exports = {
  iframe: {
    file: confFileNames.iframe,
    conf: mergeConfig(iframeConfig, iframeEnvConfig),
  },
  appProd: {
    file: confFileNames.appProd,
    conf: mergeConfig(appProdConfig, baseConfig),
  },
  appDev: {
    file: confFileNames.appDev,
    conf: mergeConfig(appDevConfig, baseConfig),
  },
};
