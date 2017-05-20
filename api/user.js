const userModel = require('../proxy/user');
const orderModel = require('../proxy/order');

/**
 * 根据用户的id来获取用户的信息，除了密码
 */
exports.get = function* () {
  var id = this.params.id;
  var result = yield userModel.findByID(id);
  var error = false;
  if (error)
    return this.body = { success: false, data: result };
  this.body = { success: true, data: result[0] };
};

/**
 * 用户获取自己的基本信息，id由session获取
 */
exports.getOwnInfo = function* () {
  var id = this.session.user.ID;
  var result = yield userModel.findByID(id);
  if (result.length === 0) { return this.body = { success: false, data: result }; }
  this.body = { success: true, data: result[0] };
};

/**
 * 判断一个用户是否可以用餐
 */
exports.canOrder = function* () {
  var id = this.session.user.ID;
  var res = yield orderModel.findReserveByUseID(id);
  // 找到一个订单正在用餐，说明可以
  for (let i = 0; i < res.length; i++) {
    if (res[i].Status === 'PROGRESS') {
      return this.body = { success: true, data: res[i] };
    }
  }
  return this.body = { success: false };
};
