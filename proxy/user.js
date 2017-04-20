var mysql = require('../models/index');
/**
 * 添加用户
 * 
 * @param {objetc} user 新用户
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
