const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

const styleLoaders = require('./utils').styleLoaders;

const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf');

process.env.NODE_ENV = 'production';
process.env.DIST_BUILD = 'true';

const assetsPath = assetPath =>
  path.posix.join(config.dist.assetsSubDirectory, assetPath);

const minPlugIns = [
  new webpack.DefinePlugin({
    'process.env': config.dist.env
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true,
      drop_debugger: true,
    },
  }),
  // extract css into its own file
  new ExtractTextPlugin({
    filename: assetsPath('[name].min.css'),
  }),
  // Compress extracted CSS. We are using this plugin so that possible
  // duplicated CSS from different components can be deduped.
  new OptimizeCSSPlugin({
    cssProcessorOptions: {
      safe: true
    }
  }),
  new webpack.BannerPlugin({
    banner: `/*!
* lex-web-ui v${config.dist.env.PACKAGE_VERSION}
* (c) 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
* Released under the Amazon Software License.
*/   ` ,
    raw: true,
    entryOnly: true
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new OptimizeJsPlugin({
    sourceMap: false,
  }),
];

const regularPlugIns = [
  new webpack.DefinePlugin({
    'process.env': config.dist.env
  }),
  // extract css into its own file
  new ExtractTextPlugin({
    filename: assetsPath('[name].css'),
  }),
];

function buildConfig(minimize = true) {
  // remove sample app entry from merged config to avoid rebuilding it
  delete baseWebpackConfig.entry.app;

  return merge(baseWebpackConfig, {
    entry: {
      [config.dist.bundleName]: config.dist.entry,
    },
    module: {
      rules: [
        {
          test: /-worker\.js/,
          loader: 'worker-loader',
          options: {
            name: (minimize) ?
              assetsPath('[name].min.[ext]') :
              assetsPath('[name].[ext]'),
            inline: true,
          }
        },
        ...styleLoaders({
          sourceMap: config.dist.productionSourceMap,
          extract: true
        }),
      ],
    },
    devtool: (minimize) ? false : '#source-map',
    // avoid bundling dependencies
    externals: [
      'vue',
      'vuex',
      'vuetify',
      /^aws-sdk\/.+$/,
    ],
    output: {
      path: config.dist.assetsRoot,
      publicPath: config.dist.assetsPublicPath,
      filename: (minimize) ?
        assetsPath('[name].min.js') :
        assetsPath('[name].js'),
      chunkFilename: (minimize) ?
        assetsPath('[id].min.js') :
        assetsPath('[id].js'),
      // build as a library
      library: 'LexWebUi',
      libraryTarget: 'umd',
    },
    plugins: (minimize) ? minPlugIns :regularPlugIns,
  });
}

module.exports.minimized = buildConfig(true);
module.exports.regular = buildConfig(false);
