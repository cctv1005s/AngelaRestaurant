var router = require('koa-router')();
var site = require('./routes/site');

/**
 * 静态界面地址
 */
router.get('/',site.index);
router.get('/signin',site.signin);
router.get('/signup',site.signup);
router.get('/signout',site.signout);

exports = module.exports =router;