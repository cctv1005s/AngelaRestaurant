const router = require('koa-router')();
const user = require('./api/user');
const menu = require('./api/menu');
const order = require('./api/order');
const sign = require('./api/sign');
const table = require('./api/table');
const authControl = require('./middleware/authControl.js');// 权限控制
const token = require('./middleware/token.js');// token转换函数

//  权限控制函数
const authRequired = authControl.authRequired;



/**
 * order部分
 */
router.post('/order/reserve', order.reserve);// 预定
router.post('/order/:id/add', order.addDish);// 增加要做的菜
router.post('/order/:id/sub', order.subDish);// 删除某道未做的菜
router.post('/order/:id/cancel', order.cancelOrder);// 删除某道未做的菜
router.post('/order/:id/pay', order.payforOrder);// 删除某道未做的菜


/**
 * user部分
 */
router.get('/user/:id', user.get);//  获取用户的基本信息
router.get('/user/canOrder', user.canOrder);// 判断自己是否可以开始点餐了
router.get('/user', user.getOwnInfo);//   获取自己的基本信息

/**
 * 菜单部分
 */
router.get('/menu/type/:id', menu.oneType);
router.get('/menu/type', menu.type);

/**
 * 餐桌部分
 */
router.post('/table/:id/bind', authRequired(3), table.bind);

module.exports = router;
