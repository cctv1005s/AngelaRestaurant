var app = require('koa')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , Pug = require('koa-pug')
  , onerror = require('koa-onerror')
  , session = require('koa-session-redis')
  , Loader = require('loader')
  , config = require('./config.json')
  , load = require('pug-load');

require('./models');

var web_router = require('./web_router.js');
var api_router = require('./api_router.js');

// error handler
onerror(app);

// global middlewares
var pug = new Pug({
  viewPath:"./views",
  debug:true,
  noCache:true,
  helperPath:[
    {Loader:Loader}
  ],
  app:app
});

pug.locals = Object.assign(pug.locals, {
  title: config.title,
  sitename:""
});

app.keys = ['restaurant'];
app.use(session({
  store:{
    host:config.redis.host,
    port:config.redis.port,
    ttl:config.redis.ttl
  }
}));

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));
// routes definition
app.use(web_router.routes(), web_router.allowedMethods());
app.use(api_router.routes(), api_router.allowedMethods());

module.exports = app;
