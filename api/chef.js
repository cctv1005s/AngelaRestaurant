var chef_model = require('../proxy/chef');

/** 
 * 确认开始做某一道菜
 **/
exports.Confirm = function*(next){
    var ChefID = this.params.ChefID;
    var DishID = this.params.DishID;

    var Result = yield chef_model.DishState(ChefID,DishID,1);
    if(Result.length == 0)
        return this.body = {success:false};
    else
        return  this.body = {success:true,data:{
            ChefID : ChefID,
            DishID : DishID
        }};
}

/** 
 * 确认某一道菜完成
 **/
exports.Finish = function*(next){
     var ChefID = this.params.ChefID;
    var DishID = this.params.DishID;

    var Result = yield chef_model.DishState(ChefID,DishID,2);
    if(Result.length == 0)
        return this.body = {success:false};
    else
        return  this.body = {success:true,data:{
            ChefID : ChefID,
            DishID : DishID
        }};
}

/** 
 * 取消某一道菜
 **/
exports.Cancle = function*(next){
       var ChefID = this.params.ChefID;
    var DishID = this.params.DishID;

    var Result = yield chef_model.DishState(ChefID,DishID,3);
    if(Result.length == 0)
        return this.body = {success:false};
    else
        return  this.body = {success:true,data:{
            ChefID : ChefID,
            DishID : DishID
        }};
}

/** 
 * 将自己标记为休息状态
 **/
exports.Rest = function*(next){
   var ChefID = this.params.ChefID;

   var Result = yield chef_model.ChefState(ChefID);
    if(Result.length == 0)
        return this.body = {success:false};
    else   
        return  this.body = {success:true,data:Result};
}

/** 
 * 查看分配给我的菜品
 **/
exports.GetOrder = function*(next){
    var ChefID = this.params.ChefID;
    var AllDish = yield chef_model.FindDish(ChefID);
    if(AllDish.length == 0)
        return this.body = {success:false};
    else
    {
        console.log(AllDish);
        return  this.body = {success:true,data:AllDish};
    }  
}
