var mysql = require('../models/index');
/**
 * 添加用户
 * 
 * @param {object} user 新用户
 */
exports.add = function*(user){
    var query = `
    INSERT INTO user( ID , Account, Password, AccessToeken) 
    VALUES ('${user.ID}','${user.Account}','${user.Password}','${user.AccessToken}')
    `;
    return yield mysql.query(query);
}



exports.findByAccount = function*(Account){
    var query = `
    SELECT * FRom user
    WHERE Account = '${Account}'
    `;
    return yield mysql.query(query);
}


exports.getInfoByUserID = function*(userID){
    var query = `
    SELECT * FRom user
    WHERE Account = '${userID}'
    `;
    return yield mysql.query(query);
}

/**
 * 根据用户的ID查找用户
 * 
 * @param {string} id -用户的id
 * @return {array} -用户的信息
 */
exports.findByID = function*(id){
    var query =`
        SELECT * FROM Customer WHERE 
        ID = '${id}'
    `;
    return yield mysql.query(query);
}

