/**
 * Config used when deploying the app using the pre-built dist library
 */
const mergeConfig = require('./utils/merge-config');
const baseConfig = require('./base.env');

const fileName =
  process.env.WEBAPP_CONFIG_PREBUILT || '../src/config.json';

const config = require(fileName);

module.exports = {
  appPreBuilt: {
    file: fileName,
    conf: mergeConfig(config, baseConfig),
  },
};
