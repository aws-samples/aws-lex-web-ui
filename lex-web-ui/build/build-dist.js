require('./check-versions')();

process.env.NODE_ENV = 'production';
process.env.DIST_BUILD = 'true'

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const distWebpackConfig = require('./webpack.dist.conf');

const builds = [
  {
    description: 'library for distribution',
    config: distWebpackConfig.regular,
  },
  {
    description: 'minimized library for distribution',
    config: distWebpackConfig.minimized,
  },
];

// lex-web-ui: added to build the component in a distribution bundle
const distDir = path.join(config.build.assetsRoot, config.dist.assetsSubDirectory);
const spinner = ora();
spinner.start(
  `removing existing files under: ${distDir}...`
);

// NOTE: sharp edge make sure these directories point to the right place
rm(distDir, err => {
  if (err) {
    spinner.fail();
    throw err;
  }
  spinner.succeed('removed existing files');

  builds.forEach(build => {
    spinner.start('building as library for distribution...');
    webpack(build.config, (err, stats) => {
      if (err) {
        spinner.fail();
        throw err;
      }
      spinner.succeed(
        `built ${build.description} under ${config.build.assetsRoot}`,
      );
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');

      if (stats.hasErrors()) {
        console.log(stats.toString({
          chunks: false,
          colors: true
        }));
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1)
      }
    });
  });
});
