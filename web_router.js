var router = require('koa-router')();
var site = require('./routes/site');
var user = require('./routes/user');
var order = require('./routes/order');

var chef = require('./routes/chef');
var manager = require('./routes/manager');
var table = require('./routes/table');

var authControl = require('./middleware/authControl');//  权限控制
var authRequired = authControl.authRequired;
var roleRequired = authControl.roleRequired;

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

router.get('/employee/login', site.employeeLogin);//  员工登陆界面

router.get('/table', roleRequired('employee'), table.index);//  餐桌显示界面

exports = module.exports = router;
