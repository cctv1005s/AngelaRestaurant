const app = require('koa')();
const logger = require('koa-logger');
const json = require('koa-json');
const Pug = require('koa-pug');
const onerror = require('koa-onerror');
const session = require('koa-session-redis');
const Loader = require('loader');
const config = require('./config.json');

require('./models');

const webRouter = require('./web_router.js');
const apiRouter = require('./api_router.js');

// error handler-
onerror(app);

// global middlewares
const pug = new Pug({
  viewPath: './views',
  debug: true,
  noCache: true,
  helperPath: [
    { Loader },
  ],
  app,
});

pug.locals = Object.assign(pug.locals, {
  title: config.title,
  sitename: '',
});

app.keys = ['restaurant'];
app.use(session({
  store: {
    host: config.redis.host,
    port: config.redis.port,
    ttl: config.redis.ttl,
  },
}));

app.use(require('koa-bodyparser')());

app.use(json());
app.use(logger());

app.use(function* (next) {
  const start = new Date();
  yield next;
  const ms = new Date() - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(`${__dirname}/public`));
// routes definition
app.use(webRouter.routes(), webRouter.allowedMethods());
app.use(apiRouter.routes(), apiRouter.allowedMethods());

module.exports = app;

app.listen(config.port);
