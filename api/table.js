
var table_model = require('../proxy/table');
var uuidV1 = require('uuid/v1');
var shortid = require('shortid');
var formatTime = require('../tools/time.js').format;
/**
 * 餐桌绑定
 */
exports.bind = function* (next) {
    var tableID = this.params.id;
    var { AccessToken, PeopleNum } = this.request.body;
    var PeopleNum = parseInt(PeopleNum);
    var waiterID = this.session.user.ID;
    try {
        var customer = yield table_model.getID(AccessToken);
        if (customer[0] == null) {
            return this.body = { success: false, data: '用户不存在' };
        }
        var customerID = customer[0].ID;
        var phone = customer[0].Phone;
        var ordertime = formatTime(new Date());
        var temp = yield table_model.oneTable(tableID);
        if (temp[0].Volume < PeopleNum) {
            return this.body = { success: false, data: '人数过多' };
        }
        if (temp[0].Status != 'GREEN') {
            return this.body = { success: false, data: '餐桌已绑定' };
        }
        var order = yield table_model.isOrder(customerID);
        if (order[0] == null) {
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
            return this.body = { success: true, data: info };
        }
        for (var i = 0; i < order.length; i++) {
            if (order[i].Status == 'RESERVE') {
                order = order[i].ID;
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
                return this.body = { success: true, data: info };
            }
            else if (order[i].Status == 'PROGRESS') {
                return this.body = { success: false, data: '用户已绑定' };
            }
        }
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
        return this.body = { success: true, data: info };
    }
    catch (e) {
        return this.body = { success: false, data: e };
    }
}
/*
 * 查看桌子的状态
 */
exports.table = function* (next) {
    try {
        var status = yield table_model.table();
        for (var i = 0; i < status.length; i++) {
            if (status[i].Status == 'YELLOW') {
                var data = yield table_model.hasOrder(status[i].ID);
                var orderID = (data[0]||{}).ID;
                status[i].OrderID = orderID;
            }
            else if (status[i].Status == 'RED') {
                var data = yield table_model.busBoy(status[i].ID);
                var busBoyID = (data[0]||{}).EmployeeID;
                status[i].EmployeeID = busBoyID;
            }
        }
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
        if (status == 'RED') {
            var data = yield table_model.busBoy(id);
            info[0].EmployeeID = data[0].EmployeeID;
            this.body = { success: true, data: info }
        }
        else if (status == 'YELLOW') {
            var data = yield table_model.hasOrder(info[0].ID);
            var orderID = data[0].ID;
            info[0].OrderID = orderID;
            this.body = { success: true, data: info };
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