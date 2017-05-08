var menu_model = require('../proxy/menu');
var table_model = require('../proxy/table');
var uuidV1 = require('uuid/v1');

/**
 * 用于获取菜单的类别，不添加权限，对所有类别开放
 */
exports.type = function* (next) {
    try {
        var type = yield menu_model.type();
        this.body = { success: true, data: type };
    } catch (e) {
        this.body = { success: false, data: e };
    }
}

/**
 * 获取某一类菜下面的所有的菜品
 */
exports.oneType = function* (next) {
    var id = this.params.id;
    try {
        var dishs = yield menu_model.oneType(id);
        this.body = { success: true, data: dishs };
    } catch (e) {
        this.body = { success: false, data: e };
    }
}
/**
 * 查看一道菜的具体信息
 */
exports.oneDish = function* (next) {
    var id = this.params.id;
    try {
        var dish = yield menu_model.oneDish(id);
        this.body = { success: true, data: dish };
    } catch (e) {
        this.body = { success: false, data: e };
    }
}
/**
 * 新增一种菜单类别
 */
exports.addType = function* (next) {
    var userID = '6';
    try {
        var { ClassName, ClassDescription } = this.request.body;
        var info = yield menu_model.addType({
            ID: uuidV1(),
            ClassName: ClassName,
            ClassDescription: ClassDescription
        });
        this.bofy = { success: true, data: info };
    }
    catch (e) {
        this.body = { success: false, data: e };
    }
}
/**
 * 删除一种菜单类别
 */
exports.deleteType = function* (next) {
    var userID = '6';
    try {
        var { ID } = this.request.body;
        var info = yield menu_model.deleteType(ID);
        this.bofy = { success: true, data: info };
    }
    catch (e) {
        this.body = { success: false, data: e };
    }
}
/**
 * 修改一种菜单类别
 */
exports.updateType = function* (next) {
    var userID = '6';
    try {
        var { ID, ClassName, ClassDescription } = this.request.body;
        var info = yield menu_model.updateType({
            ID: ID,
            ClassName: ClassName,
            ClassDescription: ClassDescription
        });
        this.bofy = { success: true, data: info };
    }
    catch (e) {
        this.body = { success: false, data: e };
    }
}
/**
 * 新增一道菜
 */
exports.addDish = function* (next) {
    var userID = '6';
    try {
        var { Description, ClassID, Price, Name } = this.request.body;
        var info = yield menu_model.addDish({
            ID: uuidV1(),
            Description: Description,
            ClassID: ClassID,
            Price: Price,
            Name: Name,
            Status: 'Available'
        });
        this.bofy = { success: true, data: info };
    }
    catch (e) {
        this.body = { success: false, data: e };
    }
}
/**
 * 删除一道菜
 */
exports.deleteDish = function* (next) {
    var userID = '6';
    try {
        var { ID } = this.request.body;
        var info = yield menu_model.deleteDish(ID);
        console.log(info);
        this.bofy = { success: true, data: info };
    }
    catch (e) {
        this.body = { success: false, data: e };
    }
}
/**
 * 修改一道菜
 */
exports.updateDish = function* (next) {
    var userID = '6';
    try {
        var { ID, Description, ClassID, Price, Name } = this.request.body;
        var info = yield menu_model.updateDish({
            ID: ID,
            Description: Description,
            ClassID: ClassID,
            Price: Price,
            Name: Name,
            Status: 'Available'
        });
        this.bofy = { success: true, data: info };
    }
    catch (e) {
        this.body = { success: false, data: e };
    }
}
/**
 * 暂停一道菜的制作
 */
exports.stopDish = function* (next) {
    var userID = '6';
    try {
        var { ID } = this.request.body;
        var info = yield menu_model.stopDish(ID);
        this.body = { success: true, data: info };
    }
    catch (e) {
        this.body = { success: false, data: e };
    }
} 