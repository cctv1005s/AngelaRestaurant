const mysql = require('../models/index');
var timeFormat = require('../tools/time.js');

/**
 * 添加用户
 *
 * @param {objetc} user 新用户
 */
exports.add = function* (user) {
  var query = `
    INSERT INTO Customer(ID,Account,Password, AccessToken,RegisterTime,Phone,NickName,Gender)
    VALUES 
    ('${user.ID}','${user.Account}','${user.Password}','${user.AccessToken}','${timeFormat.format(new Date())}','${user.Phone}','${user.NickName}','${user.Gender}')
    `;
  return yield mysql.query(query);
};


exports.findByAccount = function* (Account) {
  var query = `
    SELECT * FROM Customer
    WHERE Account = '${Account}'
    `;
  return yield mysql.query(query);
};

/**
 * 根据用户的ID查找用户
 *
 * @param {string} id -用户的id
 * @return {array} -用户的信息
 */
exports.findByID = function* (id) {
  var query = `
        SELECT * FROM Customer WHERE 
        ID = '${id}'
    `;
  return yield mysql.query(query);
};


/**
 * 根据用户的AccessToken查找用户
 *
 * @param {string} token -用户的token
 * @return {array} -用户的信息
 */
exports.findByToken = function* (token) {
  var query = `
  SELECT * FROM Customer WHERE AccessToken = '${token}'
  `;
  return yield mysql.query(query);
};
