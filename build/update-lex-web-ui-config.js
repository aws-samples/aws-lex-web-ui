/**
 * Updates config values in the lex-web-ui
 * This is called during build process by CodeBuild
 */
var fs = require('fs');

var confFile = {
  iframe:
    process.env.IFRAME_CONFIG ||
    '../lex-web-ui/static/iframe/config.json',

  appProd:
    process.env.WEBAPP_CONFIG_PROD ||
    '../lex-web-ui/src/config/config.prod.json',

  appDev:
    process.env.WEBAPP_CONFIG_DEV ||
    '../lex-web-ui/src/config/config.dev.json',
};

console.log('Reading config file content: ',
  confFile.iframe, confFile.appProd, confFile.appDev
);

var configs = {
  iframe: {
    file: confFile.iframe,
    conf: require(confFile.iframe),
  },
  appProd: {
    file: confFile.appProd,
    conf: require(confFile.appProd),
  },
  appDev: {
    file: confFile.appDev,
    conf: require(confFile.appDev),
  },
};

// two level merge of config objects
function mergeConfig(baseConfig, envConfig) {
  return Object.keys(envConfig)
  .map(function (key) {
    var mergedConfig = {};
    var value = envConfig[key];
    if (key in baseConfig) {
      value = (typeof envConfig[key] === 'object') ?
        Object.assign({}, baseConfig[key], envConfig[key]) :
        envConfig[key];
    }
    mergedConfig[key] = value;
    return mergedConfig;
  })
  .reduce(function (merged, configItem) {
      return Object.assign({}, merged, configItem);
    },
    {}
  );
}

[
  'AWS_DEFAULT_REGION',
  'BOT_NAME',
  'IFRAME_ORIGIN',
  'POOL_ID',
].forEach(function (envVar) {
  console.log('[INFO] Env var - %s: [%s]', envVar, process.env[envVar]);
});

var iframeConfig = {
  iframeOrigin:
    process.env.IFRAME_ORIGIN || configs.iframe.conf.iframeOrigin,
  aws: {
    cognitoPoolId:
      process.env.POOL_ID || configs.iframe.conf.aws.cognitoPoolId,
    region:
      process.env.AWS_DEFAULT_REGION || configs.iframe.conf.aws.region,
  },
  iframeConfig: configs.iframe.conf.iframeConfig || {},
};
configs.iframe.conf = mergeConfig(configs.iframe.conf, iframeConfig);

var appConfigProd = {
  cognito: {
    poolId:
      process.env.POOL_ID || configs.appProd.conf.cognito.poolId,
  },
  lex: {
    botName:
      process.env.BOT_NAME || configs.appProd.conf.lex.botName,
  },
  ui: {
    parentOrigin:
      process.env.PARENT_ORIGIN || configs.appProd.conf.ui.parentOrigin,
  },
  polly: {},
  recorder: {},
};
configs.appProd.conf = mergeConfig(configs.appProd.conf, appConfigProd);

var appConfigDev = {
  cognito: {
    poolId:
      process.env.POOL_ID || configs.appDev.conf.cognito.poolId,
  },
  lex: {
    botName:
      process.env.BOT_NAME || configs.appDev.conf.lex.botName,
  },
  polly: {},
  recorder: {},
  ui: {},
};
configs.appDev.conf = mergeConfig(configs.appDev.conf, appConfigDev);

console.log('[INFO] Updating config files: ',
  confFile.iframe, confFile.appProd, confFile.appDev
);

Object.keys(configs)
.map(function (confKey) { return configs[confKey]; })
.forEach(function (item) {
  fs.writeFile(item.file, JSON.stringify(item.conf, null, 2), function (err) {
    if (err) {
      console.error('[ERROR] could not write file: ', err);
      process.exit(1);
    }
    console.log('[INFO] Updated file: ', item.file);
    console.log('[INFO] Config contents: ', JSON.stringify(item.conf));
  });
});
