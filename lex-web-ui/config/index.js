// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),

    // CAUTION: files under these directories are rm -rf during build
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',

    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },
  // lex-web-ui: added to create a distributable bundle in a single file
  dist: {
    bundleName: 'lex-web-ui',
    entry: './src/lex-web-ui.js',
    env: require('./dist.env'),

    // CAUTION: files under these directories are rm -rf during build
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'bundle',

    assetsPublicPath: process.env.PUBLIC_PATH || '/',
    productionSourceMap: false,
    productionGzip: false,
  },
}
