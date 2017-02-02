var path = require('path')
var express = require('express')
var request = require('request')
var webpack = require('webpack')
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var apiRoutes = express.Router()
var headers = {
  'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
  'Cookie':'app_id=mi_wap; build=8888; device_id=D950F1TFKU3IBFFU; user_type=2; device_hash=496f44881d27ff72819bace744e4b625; Hm_lvt_a1d10542fc664b658c3ce982b1cf4937=1485254476,1485297249,1485383348,1485493502; Hm_lpvt_a1d10542fc664b658c3ce982b1cf4937=1485501661'
  }

apiRoutes.param('id', function (req, res, next, id) {
  next();
})

apiRoutes.get('/book/:id', (req, res) => {
  let id = req.params.id
  let options = {
    url: `http://dushu.xiaomi.com/hs/v0/android/fiction/book/${id}`,
    headers
  }
  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.json(JSON.parse(body))
    }
  })
})

apiRoutes.get('/detail/:id', (req, res) => {
  let id = req.params.id
  let options = {
    url: `http://dushu.xiaomi.com/store/v0/fiction/detail/${id}`,
    headers
  }
  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.json(JSON.parse(body))
    }
  })
})

apiRoutes.get('/link', (req, res) => {
  let fid = req.query.fiction_id || '18211'
  let cid = req.query.chapter_id || '1'
  let options = {
    url: `http://dushu.xiaomi.com/drm/v0/fiction/link?fiction_id=${fid}&chapter_id=${cid}&format=jsonp`,
    headers
  }
  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.json(JSON.parse(body))
    }
  })
})

apiRoutes.get('/recommend', (req, res) => {
  let start = req.query.start || '0'
  let options = {
    url: `http://dushu.xiaomi.com/rock/book/recommend?start=${start}&count=10`,
    headers
  }
  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.json(JSON.parse(body))
    }
  })
})

apiRoutes.get('/channel/:id', (req, res) => {
  let id = req.params.id || '418'
  if (!['369', '370', '371'].some((cid) => cid === id)) {
    id = '418'
  }
  res.json(require(`../mock/channel/${id}.json`))
})

apiRoutes.get('/category', (req, res) => {
  res.json(require(`../mock/category.json`))
})

app.use('/api', apiRoutes)

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
