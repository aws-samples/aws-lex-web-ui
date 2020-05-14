const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const eslintFormatterFriendly = require('eslint-formatter-friendly');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


const VERSION = require('./package.json').version;

const basePath = __dirname;
const distDir = path.join(basePath, 'dist');
const devServerPort = (process.env.PORT) ? Number(process.env.PORT) : 8000;

module.exports = (env) => {
  const buildEnv = env || 'development';
  const isProd = (buildEnv === 'production');

  return {
    mode: (isProd) ? 'production' : 'development',
    context: path.join(basePath, 'src/lex-web-ui-loader/js'),
    entry: {
      'lex-web-ui-loader': './index.js',
    },
    output: {
      path: distDir,
      filename: (isProd) ? '[name].min.js' : '[name].js',
      library: 'ChatBotUiLoader',
      libraryExport: 'ChatBotUiLoader',
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        /* TODO pending clean-up to re-enable
        {
          test: /\.js$/,
          exclude: /[\\/]node_modules[\\/]/,
          enforce: 'pre',
          loader: 'eslint-loader',
          options: {
            formatter: eslintFormatterFriendly,
          },
        },
        */
        {
          test: /\.js$/,
          exclude: /[\\/]node_modules[\\/]/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: (isProd) ? [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'postcss-loader',
          ] : [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: true,
              },
            },
            'css-loader',
          ],
        },
      ],
    },
    devtool: (isProd) ? 'source-map' : 'cheap-module-source-map',
    devServer: {
      contentBase: [
        path.join(__dirname, 'src/config'),
        path.join(__dirname, 'src/website'),
        distDir,
      ],
      clientLogLevel: 'warning',
      hot: true,
      port: devServerPort,
      overlay: { warnings: false, errors: true },
      stats: 'errors-only',
    },
    stats: {
      modules: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(basePath, 'src/website/index.html'),
        // script is included in template
        inject: false,
      }),
      new HtmlWebpackPlugin({
        filename: 'parent.html',
        template: path.join(basePath, 'src/website/parent.html'),
        // script is included in template
        inject: false,
      }),
      isProd && new webpack.BannerPlugin({
        banner: `/*!
* lex-web-ui v${VERSION}
* (c) 2017-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
* Released under the Amazon Software License.
*/  `,
        raw: true,
        entryOnly: true,
        exclude: /[\\/]node_modules[\\/]/,
      }),
      new MiniCssExtractPlugin({
        filename: (isProd) ? '[name].min.css' : '[name].css',
      }),
      new CopyPlugin([
        // copy parent page
        {
          from: path.join(basePath, 'src/website/parent.html'),
          to: distDir,
        },
        // copy custom css
        {
          from: path.join(basePath, 'src/website/custom-chatbot-style.css'),
          to: distDir,
        },
        // copy lex-web-ui library
        {
          from: path.join(basePath, 'lex-web-ui/dist/bundle'),
          to: distDir,
        },
      ]),
    ].filter(Boolean),
  };
};
