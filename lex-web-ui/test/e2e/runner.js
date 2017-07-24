// 1. start the dev server using production config
var server;
process.env.NODE_ENV = 'testing';

// lex-web-ui: added ability to test using running web server
var config = require('../../config')
var devServerPort = config.dev.port;
var devServerPath = config.dev.assetsPublicPath;
var http = require('http');

var request = http.get({
  hostname: 'localhost',
  port: devServerPort,
  path: devServerPath,
});

request.on('response', (response) => {
  if (response.statusCode === 200) {
    runNightwatch();
  }
});

request.on('error', (error) => {
  if (error.code === 'ECONNREFUSED' || error.code === 'ECONNRESET') {
    startDevServer();
  } else {
    throw error;
  }
});

request.on('timeout', () => {
    startDevServer();
});

request.setTimeout(5000);
request.end();

function startDevServer() {
  server = require('../../build/dev-server.js');
  server.ready.then(() => {
    runNightwatch();
  });
}

function runNightwatch() {
  // 2. run the nightwatch test suite against it
  // to run in additional browsers:
  //    1. add an entry in test/e2e/nightwatch.conf.json under "test_settings"
  //    2. add it to the --env flag below
  // or override the environment flag, for example: `npm run e2e -- --env chrome,firefox`
  // For more information on Nightwatch's config file, see
  // http://nightwatchjs.org/guide#settings-file
  var opts = process.argv.slice(2);
  if (opts.indexOf('--config') === -1) {
    opts = opts.concat(['--config', 'test/e2e/nightwatch.conf.js']);
  }
  if (opts.indexOf('--env') === -1) {
    opts = opts.concat(['--env', 'chrome']);
  }

  var spawn = require('cross-spawn');
  var runner = spawn('./node_modules/.bin/nightwatch', opts, { stdio: 'inherit' });

  runner.on('exit', function (code) {
    server && server.close();
    process.exit(code);
  });

  runner.on('error', function (err) {
    server && server.close();
    throw err;
  });
}
