
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


router.use(function* (next) {
    var { AccessToken } = this.request.body;
    if (!AccessToken) {

    }
    yield next;
});





router.prefix('/api/v1');
router.use(token.token2session);//  将传入的Token值查找到用户之后转换为session

router.post('/signin', sign.signin);// 登陆
router.get('/signout', sign.signout);// 登出
router.post('/signup', sign.signup);// 注册
router.post('/employeeSignin', sign.employeeSignin);// 员工登陆

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
router.post('/menu/type/add', menu.addType);
router.post('/menu/type/delete', menu.deleteType);
router.post('/menu/type/update', menu.updateType);
router.get('/menu/type/:id', menu.oneType);
router.get('/menu/type', menu.type);
router.post('/menu/dish/add', menu.addDish);
router.post('/menu/dish/delete', menu.deleteDish);
router.post('/menu/dish/update', menu.updateDish);
router.post('/menu/dish/stop', menu.stopDish);
router.get('/menu/dish/:id', menu.oneDish);


/**
 * 餐桌部分
 */
router.post('/table/:id/bind', authRequired(3), table.bind);
router.get('/table', table.table);
router.get('/table/:id', table.oneTable);
router.post('/table/cleanup', table.cleanup);

module.exports = router;