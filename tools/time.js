/**
 * 用于处理时间相关的各种个函数
 */

/**
 * 用于将一个Date对象格式化为time字符串，符合数据库要求的，例如2014-5-8 18:09:23
 *
 * @date {Date} 是一个Date对象
 * @return {string} 返回一个符合格式的字符串
 */
exports.format = function (date) {
  return `${date.getFullYear()}-${parseInt(date.getMonth(), 10) + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

exports.unformat = function (time) {

};
