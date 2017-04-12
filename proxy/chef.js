var mysql = require('../models/index');

/**
 * 返回每一个厨师会做的菜品 
 * @param ChefID 厨师ID
 */
exports.FindCanDish = function*(ChefID){
    var query = `
    select * from Dish where ID in 
    (
        select DishID from ChefCanDish where ChefID = ${ChefID}
    )
    `;
    return yield mysql.query(query);
}

/**
 * 返回每一个厨师被分配到做的菜品 
 * @param ChefID 厨师ID
 */
exports.FindDish = function*(ChefID){
    var query = `
      select A.OrderID,A.DishID,A.Status,A.StartTime,A.EndTime,
             B.Description,B.Price 
      from CookingList as A,Dish as B 
      where A.DishID=B.ID and A.ChefID = ${ChefID}
    `;
    return yield mysql.query(query);
}

/**
 * 确认某位厨师的某位菜品开始，完成，取消 
 * @param ChefID 厨师ID
 * @param DishID 菜品ID
 * @param Choise 选择的操作：1代表开始，2代表完成，3代表取消
 */
exports.DishState = function*(ChefID,DishID,Choise){
    var Dish = 'Wait';
    var query = ``;
    if(Choise == 1) Dish = 'Begin';
    else if(Choise == 2) Dish = 'Down';
    else if(Choise == 3) Dish = 'Cancle';

    var Time =  new Date().toLocaleString();
    if(Choise == 1) 
    query = `
      UPDATE CookingList SET Status='${Dish}',StartTime='${Time}' WHERE ChefID = '${ChefID}' and DishID = '${DishID}'
    `;
    else if(Choise == 2 || Choise == 3)
    query = `
      UPDATE CookingList SET Status='${Dish}',EndTime='${Time}' WHERE ChefID = '${ChefID}' and DishID = '${DishID}'
    `;

    return yield mysql.query(query);
}


/**
 * 厨师标记自己为休息状态
 * @param ChefID 厨师ID
 */
exports.ChefState = function*(ChefID){
    var query = `
    UPDATE Employee SET Status='Rest' WHERE ID = '${ChefID}'
    `;
    return yield mysql.query(query);
}
