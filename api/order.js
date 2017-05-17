var order_model = require('../proxy/order');
var uuidV1 = require('uuid/v1');
var shortid = require('shortid');
var user_model = require('../proxy/user');
var timeFormat = require('../tools/time.js');

/**
 * 用户填写订单信息，提交预订单
 */
exports.reserve = function* (next) {
  var { PeopleNum, Phone, OrderTime } = this.request.body;
  var UserId = this.session.user.ID;

  if (PeopleNum < 1 || PeopleNum > 20) { return this.body = { success: false, data: '预订人数范围为1-20人' }; }

  if (Phone.length != 11) { return this.body = { success: false, data: '电话号码错误' }; }

  var OrderDate = new Date(OrderTime);
  var NowDate = new Date();
  var days = Math.floor(((OrderDate.getTime() - NowDate.getTime()) / (24 * 3600 * 1000)));
  if (days < 1 || days > 7) { return this.body = { success: false, data: '请预订七天以内的时间' }; }
  var userInfo = yield user_model.findByID(UserId);

  if (userInfo.length == 0) { return this.body = { success: false, data: '没有该用户' }; }


  var userOrder = yield order_model.findReserveByUseID(UserId);

  if (userOrder.length != 0) { return this.body = { success: false, data: '该用户已有订单了' }; }

  var reserveOrder = yield order_model.setReserve({
    OrderID: shortid.generate(),
    UserId,
    OrderTime: timeFormat.format(new Date(OrderTime)),
    Phone,
    Type: 1,
    Status: 'RESERVE',
    PeopleNum,
  });

  this.body = { success: true, data: reserveOrder };
};


/**
 * 用户点菜，服务员确认订单，菜品就传入等待制作序列
 */
exports.addDish = function* (next) {
  var orderID = this.params.id;
  var { DishIDList } = this.request.body;
  var chefIDlist = new Array();
  // 厨师id
  var ChefID = 1;
  // 将菜分发到具体的厨师
  for (var i = 0; i < DishIDList.length; i++) {
    for (var j = 0; j < DishIDList[i].Count; j++) {
      var CookingList = yield order_model.insertCookingList({
          CookingID: uuidV1(),
          OrderID: orderID,
          ChefID: 1,
          DishID: DishIDList[i].DishID,
          Status: 'WAIT',
        });
    }
  }
  this.body = { success: true, data: '插入成功' };
};

/**
 * 根据CookingID删除某道菜
 */
exports.subDish = function* (next) {
  var { CookingID } = this.request.body;
  var orderID = this.params.id;

  var cookingInfo = yield order_model.getCookingInfo(orderID, CookingID);

  var waiterID = 1;
  var auth = yield order_model.getAuthByID(waiterID);
  if (cookingInfo.length == 0) { return this.body = { success: false, data: '订单没有这道菜' }; }

  if (cookingInfo[0].Status != 'WAIT'.toUpperCase()) { return this.body = { success: false, data: '这道菜处于不能被取消状态' }; }
  var result = yield order_model.deleteOneDishByCookingID(CookingID);
  this.body = { success: true, data: '删除成功' };
};


/**
 * 取消某个还未点菜的订单
 */

exports.cancelOrder = function* (next) {
  if (auth[0].Auth != 1) { return this.body = { success: false, data: '权限不足' }; }

  var orderID = this.params.id;

  var dishIDList = yield order_model.getDishIDByOrderID(orderID);

  if (dishIDList.length != 0) { return this.body = { success: false, data: '无法取消已点菜订单' }; }

  var result = yield order_model.cancelOrder(orderID);

  this.body = { success: true, data: '取消订单成功' };
};

/**
 * 支付订单
 */
exports.payforOrder = function* (next) {
  var dishIDList = yield order_model.getDishIDByOrderID(orderID);
  if (dishIDList.length == 0) { return this.body = { success: false, data: '此订单还未点餐' }; }
  var amount = 0.0;
  for (var i = 0; i < dishIDList.length; i++) {
    if (dishIDList[i].Status == 'Cancel') {
      continue;
    }
    var dishID = dishIDList[i].DishID;
    var dishInfo = yield order_model.getInfoByDishID(dishID);
    amount += dishInfo[0].Price;
  }

  var data_ = `请支付：${amount }元`;
  this.body = { success: true, data: data_ };
};

/**
 * 查看某个订单的已经点的菜品
 */
exports.dish = function* () {
  var id = this.params.id;//  餐桌id
  try {
    let r = yield order_model.orderDish(id);
    return this.body = { success: true, data: r };
  } catch(e) {
    return this.body = { success: false, data: e };
  }
};
