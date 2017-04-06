var router = require('koa-router')();
var site = require('./routes/site');

/**
 * 静态界面地址
 */
router.get('/',site.index);
exports = module.exports =router;