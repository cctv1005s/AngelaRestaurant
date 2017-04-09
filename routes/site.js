exports.index = function * (next){
    this.render('index',{title:"title"});
}


exports.signout = exports.signup = exports.signin = function *(next){
    this.render('index',{title:"你好呀"});
}
