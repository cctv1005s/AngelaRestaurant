exports.index = function * (next){
    this.render('index',{title:"你好呀"});
}


exports.signout = exports.signup = exports.signin = function *(next){
    this.body = "asdasd";
}
