var router = require('koa-router')();
var user = require('./api/user');
router.prefix('/api/v1');
router.use(function*(next){
    var {AccessToken} = this.request.body;
    if(!AccessToken){
        
    }
    yield next;
});

router.post('/signin',user.signin);//登陆
router.post('/signout',user.signout);//登出

/**
 * 用户部分api
 */
router.get('/user/:id',user.get);//获取某一个用户的基本信息
module.exports = router;