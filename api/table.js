
var table_model = require('../proxy/table');
var uuidV1 = require('uuid/v1');
var shortid = require('shortid');
/**
 * 餐桌绑定
 */
exports.bind = function* (next) {
    var tableID = this.params.id;
    var { AccessToken, PeopleNum } = this.request.body;
    var PeopleNum = parseInt(PeopleNum);
    try {
        var customer = yield table_model.getID(AccessToken);
        var customerID = customer[0].ID;
        var phone = customer[0].Phone;
        var ordertime = new Date();
        var ordertime = ordertime.getTime();
        var temp = yield table_model.oneTable(tableID);
        if (temp[0].Status != 'GREEN') {
            return this.body = { success: false, data: '餐桌已绑定' };
        }
        var order = yield table_model.isOrder(customerID);
        order = order[0];
        if (order == null || order.Status == 'FINISH') {
            var info = yield table_model.newOrder({
                ID: shortid.generate(),
                TableID: tableID,
                UserID: customerID,
                OrderTime: ordertime,
                Phone: phone,
                Type: 1,
                Status: 'PROGRESS',
                WaiterID: waiterID,
                PeopleNum: PeopleNum
            });
            var data = yield table_model.bind(tableID);
            this.body = { success: true, data: info };
        }
        else if (order.Status == 'RESERVE') {
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
            var data = yield table_model.bind(tableID);
            this.body = { success: true, data: info };
        }
        else if (order.TableID != null) {
            return this.body = { success: false, data: '用户已绑定' };
        }
    }
    catch (e) {
        return this.body = { success: false, data: e };
    }
}
/*
 * 查看桌子的状态
 */
exports.table = function* (next) {
    var userID = '5';
    try {
        var status = yield table_model.table();
        this.body = { success: true, data: status };
    }
    catch (e) {
        return this.body = { success: false, data: e };
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
            this.body = { success: true, data: info }
        }
        else {
            this.body = { success: true, data: info };
        }
    }
    catch (e) {
        return this.body = { success: false, data: e }
    }
};
/**
 * 将某一张桌的状态标记为清理完毕
 */
exports.cleanup = function* (next) {
    var userID = '4';
    try {
        var { TableID } = this.request.body;
        var info = yield table_model.cleanup(TableID);
        var info = yield table_model.cleanup_(TableID);
        this.body = { success: true, data: '清理完毕' };
    }
    catch (e) {
        return this.body = { success: false, data: e };
    }
}