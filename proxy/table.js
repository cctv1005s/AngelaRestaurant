var mysql = require('../models/index')
/**
 * 获取顾客的ID
 * 
 * @param {string} accessToken 令牌
 */
exports.getID = function*(accessToken){
    var query = `
    SELECT * FROM \`Customer\` WHERE AccessToken = '${accessToken}'
    `;
    return yield mysql.query(query);
}
/**
 * 获取ID对应的职位
 * 
 * @param {string} id 职工ID
 */
exports.getAuth = function*(id){
    var query = `
    SELECT Auth FROM Auth WHERE UserID = '${id}'
    `;
    return yield mysql.query(query);
}
/**
 * 查询当前用户是否有预定订单
 * 
 * @param {string} userID 顾客ID
 */
exports.isOrder = function*(userID){
    var query = `
    SELECT * FROM \`CustomerOrder\` WHERE UserID = '${userID}'
    `;
    return yield mysql.query(query);
}
/**
 * 创建一个新订单，绑定table和customer
 * 
 * @param {object} order 订单信息
 */
exports.newOrder = function*(order){
    var query = `
    INSERT INTO \`CustomerOrder\`( ID , TableID, UserID, OrderTime, Phone, Type, Status, WaiterID, PeopleNum) 
    VALUES ('${order.ID}','${order.TableID}','${order.UserID}','${order.OrderTime}','${order.Phone}',
    '${order.Type}','${order.Status}','${order.WaiterID}','${order.PeopleNum}')
    `;
    return yield mysql.query(query);
}
/**
 * 修改订单信息
 * 
 * @param {object} order 订单信息
 */
exports.updateOrder = function*(order){
    var query = `
    UPDATE \`CustomerOrder\` SET TableID ='${order.TableID}', OrderTime ='${order.OrderTime}', Phone ='${order.Phone}',
    Type ='${order.Type}', Status ='${order.Status}', WaiterID ='${order.WaiterID}', PeopleNum ='${order.PeopleNum}' 
    WHERE ID = '${order.ID}'
    `;
    return yield mysql.query(query);
}
/**
 * 查看桌子的状态
 * 
 */
exports.table = function*(){
    var sql = `select * from \`Table\``;
    return yield mysql.query(sql);
}
/**
 * 查看一个桌子的具体状态
 * 
 * @param {string} id 桌子ID
 */
exports.oneTable = function*(id){
    var sql = `
    select * from \`Table\`
    where ID = '${id}'
    `;
    return yield mysql.query(sql);
}
/**
 * 查看清理餐桌的杂工ID
 * 
 * @param {string} tableID 桌子ID
 */
exports.busBoy = function*(tableID){
    var sql = `
    select * from \`EmployeeInTable\`
    where TableID = '${tableID}'
    `;
    return yield mysql.query(sql);
}
/**
 * 更新餐桌状态 脏变为干净
 * 
 * @param {string} tableID 桌子ID
 */
exports.cleanup = function*(tableID){
    var sql = `
    UPDATE \`Table\` SET Status= 'Green' 
    WHERE ID= '${tableID}'
    `;
    return yield mysql.query(sql);
}
/**
 * 删除杂工和桌子的关联
 * 
 * @param {string} tableID 桌子ID
 */
exports.cleanup2 = function*(tableID){
    var sql = `
    DELETE FROM \`EmployeeInTable\` 
    WHERE TableID = '${tableID}'
    `;
    return yield mysql.query(sql)
}