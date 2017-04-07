var user_model = require('../proxy/user');

exports.get = function*(next){
    this.session.num = this.session.num||0;
    this.session.num ++;
    this.body = this.session.num;
}