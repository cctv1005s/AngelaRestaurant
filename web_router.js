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
router.get('/signout', site.signout);//  登出
router.get('/signup', site.signup);// 注册

router.get('/user', authRequired(), user.index);// 用户首页

router.get('/reserve', authRequired(), user.reserve);// 预定

router.get('/tokenid', authRequired(), user.tokenid);// 显示用户的tokenid

router.get('/order/menu/:id', order.menu);// 菜单-点单界面

router.get('/chef', chef.index);// 厨师端界面

router.get('/manager', authRequired(7), manager.index);// 经理端界面

router.get('/employee/login', site.employeeLogin);//  员工登陆界面

router.get('/table', roleRequired('employee'), table.index);//  餐桌显示界面

exports = module.exports = router;
