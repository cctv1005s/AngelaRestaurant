var expect = require('chai').expect;
var co = require('co');
var order_model = require('../proxy/order.js');
require('co-mocha');

describe('订单model的测试', function () {

    it('订单reserve方法测试', function *() {
        var r = yield order_model.setReserve({
            OrderID: '1',
            UserId: '1',
            OrderTime: new Date(),
            Phone: 12345678901,
            Type: 1,
            Status: 'RESERVE',
            PeopleNum: 5,
        });
    });

    it('订单findReserveByUseID方法测试',function*(){
        var r = yield order_model.findReserveByUseID('1');
    });

    it('订单getAuthByID方法测试',function*(){
        var r = yield order_model.getAuthByIDs('1');
        expect(r).to.be.a('array');
    });
    
    it('订单findChefIDByDishID方法测试',function*(){
        var r = yield order_model.findChefIDByDishID('1');
    });

    it('订单getInfoByEmployeeID方法测试',function*(){
        var r = yield order_model.getInfoByDishID('1');
        expect(r).to.be.a('array');
    });


    it('订单insertCookingList方法测试',function*(){
        var r = yield order_model.insertCookingList('1');
    });


    it('订单getCookingInfo方法测试',function*(){
        var r = yield order_model.getCookingInfo('1','1');
    });



    it('订单deleteOneDishByCookingID方法测试',function*(){
        var r = yield order_model.deleteOneDishByCookingID('1');
    });



    it('订单getDishIDByOrderID方法测试',function*(){
        var r = yield order_model.getDishIDByOrderID('1');
        expect(r).to.be.a('array');
    });


    it('订单cancelOrder方法测试',function*(){
        var r = yield order_model.getDishIDByOrderID('1');
    });

});