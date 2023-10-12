const fs = require('fs');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const distDir = path.resolve(__dirname, 'dist');
const assetsDir = path.resolve(__dirname, 'src/assets');

const PACKAGE_VERSION = require('./package.json').version;

/*
favicon.png and logo.png variables
Normally, the custom favicon.png and logo.png images should go in the
`public` directory. However, for backwards compatibility with the older
vue cli setup, you can alterantively place them in the `src/assets` dir.
These images are copied from the `src/assets` directory to the `dist` dir
during build.
NOTE: if you place the images both in the `src/assets` and `public` dir, the
`public` dir will have precedence.
If there are no custom images, the build defaults use the flower icon
from the material design icons library
*/
const favIconPath = `${assetsDir}/favicon.png`;
const logoPath = `${assetsDir}/logo.png`;
const flowerLogoPath = path.resolve(
  __dirname,
  'node_modules/material-design-icons/maps/2x_web/ic_local_florist_white_18dp.png',
);

// HTML page title injected into index.html by webpack
const pageTitle = 'Lex Web UI';

const buildType = {
  isLib: (process.env.BUILD_TARGET === 'lib'),
  isApp: (process.env.BUILD_TARGET === 'app'),
  isProd: (process.env.NODE_ENV === 'production'),
  isDev: (process.env.NODE_ENV === 'development'),
};

function getAssetPath(filePath, defaultPath) {
  const fileExists = fs.existsSync(filePath);
  return fileExists ? filePath : defaultPath;
}

function chainWebpackWorker(config, destDir = '', srcDir = 'src/lib') {
  const workerBaseDir = (destDir) ? `${destDir}/` : '';
  const workerBaseFilename = `${workerBaseDir}[name]`;
  const workerFilename = (buildType.isProd)
    ? `${workerBaseFilename}.min.js` : `${workerBaseFilename}.js`;

  // configure worker loader
  config.module
    .rule('worker')
    .test(/-worker\.js$/)
    .include
    .add(path.resolve(__dirname, srcDir))
    .end()
    .use('worker-loader')
    .loader('worker-loader')
    .options({
      filename: workerFilename,
      // generate a fallback js file for compatibility with older browsers
      inline: 'fallback',
    });

  // exclude worker from regular js loader
  config.module.rule('js').exclude.add(/-worker\.js$/).end();

  // use Babel in worker
  config.module
    .rule('babel-worker')
    .test(/-worker\.js$/)
    .use('babel-loader')
    .loader('babel-loader')
    .end();
}

function chainWebpackCommon(config, destDir) {
  config.optimization.minimize(buildType.isProd);
  config.optimization.minimizer('terser')
    .tap((args) => {
      // eslint-disable-next-line no-param-reassign
      args[0].terserOptions.compress.drop_console = buildType.isProd;
      return args;
    })
    .end();

  config.devtool(buildType.isProd ? false : 'source-map');

  chainWebpackWorker(config, destDir);

  config.plugin('define')
    .tap((args) => {
      // eslint-disable-next-line no-param-reassign
      args[0]['process.env'].PACKAGE_VERSION = `"${PACKAGE_VERSION}"`;
      return args;
    })
    .end();

  config.plugin('NodePolyfillPlugin').use(new NodePolyfillPlugin());
}

function chainWebpackLib(
  config,
  entryName = 'lex-web-ui',
  entryFileName = './src/lex-web-ui.js',
  destDir = 'bundle',
  libraryName = 'LexWebUi',
  format = 'umd',
) {
  const baseFilename = `${destDir}/${entryName}`;
  const filename = (buildType.isProd)
    ? `${baseFilename}.min.js` : `${baseFilename}.js`;

  config
    .entry(entryName)
    .add(entryFileName)
    .end()
    .output
    .libraryTarget(format)
    .library(libraryName)
    .filename(filename);

  chainWebpackCommon(config, destDir);

  config.externals([
    // XXX TODO need to add dependencies below to the lex-web-ui-loader
    // 'jsonwebtoken',
    // 'marked',
    'vue',
    'vuex',
    'vue-router',
    'vuetify',
    /^aws-sdk\/.+$/,
  ]);

  config.optimization.splitChunks({
    cacheGroups: {
      default: false,
    },
  });
  config.optimization.runtimeChunk(false);

  if (config.plugins.has('extract-css')) {
    config
      .plugin('extract-css')
      .tap((args) => {
        const cssFilename = (buildType.isProd)
          ? `${baseFilename}.min.css` : `${baseFilename}.css`;
        // eslint-disable-next-line no-param-reassign
        args[0].filename = cssFilename;
        return args;
      })
      .end();
  }

  if (config.plugins.has('html')) {
    config
      .plugin('html')
      .tap((args) => {
        // eslint-disable-next-line no-param-reassign
        args[0].filename = (buildType.isProd)
          ? `${destDir}/index.min.html` : `${destDir}/index.html`;
        return args;
      })
      .end();
  }

  config.plugin('define')
    .tap((args) => {
      // eslint-disable-next-line no-param-reassign
      args[0]['process.env'].BUILD_TARGET = `"${process.env.BUILD_TARGET}"`;
      return args;
    })
    .end();

  config.plugin('banner')
    .use(webpack.BannerPlugin, [{
      banner: `/*!
* lex-web-ui v${PACKAGE_VERSION}
* (c) 2017-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
* Released under the Amazon Software License.
*/  `,
      raw: true,
      entryOnly: true,
      exclude: /[\\/]node_modules[\\/]/,
    }]);
}

function chainWebpackApp(config, destDir = '') {
  config.output.filename(
    (buildType.isProd) ? '[name].min.js' : '[name].js',
  );

  chainWebpackCommon(config, destDir);

  config
    .plugin('html')
    // set title in html file
    .tap((args) => {
      // eslint-disable-next-line no-param-reassign
      args[0].title = pageTitle;
      return args;
    })
    .end()

    // copy artifacts to dist directory
    .plugin('copy')
    .tap((args) => {
      // unshift to have lower precedence
      // from the default vue cli `public` rule
      const patterns = Array.from(args[0]);
      patterns.unshift(
        // favicon.png
        {
          from: getAssetPath(favIconPath, flowerLogoPath),
          to: `${distDir}/favicon.png`,
        },
        // logo.png
        {
          from: getAssetPath(logoPath, flowerLogoPath),
          to: `${distDir}/logo.png`,
        },
      );
      // eslint-disable-next-line no-param-reassign
      args[0] = { patterns };
      return args;
    });
}

module.exports = {
  chainWebpack: (buildType.isLib) ? chainWebpackLib : chainWebpackApp,
};
