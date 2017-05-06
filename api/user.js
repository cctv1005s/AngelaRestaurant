const userModel = require('../proxy/user');
const uuidV1 = require('uuid/v1');
const md5 = require('md5');

// 登陆
exports.signin = function* () {
  const { Account, Password } = this.request.body;
  let user = yield userModel.findByAccount(Account);
  user = user[0];
  const userPassword = user.Password;
  if (md5(Password) === userPassword) {
    this.session.user = user;
    return this.body = { success: true };
  }

  this.body = { success: false };
};

//  登出
exports.signout = function () {
  this.session = null;
  this.body = { success: true };
};

//  注册
exports.signup = function* () {
  const { Account, Password, Phone, NickName } = this.request.body;
  const user = yield userModel.findByAccount(Account);

  if (user.length !== 0) { return this.body = { success: false }; }

  const info = yield userModel.add({
    ID: uuidV1(),
    Account,
    Password: md5(Password),
    Phone,
    NickName,
    AccessToken: uuidV1(),
  });
  this.body = { success: true, data: info };
};

/**
 * 根据用户的id来获取用户的信息，除了密码
 */
exports.get = function* () {
  const id = this.params.id;
  const result = yield userModel.findByID(id);
  const error = false;
  if (error) { return this.body = { success: false, data: result }; }
  this.body = { success: true, data: result };
};
