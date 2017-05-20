const router = require('koa-router')();
const user = require('./api/user');
const menu = require('./api/menu');
const order = require('./api/order');
const sign = require('./api/sign');
const table = require('./api/table');
const staff = require('./api/staff');
var chef = require('./api/chef');

const authControl = require('./middleware/authControl.js');// 权限控制
const token = require('./middleware/token.js');// token转换函数

//  权限控制函数
const authRequired = authControl.authRequired;
router.prefix('/api/v1');
router.use(token.token2session);//  将传入的Token值查找到用户之后转换为session

router.post('/signin', sign.signin);// 登陆
router.get('/signout', sign.signout);// 登出
router.post('/signup', sign.signup);// 注册
router.post('/employeeSignin', sign.employeeSignin);// 员工登录

/*
 * order部分
 */
router.post('/order/reserve', authRequired(), order.reserve);// 预定
router.post('/order/:id/add', authRequired(2), order.addDish);// 增加要做的菜
router.post('/order/:id/sub', authRequired(2), order.subDish);// 删除某道未做的菜
router.post('/order/:id/cancel', authRequired(3), order.cancelOrder);// 取消某个订单
router.post('/order/:id/pay', authRequired(2), order.payforOrder);// 支付
router.get('/order/:id/dish', authRequired(2), order.dish);//  查看某个订单的某道菜
router.get('/order/list', order.getOrderList);//  查看某个订单的某道菜

/*
 * 厨师部分
 */
router.get('/chef/:ChefID/order', authRequired(8), chef.GetOrder);// 查看分配给我的菜品
router.post('/chef/:ChefID/confirm/:DishID', authRequired(8), chef.Confirm);// 确认开始做某一道菜
router.post('/chef/:ChefID/finish/:DishID', authRequired(8), chef.Finish);// 确认某一道菜完成
router.post('/chef/:ChefID/cancel/:DishID', authRequired(8), chef.Cancle);// 取消某一道菜
router.post('/chef/:ChefID/rest', authRequired(8), chef.Rest);// 将自己标记为休息状态

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
router.post('/table/:id/bind', authRequired(3), table.bind);
router.get('/table', authRequired(6), table.table);
router.get('/table/:id', authRequired(6), table.oneTable);
router.post('/table/cleanup', authRequired(6), table.cleanup);
/**
 * staff部分
 */
router.get('/staff/type', authRequired(7), staff.type);
router.post('/staff/type/add', authRequired(7), staff.addtype);
router.get('/staff/:id', authRequired(7), staff.getemDetail);
router.post('/staff/add', authRequired(7), staff.addemployee);
router.post('/staff/update', authRequired(7), staff.updateEmployee);
router.post('/staff/sub', authRequired(7), staff.deleteEmployee);

module.exports = router;
