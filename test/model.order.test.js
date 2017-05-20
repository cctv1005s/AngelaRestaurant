var expect = require('chai').expect;
var uuidV1 = require('uuid/v1');
var shortid = require('shortid');
var timeFormat = require('../tools/time.js');
var orderModel = require('../proxy/order.js');
require('co-mocha');

describe('订单model的测试', () => {
  it('订单setReserve方法测试', function* () {
    var r = yield orderModel.setReserve({
      OrderID: shortid.generate(),
      UserId: '1',
      OrderTime: timeFormat.format(new Date()),
      Phone: 12345678901,
      Type: 1,
      Status: 'RESERVE',
      PeopleNum: 5,
    });
    expect(r.affectedRows).to.equal(1);
  });


  it('订单findReserveByUseID方法测试', function* () {
    var r = yield orderModel.findReserveByUseID('1');
    expect(r).to.have.length.least(1);


    r = yield orderModel.findReserveByUseID('000000');
    expect(r).to.have.lengthOf(0);
  });


//   it('订单getAuthByID方法测试', function* () {
//     var r = yield orderModel.getAuthByIDs('1');
//     expect(r).to.be.a('array');
//   });


  it('订单findChefIDByDishID方法测试', function* () {
    var r = yield orderModel.findChefIDByDishID('12');
    expect(r).to.have.length.least(1);

    r = yield orderModel.findChefIDByDishID('50');
    expect(r).to.have.lengthOf(0);
  });


  it('订单getChefCookingSum方法测试', function* () {
    var r = yield orderModel.getChefCookingSum('1');
    expect(r).to.not.equal(0);

    r = yield orderModel.getChefCookingSum('20');
    expect(r).to.equal(0);
  });


  it('订单getInfoByEmployeeID方法测试', function* () {
    var r = yield orderModel.getInfoByEmployeeID('1');
    expect(r).to.have.lengthOf(1);

    r = yield orderModel.getInfoByEmployeeID('00000');
    expect(r).to.have.lengthOf(0);
  });


  it('订单getInfoByDishID方法测试', function* () {
    var r = yield orderModel.getInfoByDishID('1');
    expect(r).to.have.lengthOf(1);

    r = yield orderModel.getInfoByDishID('00000');
    expect(r).to.have.lengthOf(0);
  });


  it('订单insertCookingList方法测试', function* () {
    var r = yield orderModel.insertCookingList({
      CookingID: uuidV1(),
      OrderID: '1234',
      ChefID: '1',
      DishID: '3',
      Status: 'WAIT',
    });
    expect(r.affectedRows).to.equal(1);
  });


  it('订单getCookingInfo方法测试', function* () {
    var r = yield orderModel.getCookingInfo('1', '1');
    expect(r).to.have.length.least(1);

    r = yield orderModel.getCookingInfo('000000', '0000000');
    expect(r).to.have.lengthOf(0);
  });


  it('订单deleteOneDishByCookingID方法测试', function* () {
    var r = yield orderModel.deleteOneDishByCookingID('0000');
    expect(r.affectedRows).to.equal(0);
  });


  it('订单getDishIDByOrderID方法测试', function* () {
    var r = yield orderModel.getDishIDByOrderID('1');
    expect(r).to.have.length.least(1);

    r = yield orderModel.getDishIDByOrderID('0000');
    expect(r).to.have.lengthOf(0);
  });


  it('订单cancelOrder方法测试', function* () {
    var r = yield orderModel.cancelOrder('000000');
    expect(r.affectedRows).to.equal(0);
  });


  it('订单orderDish方法测试', function* () {
    var r = yield orderModel.orderDish('r1aYz4xxZ');
    expect(r).to.have.length.least(1);

    r = yield orderModel.orderDish('0000');
    expect(r).to.have.lengthOf(0);
  });


  it('订单getTableId方法测试', function* () {
    var r = yield orderModel.getTableId('1');
    expect(r).to.have.lengthOf(1);

    r = yield orderModel.orderDish('0000');
    expect(r).to.have.lengthOf(0);
  });


  it('订单setTableState方法测试', function* () {
    var r = yield orderModel.setTableState('1');
    expect(r).to.be.a('object');
  });


  it('订单setOrderState方法测试', function* () {
    var r = yield orderModel.setOrderState('1');
    expect(r).to.be.a('object');
  });

  it('订单getBusboyID方法测试', function* () {
    var r = yield orderModel.getBusboyID();
    expect(r).to.have.length.least(1);
  });

  it('订单distributeBusboy方法测试', function* () {
    var r = yield orderModel.distributeBusboy('afsref', '1');
    expect(r.affectedRows).to.equal(1);
  });


  it('订单OrderList方法测试', function* () {
    var r = yield orderModel.OrderList();
    expect(r).to.be.a('array');
  });


  it('订单HistoryOrderList方法测试', function* () {
    var r = yield orderModel.HistoryOrderList('4432');
    expect(r).to.be.a('array');
  });
});
