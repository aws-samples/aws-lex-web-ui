/**
 * Configs to be updated when performing a full build from source
 * This module exports an object with a key for each config file
 * Each key contains the file name and the associated config object
 */

const path = require('path');

const mergeConfig = require('./utils/merge-config');
const baseConfig = require('./base.env');

// config files to update
const confFileNames = {
  appProd:
    process.env.WEBAPP_CONFIG_PROD ||
    path.resolve(__dirname, '../lex-web-ui/src/config/config.prod.json'),

  appDev:
    process.env.WEBAPP_CONFIG_DEV ||
    path.resolve(__dirname, '../lex-web-ui/src/config/config.dev.json'),

  loader:
    process.env.LOADER_CONFIG ||
    path.resolve(__dirname, '../src/config/lex-web-ui-loader-config.json'),
};

const appProdConfig = require(confFileNames.appProd);
const appDevConfig = require(confFileNames.appDev);
const loaderConfig = require(confFileNames.loader);

module.exports = {
  loader: {
    file: confFileNames.loader,
    conf: mergeConfig(loaderConfig, baseConfig),
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
