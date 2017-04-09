exports.index = function * (next){
    this.render('index',{sitename:"登陆"});
}


exports.signout = exports.signup = exports.signin = function *(next){
    this.render('index',{title:"你好呀"});
}
