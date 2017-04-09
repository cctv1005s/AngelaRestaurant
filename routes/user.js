exports.index = function*(){
    this.render('user/index',{sitename:"用户首页"});
}

exports.reserve = function*(){
    this.render('user/reserve',{sitename:"预定"});
}