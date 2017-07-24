var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  DIST_BUILD: '"true"',
  PUBLIC_PATH: (process.env.PUBLIC_PATH) ?
    `"${process.env.PUBLIC_PATH}"` : '"/"',
})
