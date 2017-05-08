var table_model = require('../proxy/table');
var uuidV1 = require('uuid/v1');
/**
 * 餐桌绑定
 */
exports.bind = function* (next) {
    var tableID = this.params.id;
    var { AccessToken, PeopleNum } = this.request.body;
    var PeopleNum = parseInt(PeopleNum);
    var customer = yield table_model.getID(AccessToken);
    var customerID = customer[0].ID;
    var phone = customer[0].phone;
    var ordertime = new Date();
    var ordertime = ordertime.getTime();
    var waiterID = '3';
    var order = yield table_model.isOrder(customerID);
    order = order[0];
    if (order == null) {
        var info = yield table_model.newOrder({
            ID: uuidV1(),
            TableID: tableID,
            UserID: customerID,
            OrderTime: ordertime,
            Phone: phone,
            Type: 1,
            Status: 'PROGRESS',
            WaiterID: waiterID,
            PeopleNum: PeopleNum
        });
        this.body = { success: true, data: info };
    }
    else {
        order = order.ID;
        var info = yield table_model.updateOrder({
            ID: order,
            TableID: tableID,
            OrderTime: ordertime,
            Phone: phone,
            Type: 1,
            Status: 'PROGRESS',
            WaiterID: waiterID,
            PeopleNum: PeopleNum
        });
        this.body = { success: true, data: info };
    }
    this.body = { success: false };
}
/**
 * 查看桌子的状态
 */
exports.table = function* (next) {
    var userID = '5';
    try {
        var status = yield table_model.table();
        this.body = { success: true, data: status };
    } catch (e) {
        this.body = { success: false, data: e };
    }
}
/**
 * 查看一个桌子的具体状态
 */
exports.oneTable = function* (next) {
    var userID = '5';
    try {
        var id = this.params.id;
        var info = yield table_model.oneTable(id);
        var status = info[0].Status;
        if (status == 'Red') {
            var info = yield table_model.busBoy(id);
            this.body = { success: true, data: info };
        }
        else {
            this.body = { success: true, data: info };
        }
    } catch (e) {
        this.body = { success: false, data: e };
    }
}
/**
 * 将某一张桌的状态标记为清理完毕
 */
exports.cleanup = function* (next) {
    var userID = '4';
    try {
        var { TableID } = this.request.body;
        var info = yield table_model.cleanup(TableID);
        var info = yield table_model.cleanup2(TableID);
        this.body = { success: true };
    }
    catch (e) {
        this.body = { success: false, data: e };
    }
}