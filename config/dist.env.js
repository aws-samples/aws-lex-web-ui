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


const currentConfigFileName = path.resolve(__dirname, '../' + process.env.CURRENT_CONFIG_FILE);
const currentConfig = require(currentConfigFileName);
/* merge currentConfig with loader default config*/
const userConfig = mergeConfig(currentConfig, baseConfig);

module.exports = {
  appPreBuilt: {
    file: loaderConfigFileName,
    conf: mergeConfig(userConfig, baseConfig),
  },
};
