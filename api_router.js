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

router.post('/order/reserve',order.reserve);//预定

module.exports = router;