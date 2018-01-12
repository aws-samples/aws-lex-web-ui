const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');

const basePath = __dirname;
const VERSION = JSON.stringify(require('./package.json').version);
const devServerPort = (process.env.PORT) ? Number(process.env.PORT) : 8000;

module.exports = (env) => {
  const buildEnv = env || 'development';
  const isProd = (buildEnv === 'production');
  return {
    context: path.join(basePath, 'src/lex-web-ui-loader/js'),
    entry: {
      'lex-web-ui-loader': './index.js',
    },
    output: {
      path: path.join(basePath, 'dist'),
      filename: (isProd) ? '[name].min.js' : '[name].js',
      library: 'ChatBotUiLoader',
      libraryExport: 'ChatBotUiLoader',
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          enforce: 'pre',
          loader: 'eslint-loader',
          options: {
            formatter: eslintFriendlyFormatter,
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: (isProd) ?
              ['css-loader', 'postcss-loader'] :
              ['css-loader'],
          }),
        },
      ],
    },
    devtool: (isProd) ? 'source-map' : 'cheap-module-source-map',
    devServer: {
      contentBase: [
        path.join(__dirname, 'dist'),
        path.join(__dirname, 'src/config'),
        path.join(__dirname, 'src/website'),
      ],
      clientLogLevel: 'warning',
      hot: true,
      port: devServerPort,
      overlay: { warnings: false, errors: true },
      stats: 'errors-only',
      watchOptions: {
        poll: true,
      },
    },
    stats: {
      modules: false,
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(buildEnv),
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      isProd && new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_console: true,
          drop_debugger: true,
        },
        sourceMap: true,
        parallel: true,
      }),
      isProd && new webpack.BannerPlugin({
        banner: `/*!
* lex-web-ui v${VERSION}
* (c) 2017-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
* Released under the Amazon Software License.
*/  `,
        raw: true,
        entryOnly: true,
      }),
      new ExtractTextPlugin({
        filename: (isProd) ? '[name].min.css' : '[name].css',
      }),
      // dev plugins
      !isProd && new webpack.NamedModulesPlugin(),
      !isProd && new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ]
      // filter empty items produced by isProd conditionals
      .filter(i => !!i),
  };
};
