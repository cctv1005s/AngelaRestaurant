const mysql = require('../models/index');

/**
 * 根据用户的AccessToken查找员工
 *
 * @param {string} token -员工的token
 * @return {array} -员工的信息
 */
exports.findByToken = function* (token) {
  var q = `
    SELECT * FROM View_Employee WHERE AccessToken = '${token}'
  `;
  return yield mysql.query(q);
};


/**
 * 根据Account查找用户
 *
 * @param {string} account -传入的账号
 */
exports.findByAccount = function* (account) {
  var q = `
    SELECT * FROM View_Employee WHERE Account = '${account}'
  `;
  return yield mysql.query(q);
};

