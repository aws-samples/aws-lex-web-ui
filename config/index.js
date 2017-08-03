/**
 * Provides a config object depending on the build target
 * Used by ../build/update-lex-web-ui-config.js
 */

// controls whether to load the config for the pre-built version or
// the full build
const buildType = (process.env.BUILD_TYPE) ? process.env.BUILD_TYPE : 'dist';
const validBuildTypes = ['dist', 'full'];

if (!validBuildTypes.includes(buildType)) {
  throw new Error(`invalid build type: ${buildType}`);
}

module.exports = require(`./${buildType}.env`);
