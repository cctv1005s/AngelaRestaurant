var app = require('koa')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , Pug = require('koa-pug')
  , onerror = require('koa-onerror')
  , session = require('koa-session-redis')
  , Loader = require('loader');

require('./models');

var web_router = require('./web_router.js');
var api_router = require('./api_router.js');

// error handler
onerror(app);

// global middlewares
var pug = new Pug({
  viewPath:"./views",
  debug:true,
  helperPath:[
    {Loader:Loader}
  ],
  app:app
});

app.keys = ['restaurant'];
app.use(session({
  store:{
    host:'localhost',
    port:6380,
    ttl:3600
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
