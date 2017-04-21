var mysql = require('../models/index')

/**
 * 获取菜单的type
 */
exports.type = function*(){
    var sql = `select * from DishClass`;
    return yield mysql.query(sql);
}


/**
 * 获取某一个菜的类别下的所有的菜
 * 
 * @param {string} id - 菜的类别的id
 */
exports.oneType = function*(id){
    var sql = `
        select * from Dish where ClassID = '${id}'
    `;
    var dishs = yield mysql.query(sql);
    //读取每一道菜的图片
    for(var i =0;i < dishs.length;i++){
        var id  = dishs[i].ID;
        var sql = `select * from  DishImg where DishID = '${id}'`;
        var imgs = yield mysql.query(sql);
        dishs[i].Imgs = imgs;
    }
    return dishs;
}

/**
 * 给菜单添加一个新的类别
 */
exports.addType = function*(){

}