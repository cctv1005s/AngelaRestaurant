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
      select B.Description,B.ClassID,B.Price,B.Name,
      A.OrderID,A.ChefID,A.DishID,A.Status,A.StartTime,A.EndTime,A.ID
      from CookingList as A,Dish as B 
      where A.DishID=B.ID and A.ChefID = ${ChefID}
    `;
    return yield mysql.query(query);
}

/**
 * 返回每一个菜品的所有图片 
 * @param ChefID 厨师ID
 */
exports.FindDishImg = function*(DishID){
    var query = `
      select * from DishImg where DishID =  ${DishID} 
        `;
    return yield mysql.query(query);
}


/**
 * 查看厨师是否存在 
 * @param ChefID 厨师ID
 */
exports.CheckChef = function*(ChefID){
    var query = `
       select * from Employee where ID = ${ChefID}
    `;
    return yield mysql.query(query);
}

/**
 * 确认某位厨师的某位菜品开始，完成，取消 
 * @param ChefID 厨师ID
 * @param CookingListID 单个菜品ID
 * @param Choise 选择的操作：1代表开始，2代表完成，3代表取消
 */
exports.DishState = function*(ChefID,CookingListID,Choise){
    var Dish = 'WAIT';
    var query = ``;
    if(Choise == 1) Dish = 'COOKING';
    else if(Choise == 2) Dish = 'FINISH';
    else if(Choise == 3) Dish = 'CANCEL';

    var Time =  new Date().toLocaleString();
    if(Choise == 1) 
    query = `
      UPDATE CookingList SET Status='${Dish}',StartTime='${Time}' WHERE ID = '${CookingListID}'
    `;
    else if(Choise == 2 || Choise == 3)
    query = `
      UPDATE CookingList SET Status='${Dish}',EndTime='${Time}' WHERE ID = '${CookingListID}'
    `;

    return yield mysql.query(query);
}


/**
 * 厨师标记自己为休息状态
 * @param ChefID 厨师ID
 */
exports.ChefState = function*(ChefID){
    var query = `
    UPDATE Employee SET Status='REST' WHERE ID = '${ChefID}'
    `;
    return yield mysql.query(query);
}
