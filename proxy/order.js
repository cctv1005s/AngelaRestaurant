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

exports.findWaiterByID = function*(waiterID){
    var query = `
    SELECT Auth FRom Employee
    WHERE ID = '${waiterID}'
    `;

    return yield mysql.query(query);

}

exports.findChefIDByCookingID = function*(CookingID){
    var query = `
    SELECT ChefID FRom Employee
    WHERE DishID = '${CookingID}'
    `;

    return yield mysql.query(query);

}
