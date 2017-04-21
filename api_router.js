var router = require('koa-router')();
var user = require('./api/user');

var order = require('./api/order')

router.prefix('/api/v1');

router.use(function*(next){
    var {AccessToken} = this.request.body;
    if(!AccessToken){
        
    }
    yield next;
});

router.post('/signin',user.signin);//登陆
router.post('/signout',user.signout);//登出
router.post('/signup',user.signup);//注册


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
router.get('/user/:id',user.get);

router.get('/user',user.getOwnInfo);


module.exports = router;