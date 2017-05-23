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

exports.gettoday=function(date){
    var today=new Date();
    //today.setTime(0,0,0,0);
    var yesterday=new Date();
    yesterday.setDate(today.getDate()-1);
    var befoyesterday=new Date();
    befoyesterday.setDate(yesterday.getDate()-1);
    var startday=new Date();
    startday.setDate(befoyesterday.getDate()-1);
  
    if (yesterday<date&&date<today) {
      return 2;
    }
    if(befoyesterday<date&&date<yesterday){
      return 1;
    }
    if (startday<date&&date<befoyesterday) {
      return 0;
    }
    
};