var user_model = require('../proxy/user');
var uuidV1 = require('uuid/v1');

//登陆
exports.signin = function*(next){
    var {Account,Password} = this.request.body;
    var user = yield user_model.findByAccount(Account);
    var user = user[0];
    var _Password = user.Password;
    if(Password === _Password)
      return  this.body = {success:true};
    
    this.body = {success:false};
}

exports.signout = function*(next){
    this.session = null;
    this.body = {success:true};
}

exports.signup = function*(next){
    var {Account,Password} = this.request.body;
    var user = yield user_model.findByAccount(Account);
    
    if(user.length != 0)
        return this.body = {success:false};

    var info = yield user_model.add({
        ID:uuidV1(),
        Account:Account,
        Password:Password,
        AccessToken:uuidV1()
    });
    this.body = {success:true,data:info};
}

exports.getUserInfo = function*(next){
    var userID = this.request.body;
    var userInfo = yield user_model.getInfoByUserID(userID);

    if(userInfo.length == 0)
        return this.body = {success:false};
    
    this.body = {success:true,data:userInfo};


}