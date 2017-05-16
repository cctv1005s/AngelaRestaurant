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
router.prefix('/api/v1');
router.use(token.token2session);//  将传入的Token值查找到用户之后转换为session

router.post('/signin', sign.signin);// 登陆
router.get('/signout', sign.signout);// 登出
router.post('/signup', sign.signup);// 注册
router.post('/employeeSignin', sign.employeeSignin);// 员工登陆
/*
 * order部分
 */
router.post('/order/reserve', order.reserve);// 预定
router.post('/order/:id/add', order.addDish);// 增加要做的菜
router.post('/order/:id/sub', order.subDish);// 删除某道未做的菜
router.post('/order/:id/cancel', order.cancelOrder);// 删除某道未做的菜
router.post('/order/:id/pay', order.payforOrder);// 删除某道未做的菜
router.get('/order/:id/dish', order.dish);//  查看某个订单的某道菜

/**
 * user部分
 */
router.get('/user/:id', user.get);//  获取用户的基本信息
router.get('/user/canOrder', authRequired(), user.canOrder);// 判断自己是否可以开始点餐了
router.get('/user', user.getOwnInfo);//   获取自己的基本信息

/**
 * 菜单部分
 */
router.post('/menu/type/add', authRequired(7), menu.addType);
router.post('/menu/type/delete', authRequired(7), menu.deleteType);
router.post('/menu/type/update', authRequired(7), menu.updateType);
router.get('/menu/type/:id', menu.oneType);
router.get('/menu/type', menu.type);
router.post('/menu/dish/add', authRequired(7), menu.addDish);
router.post('/menu/dish/delete', authRequired(7), menu.deleteDish);
router.post('/menu/dish/update', authRequired(7), menu.updateDish);
router.post('/menu/dish/stop', authRequired(7), menu.stopDish);
router.get('/menu/dish/:id', menu.oneDish);
/**
 * table部分
 */
router.post('/table/:id/bind', authRequired(3) ,table.bind);
router.get('/table',authRequired(6), table.table);
router.get('/table/:id',authRequired(6) ,table.oneTable);
router.post('/table/cleanup',authRequired(6), table.cleanup);

module.exports = router;
