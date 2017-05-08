
var router = require('koa-router')();
var user = require('./api/user');
var menu = require('./api/menu');
var table = require('./api/table');
var order = require('./api/order')

router.prefix('/api/v1');

router.use(function* (next) {
    var { AccessToken } = this.request.body;
    if (!AccessToken) {

    }
    yield next;
});

router.post('/signin', user.signin);//登陆
router.post('/signout', user.signout);//登出
router.post('/signup', user.signup);//注册




router.prefix('/api/v1');

router.post('/signin', user.signin);// 登陆
router.post('/signout', user.signout);// 登出
router.post('/signup', user.signup);// 注册


/**
 * order部分
 */
router.post('/order/reserve',order.reserve);//预定
router.post('/order/:id/add',order.addDish);//增加要做的菜
router.post('/order/:id/sub',order.subDish);//删除某道未做的菜
router.post('/order/:id/cancel',order.cancelOrder);//删除某道未做的菜
router.post('/order/:id/pay',order.payforOrder);//删除某道未做的菜




/**
 * user部分
 */
router.get('/user/:id', user.get);


router.get('/user',user.getOwnInfo);



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
 * table部分
 */
router.post('/table/:id/bind', table.bind);
router.get('/table', table.table);
router.get('/table/:id', table.oneTable);
router.post('/table/cleanup', table.cleanup);

module.exports = router;
