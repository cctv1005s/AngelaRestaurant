var router = require('koa-router')();
var user = require('./api/user');
var chef = require('./api/chef');
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
 * 厨师
 */
router.get('/chef/:ChefID/order',chef.GetOrder);//查看分配给我的菜品
router.get('/chef/:ChefID/confirm/:DishID',chef.Confirm);//确认开始做某一道菜
router.get('/chef/:ChefID/finish/:DishID',chef.Finish);//确认某一道菜完成
router.get('/chef/:ChefID/cancel/:DishID',chef.Cancle);//取消某一道菜
router.get('/chef/:ChefID/rest',chef.Rest);//将自己标记为休息状态

module.exports = router;