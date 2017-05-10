var mysql = require('../models/index')

/**
 * 获取菜单的type
 */
exports.type = function* () {
    var sql = `select * from DishClass`;
    return yield mysql.query(sql);
}
/**
 * 获取某一个菜的类别下的所有的菜
 * 
 * @param {string} id - 菜的类别的id
 */
exports.oneType = function* (id) {
    var sql = `
        select * from Dish where ClassID = '${id}'
    `;
    var dishs = yield mysql.query(sql);
    //读取每一道菜的图片
    for (var i = 0; i < dishs.length; i++) {
        var id = dishs[i].ID;
        var sql = `select * from  DishImg where DishID = '${id}'`;
        var imgs = yield mysql.query(sql);
        dishs[i].Imgs = imgs;
    }
    return dishs;
}
/**
 * 获取一道菜的具体信息
 * 
 * @param {string} id 菜ID
 */
exports.oneDish = function* (id) {
    var sql = `select * from DishClass where ID = '${id}'`;
    return yield mysql.query(sql);
}
/**
 * 给菜单添加一个新的类别
 * 
 * @param {object} newClass 新的类别
 */
exports.addType = function* (newClass) {
    var sql = `
    INSERT INTO \`DishClass\`(ID, ClassName, ClassDescription) 
    VALUES ('${newClass.ID}','${newClass.ClassName}','${newClass.classDescription}')
    `;
    return yield mysql.query(sql);
}
/**
 * 给菜单删除一个类别
 * 
 * @param {string} id 菜单ID
 */
exports.deleteType = function* (id) {
    var sql = `
    DELETE FROM \`DishClass\` 
    WHERE ID = '${id}'
    `;
    return yield mysql.query(sql);
}
/**
 * 修改菜单的一个类别
 * 
 * @param {object} classData 菜单
 */
exports.updateType = function* (classData) {
    var sql = `
    UPDATE \`DishClass\` SET ClassName ='${classData.ClassName}',ClassDescription='${classData.ClassDescription}' 
    WHERE ID = '${classData.ID}'
    `;
    return yield mysql.query(sql);
}
/**
 * 给菜单添加一道新的菜
 * 
 * @param {object} newDish 新的菜
 */
exports.addDish = function* (newDish) {
    var sql = `
    INSERT INTO \`Dish\`(ID, Description, ClassID, Price, Name, Status) 
    VALUES ('${newDish.ID}','${newDish.Description}','${newDish.ClassID}',
    '${newDish.Price}','${newDish.Name}','${newDish.Status}')
    `;
    return yield mysql.query(sql);
}
/**
 * 给菜单删除一道菜
 * 
 * @param {string} id 菜ID
 */
exports.deleteDish = function* (id) {
    var sql = `
    DELETE FROM \`Dish\` 
    WHERE ID = '${id}'
    `;
    return yield mysql.query(sql);
}
/**
 * 修改菜单的一个菜
 * 
 * @param {object} dishData 菜
 */
exports.updateDish = function* (dishData) {
    var sql = `
    UPDATE \`Dish\` SET Description ='${dishData.Description}',ClassID='${dishData.ClassID}',
    Price ='${dishData.Price}',Name = '${dishData.Name}',Status ='${dishData.Status}' 
    WHERE ID = '${dishData.ID}'
    `;
    return yield mysql.query(sql);
}
/**
 * 设置一道菜为不可制作
 * 
 * @param {string} ID 菜的ID
 */
exports.stopDish = function* (ID) {
    var sql = `
    update \`Dish\` set Status = 'Disavailable'
    where ID = '${ID}'
    `;
    return yield mysql.query(sql);
}