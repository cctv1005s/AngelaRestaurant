var mysql = require('../models');

/**
 * 根据ID获取用户的权限列表
 *
 * @param {string} id -用户的id
 */
exports.getAuth = function* (id) {
  return yield mysql.query(`SELECT Auth FROM Auth where UserID = ${id}`);
};