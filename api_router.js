const router = require('koa-router')();
const user = require('./api/user');
const menu = require('./api/menu');

router.prefix('/api/v1');

router.post('/signin', user.signin);// 登陆
router.post('/signout', user.signout);// 登出
router.post('/signup', user.signup);// 注册

/**
 * user部分
 */
router.get('/user/:id', user.get);


/**
 * 菜单部分
 */
router.get('/menu/type/:id', menu.oneType);
router.get('/menu/type', menu.type);


module.exports = router;
