'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({sourceMap: sourceMapEnabled, extract: isProduction}),
  cssSourceMap: sourceMapEnabled,
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  cssModules: {
    localIdentName: '[path][name]---[local]---[hash:base64:5]',
    camelCase: true
  },
  autoprefixer: {
    browsers: [
      "Android >= 2.3", "ChromeAndroid > 1%", "iOS >= 7"
    ],
    cascade: false // 不美化输出 css
  }
}
