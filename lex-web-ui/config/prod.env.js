// lex-web-ui: added to inject version at build time
// needs to be enclosed in quotes so that it is injected as a string
const packageVersion = require('../package.json').version || '0';

module.exports = {
  NODE_ENV: '"production"',
  PACKAGE_VERSION: `"${packageVersion}"`,
}
