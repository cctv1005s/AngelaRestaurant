exports.index = function * (next){
    yield this.render('index',{title:'hello'});
}


exports.signout = exports.signup = exports.signin = function *(next){
    yield this.render('index',{title:'hello'});
}
