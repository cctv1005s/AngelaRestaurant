var router = require('koa-router')();
var site = require('./routes/site');
var user = require('./routes/user');
var order = require('./routes/order');

var chef = require('./routes/chef');
var manager = require('./routes/manager');

router.use(function* (next) {
  console.log("i love it");
  console.log(this.request.body);
  yield next;
});
/**
 * 静态界面地址
 */
router.get('/', site.index);// 首页
router.get('/signin', site.index);// 登陆界面

router.get('/user', user.index);// 用户首页

router.get('/reserve', user.reserve);// 预定

router.get('/tokenid', user.tokenid);// 显示用户的tokenid

router.get('/order/menu', order.menu);// 给用户的订单点单

router.get('/chef', chef.index);// 厨师端界面

router.get('/manager', manager.index);// 经理端界面

router.get('/session', function () {
  this.body = { session: this.session.user };
});

exports = module.exports = router;
