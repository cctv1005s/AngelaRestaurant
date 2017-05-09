const userModel = require('../proxy/user');
const employeeModel = require('../proxy/employee');
const uuidV1 = require('uuid/v1');
const md5 = require('md5');
const shortid = require('shortid');

// 登陆
exports.signin = function* () {
  const { Account, Password } = this.request.body;
  let user = yield userModel.findByAccount(Account);
  user = user[0];
  const userPassword = user.Password;
  if (md5(Password) === userPassword) {
    this.session.user = user;
    return this.body = { success: true, data: user };
  }
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
    AccessToken: shortid.generate(),
  });
  this.body = { success: true, data: info };
};

//  员工登陆
exports.employeeSignin = function* () {
  const { Account, Password } = this.request.body;
  var r = yield employeeModel.findByAccount(Account);
  if (r.length === 0)
    return this.body = { success: false, data: '账号不存在' };
  let password = r[0].Password;
  if (password === md5(Password)){
    this.session.user = r[0];
    return this.body = { success: true };
  }
  return this.body = { success: false, data: '密码不正确' };
};
