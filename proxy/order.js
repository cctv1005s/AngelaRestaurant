var mysql = require('../models/index');

/**
 * 把用户提交的预定信息填入数据库
 * 
 * @param {Object} preOrder -预订单信息
 */
exports.setReserve = function*(preOrder){
    var query = `
    INSERT INTO \`Order\`(\`ID\`, \`UserID\`, \`OrderTime\`, \`Phone\`, \`Type\`, \`Status\`,  \`PeopleNum\`)
     VALUES  ('${preOrder.OrderID}', '${preOrder.UserId}', '${preOrder.OrderTime}', 
     '${preOrder.Phone}',  ${preOrder.Type}, '${preOrder.Status}', '${preOrder.PeopleNum}')
    `;
    console.log(query);
    return yield mysql.query(query);
}



/**
 * 通过用户id获取预订单信息
 * 
 * @param {String} userID -用户id
 * @return {return} -用户id对应的预订单信息
 */
exports.findReserveByUseID = function*(userID){
     var query = `
    SELECT * FRom \`Order\`
    WHERE UserID = '${userID}'
    `;

    return yield mysql.query(query);
}




/**
 * 通过员工ID查找员工权限
 * @param {String} waiterID -员工的id
 * @return {array} -员工对应的权限
 */
exports.getAuthByID = function*(waiterID){
    var query = `
    SELECT Auth FRom Auth
    WHERE EmployeeID = '${waiterID}'
    `;

    return yield mysql.query(query);
}




/**
 * 根据dishID获取可以做这道菜的厨师的id
 * 
 * @param {String} DishID -菜品id
 * @return {String} -厨师id
 */
exports.findChefIDByDishID = function*(DishID){
    var query = `
    SELECT ChefID FRom ChefCanDish
    WHERE DishID = '${DishID}'
    `;

    return yield mysql.query(query);
}




/**
 * 根据员工id获取员工信息
 * 
 * @param {String} EmployeeID -员工id
 * @return {array} -员工信息
 */
exports.getInfoByEmployeeID = function*(EmployeeID){
    var query = `
    SELECT * FRom Employee
    WHERE ID = '${EmployeeID}'
    `;

    return yield mysql.query(query);
}





/**
 * 根据菜品id获取菜品信息
 * 
 * @param {String} DishID -菜品id
 * @return {array} -菜品信息
 */
exports.getInfoByDishID = function*(DishID){
    var query = `
    SELECT * FRom Dish
    WHERE ID = '${DishID}'
    `;

    return yield mysql.query(query);
}




/**
 * 把需要点好的的菜加入烹饪等待列表
 * 
 * @param {Object} CookingListInfo -CookingList信息
 * @return {Object} -完成插入菜品成功的信息
 */
exports.insertCookingList = function*(CookingListInfo){
    var query = `
    INSERT INTO \`CookingList\`(\`ID\`, \`OrderID\`, \`ChefID\`, \`DishID\`, \`Status\`)
     VALUES  ('${CookingListInfo.CookingID}', '${CookingListInfo.OrderID}', 
    '${CookingListInfo.ChefID}', '${CookingListInfo.DishID}', '${CookingListInfo.Status}')
    `;

    return yield mysql.query(query);
}




/**
 * 根据订单id和CookingID得到一条Cooking的信息
 * 
 * @param {String} -订单id和CookingID
 * @return {Object} -订单信息
 */
exports.getCookingInfo = function*(OrderID,CookingID){
    var query = `
    SELECT * FRom CookingList
    WHERE OrderID = '${OrderID}' and ID = '${CookingID}'
    `;

    return yield mysql.query(query);
}




/**
 * 删除一条Cooking记录
 * @param {String} -CookingID
 */
exports.deleteOneDishByCookingID = function*(CookingID){
    var query = `
    DELETE FROM CookingList WHERE ID = '${CookingID}'
    `;

    return yield mysql.query(query);
}



/**
 * 通过订单id获取菜品id
 * @param {String} -订单id
 * @return {array} -订单对应的菜品列表
 */
exports.getDishIDByOrderID = function*(orderID){
    var query = `
    SELECT * FRom CookingList
    WHERE OrderID = '${orderID}' 
    `;

    return yield mysql.query(query);
}


/**
 * 取消某个还未点菜的订单
 * @param {String} -订单id
 */
exports.cancelOrder = function*(orderID){
    var query = `
    DELETE FROM \`Order\` WHERE ID = '${orderID}'
    `;

    return yield mysql.query(query);
}

