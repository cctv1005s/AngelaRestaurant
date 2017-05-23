const userModel = require('../proxy/user');
const authModel = require('../proxy/auth');
const employeeModel = require('../proxy/employee');
const md5 = require('md5');
const shortid = require('shortid');
const Validator = require('Validator');
const config = require('../config.json');

// 登录
exports.signin = function* () {
  const { Account, Password } = this.request.body;
  let user = yield userModel.findByAccount(Account);
  if (user.length === 0)
    return this.body = { success: false, data: '用户不存在' };
  user = user[0];
  const userPassword = user.Password;
  if (md5(Password) === userPassword) {
    this.session.user = user;
    this.session.role = 'customer';
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
  const { Account, Password, Phone, NickName, RePassword, Gender } = this.request.body;
  // 检查账号是否重复
  const user = yield userModel.findByAccount(Account);
  if (user.length !== 0) { return this.body = { success: false, data: '该账号已被注册' }; }
  // 检查两次输入的密码是否一致
  if (Password !== RePassword)
    return this.body = { success: false, data: '两次输入的密码不一致' };
  // 规则验证
  var rules = {
    ID: 'required',
    Account: 'required',
    Password: 'required',
    NickName: 'required|string',
    AccessToken: 'required',
    Gender: 'required',
  };
  var newUser = {
    ID: shortid.generate(),
    Account,
    Password: md5(Password),
    Phone,
    NickName,
    AccessToken: shortid.generate(),
    Gender,
  };
  var v = Validator.make(newUser, rules);
  if (v.fails()) {
    return this.body = { success: false, data: v.getErrors() };
  }
  //  执行数据库插入
  try {
    // 向用户表里面插入新的数据
    yield userModel.add(newUser);
    // 添加它的权限
    var auth = config.role.Customer;
    for (let i in auth) {
      yield authModel.addAuth(newUser.ID, auth[i]);
    }
  } catch (e) {
    return this.body = { success: false, data: e };
  }

  this.body = { success: true, data: newUser };
};


//  员工登陆
exports.employeeSignin = function* () {
  const { Account, Password } = this.request.body;
  var r = yield employeeModel.findByAccount(Account);
  if (r.length === 0)
    return this.body = { success: false, data: '账号不存在' };
  let password = r[0].Password;
  if (password === md5(Password)) {
    this.session.user = r[0];
    this.session.role = 'employee';
    return this.body = { success: true, data: r[0] };
  }
  return this.body = { success: false, data: '密码不正确' };
};


exports.passwordReset = function* () {
  var { ID } = this.session.user;
  var user = yield userModel.findByID(ID);
  var _Password = user[0].Password;
  var { Password, NewPassword, ReNewPassword } = this.request.body;
  try {
    if (_Password == md5(Password) && NewPassword == ReNewPassword) {
      yield userModel.setPassword(ID, md5(NewPassword));
      return this.body = { success: true, data: '重新设置密码成功' };
    }
      return this.body = { success: false, data: '输入密码不正确或两次密码不一致' };
    
  } catch(e) {
    return this.body = { success: false, data: e.message };
  }
};

