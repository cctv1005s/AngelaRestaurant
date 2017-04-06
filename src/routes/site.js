exports.index = function * (next){
    yield this.render('index',{title:'hello'});
}
