var router = require('koa-router')();
var site = require('./routes/site');
var user = require('./routes/user');

/**
 * 静态界面地址
 */
router.get('/',site.index);//首页
router.get('/signin',site.index);//登陆界面

router.get('/user',user.index);//用户首页

router.get('/reserve',user.reserve);//预定

router.get('/tokenid',user.tokenid);//显示用户的tokenid

exports = module.exports =router;