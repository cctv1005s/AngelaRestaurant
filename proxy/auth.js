var mysql = require('../models');

/**
 * 根据ID获取用户的权限列表
 *
 * @param {string} id -用户的id
 */
exports.getAuth = function* (id) {
  return yield mysql.query(`SELECT Auth FROM Auth where UserID = '${id}'`);
};
/**
 * 为某一个用户添加一个新的权限
 *
 * @param {string} UserID -用户的id
 * @param {int} Auth -用户的新权限
 */
exports.addAuth = function* (UserID, Auth) {
  return yield mysql.query(`INSERT INTO Auth (UserID, Auth) VALUES ('${UserID}', '${Auth}')`);
};

/**
 * 为某一个用户删减一个新的权限
 *
 * @param {string} UserID -用户的id
 * @param {int} Auth -用户的新权限
 */
exports.subAuth = function* (UserID, Auth) {
  return yield mysql.query(`DELETE FROM Auth WHERE (UserID='${UserID}') AND (Auth='${Auth}')`);
};

