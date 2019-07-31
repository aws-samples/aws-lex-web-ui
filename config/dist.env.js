/**
 * Config used when deploying the app using the pre-built dist library
 */
const path = require('path');

const mergeConfig = require('./utils/merge-config');
const baseConfig = require('./base.env');

const loaderConfigFileName =
  process.env.LOADER_CONFIG ||
  path.resolve(__dirname, '../src/config/lex-web-ui-loader-config.json');
const loaderConfig = require(loaderConfigFileName);

module.exports = {
  appPreBuilt: {
    file: loaderConfigFileName,
    conf: mergeConfig(loaderConfig, baseConfig),
  },
};
