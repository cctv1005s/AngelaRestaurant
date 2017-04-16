var menu_model = require('../proxy/menu');

/**
 * 用于获取菜单的类别，不添加权限，对所有类别开放
 */
exports.type = function*(next){
    try{
        var type = yield menu_model.type();
        this.body = {success:true,data:type};
    }catch(e){
        this.body = {success:false,data:e};
    }
}

/**
 * 获取某一类菜下面的所有的菜品
 */
exports.oneType = function*(next){
    var id = this.params.id;
    try{
        var dishs = yield menu_model.oneType(id);
        this.body = {success:true,data:dishs};
    }catch(e){
        this.body = {success:false,data:e};
    }
}
