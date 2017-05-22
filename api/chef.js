var chef_model = require('../proxy/chef');

/**
 * 确认开始做某一道菜
 **/
exports.Confirm = function* () {
  var ChefID = this.session.user.ID;
  var DishID = this.params.DishID;
  // 首先查看厨师是否存在
  var CheckChef = yield chef_model.CheckChef(ChefID);
  if (CheckChef.length === 0)
    return this.body = { success: false, data: '没有这位厨师' };

  var Result = yield chef_model.DishState(ChefID, DishID, 1);
  if (Result.affectedRows === 0)
    return this.body = { success: false, data: '没有这道菜品' };
  return this.body = { success: true, data: { ChefID, DishID } };
};

/**
 * 确认完成某一道菜
 **/

exports.Finish = function* () {
  var ChefID = this.session.user.ID;
  var DishID = this.params.DishID;
  // 首先查看厨师是否存在
  var CheckChef = yield chef_model.CheckChef(ChefID);
  if (CheckChef.length === 0)
    return this.body = { success: false, data: '没有这位厨师' };

  var Result = yield chef_model.DishState(ChefID, DishID, 2);
  if (Result.affectedRows === 0)
    return this.body = { success: false, data: '没有这道菜品' };
  return this.body = { success: true, data: { ChefID, DishID } };
};

/**
 * 取消某一道菜
 **/
exports.Cancle = function* () {
  var ChefID = this.session.user.ID;
  var DishID = this.params.DishID;
   // 首先查看厨师是否存在
  var CheckChef = yield chef_model.CheckChef(ChefID);
  if (CheckChef.length === 0)
    return this.body = { success: false, data: '没有这位厨师' };

  var Result = yield chef_model.DishState(ChefID, DishID, 3);
  if (Result.affectedRows == 0)
    return this.body = { success: false, data: '没有这道菜品' };
  return this.body = { success: true,
    data: { ChefID, DishID  } };
};

/**
 * 将自己标记为休息状态
 **/
exports.Rest = function* (next) {
  var ChefID = this.session.user.ID;
  var Result = yield chef_model.ChefState(ChefID);
  if (Result.affectedRows == 0)
    return this.body = { success: false, data: '没有这位厨师' };
  else if (Result.changedRows == 0)
    return this.body = { success: false, data: '该厨师已经在休息' };
  return this.body = { success: true,
    data: {
      ChefID,
    } };
};

/**
 * 查看分配给我的菜品
 **/
exports.GetOrder = function* (next) {
  var ChefID = this.session.user.ID;
   // 首先查看厨师是否存在
  var CheckChef = yield chef_model.CheckChef(ChefID);
  if (CheckChef.length == 0)
    return this.body = { success: false, data: '没有这位厨师' };
  var AllDish = yield chef_model.FindDish(ChefID);
  if (AllDish.length == 0)
    return this.body = { success: false, data: '该厨师没有分配到任何菜品' };

  for (var i = 0; i < AllDish.length; i++) {
    var DishImg = yield chef_model.FindDishImg(AllDish[i].DishID);
    AllDish[i].Img = DishImg;
  }
  return this.body = { success: true, data: AllDish };
};
