var expect = require('chai').expect;
var shortid = require('shortid');
var timeFormat = require('../tools/time.js');
var orderModel = require('../proxy/order.js');
var mysql = require('../models/index');
require('co-mocha');


describe('订单model的测试', () => {
  it(
    '订单 setOrderState、setReserve、HistoryOrderList、findReserveByUseID、insertCookingList、getCookingInfo、deleteOneDishByCookingID、orderDish、getDishIDByOrderID、cancelOrder方法测试'
  , function* () {
  // setReserve成功的情况
    var query = `
    SELECT ID FRom Customer
    WHERE ID NOT IN 
    (SELECT UserID FROM CustomerOrder)
    `;
    var user = yield mysql.query(query);
    var order = shortid.generate();
    var r = yield orderModel.setReserve({
      OrderID: order,
      UserId: user[0].ID,
      OrderTime: timeFormat.format(new Date()),
      Phone: 99999999999,
      Type: 1,
      Status: 'RESERVE',
      PeopleNum: 5,
    });
    expect(r.affectedRows).to.equal(1);


  // findReserveByUseID成功的情况
    r = yield orderModel.findReserveByUseID(user[0].ID);
    expect(r).to.have.length.least(1);

  // findReserveByUseID失败的情况
    r = yield orderModel.findReserveByUseID('-111');
    expect(r).to.have.lengthOf(0);


    query = `
    SELECT * FRom ChefCanDish
    `;
    var chefAndDish = yield mysql.query(query);
    var cooking = shortid.generate();
  // insertCookingList成功的情况
    r = yield orderModel.insertCookingList({
      CookingID: cooking,
      OrderID: order,
      ChefID: chefAndDish[0].ChefID,
      DishID: chefAndDish[0].DishID,
      Status: 'WAIT',
    });
    expect(r.affectedRows).to.equal(1);


  // getCookingInfo成功的情况
    r = yield orderModel.getCookingInfo(order, cooking);

    expect(r).to.have.lengthOf(1);

  // getCookingInfo失败的情况
    r = yield orderModel.getCookingInfo('-11111', '-11111');
    expect(r).to.have.lengthOf(0);


  // getDishIDByOrderID成功情况
    r = yield orderModel.getDishIDByOrderID(order);
    expect(r).to.have.lengthOf(1);

  // getDishIDByOrderID失败情况
    r = yield orderModel.getDishIDByOrderID('-111');
    expect(r).to.have.lengthOf(0);

    // orderDish成功
    r = yield orderModel.orderDish(order);
    expect(r).to.have.length.least(1);

    // orderDish失败
    r = yield orderModel.orderDish('-111');
    expect(r).to.have.lengthOf(0);

  // deleteOneDishByCookingID成功的情况
    r = yield orderModel.deleteOneDishByCookingID(cooking);
    expect(r.affectedRows).to.equal(1);

  // deleteOneDishByCookingID失败的情况
    r = yield orderModel.deleteOneDishByCookingID('-11111');
    expect(r.affectedRows).to.equal(0);


  // setOrderState成功的情况
    r = yield orderModel.setOrderState(order);
    expect(r.affectedRows).to.equal(1);

  // setOrderState失败的情况
    r = yield orderModel.setOrderState('-111');
    expect(r.affectedRows).to.equal(0);

  // cancelOrder成功的情况
    r = yield orderModel.cancelOrder(order);
    expect(r.affectedRows).to.equal(1);

  // cancelOrder失败的情况
    r = yield orderModel.cancelOrder('-1111');
    expect(r.affectedRows).to.equal(0);

  // HistoryOrderList成功的情况
    r = yield orderModel.HistoryOrderList(user[0].ID);
    expect(r).to.have.lengthOf(1);


  // HistoryOrderList失败的情况
    r = yield orderModel.HistoryOrderList('-1111');
    expect(r).to.have.lengthOf(0);

    query = `
    DELETE FRom CustomerOrder
    WHERE ID = '${order}'
    `;
    yield mysql.query(query);
  });


//   it('订单getAuthByID方法测试', function* () {
//     var r = yield orderModel.getAuthByIDs('1');
//     expect(r).to.be.a('array');
//   });


  it('订单findChefIDByDishID、getInfoByDishID 方法测试', function* () {
    var query = `
    SELECT ID FRom Dish
    WHERE \`Status\` = 'Avaliable'
    `;
    var dish = yield mysql.query(query);
    // findChefIDByDishID成功
    var r = yield orderModel.findChefIDByDishID(dish[0].ID);
    expect(r).to.have.length.least(1);

    // findChefIDByDishID失败
    r = yield orderModel.findChefIDByDishID('-111');
    expect(r).to.have.lengthOf(0);


    // getInfoByDishID成功
    r = yield orderModel.getInfoByDishID(dish[0].ID);
    expect(r).to.have.lengthOf(1);

    // getInfoByDishID失败
    r = yield orderModel.getInfoByDishID('-111');
    expect(r).to.have.lengthOf(0);
  });


  it('订单getChefCookingSum方法测试', function* () {
    var query = `
    SELECT ID 
    FRom Employee
    WHERE ClassID = '1' or ClassID = '2' 
    `;
    var chef = yield mysql.query(query);

    // getChefCookingSum成功
    var r = yield orderModel.getChefCookingSum(chef[0].ID);
    expect(r).to.be.at.least(0);

    // getChefCookingSum失败
    r = yield orderModel.getChefCookingSum('-111');
    expect(r).to.equal(0);
  });


  it('订单getInfoByEmployeeID方法测试', function* () {
    var query = `
    SELECT ID 
    FRom Employee
    WHERE ClassID = '1' or ClassID = '2' 
    `;
    var employee = yield mysql.query(query);
       // getInfoByEmployeeID成功
    var r = yield orderModel.getInfoByEmployeeID(employee[0].ID);
    expect(r).to.have.lengthOf(1);

       // getInfoByEmployeeID失败
    r = yield orderModel.getInfoByEmployeeID('-111');
    expect(r).to.have.lengthOf(0);
  });


  // it('订单getTableId方法测试', function* () {

  //   var r = yield orderModel.getTableId('1');
  //   expect(r).to.have.lengthOf(1);

  //   r = yield orderModel.orderDish('0000');
  //   expect(r).to.have.lengthOf(0);
  // });


  // it('订单setTableState方法测试', function* () {
  //   var r = yield orderModel.setTableState('1');
  //   expect(r).to.be.a('object');
  // });


  it('订单getBusboyID方法测试', function* () {
    // getBusboyID成功的情况
    var r = yield orderModel.getBusboyID();
    expect(r).to.have.length.least(1);
  });


  it('订单distributeBusboy方法测试', function* () {
    var query = `
    SELECT ID FRom View_busboy
    `;
    var busboy = yield mysql.query(query);


    query = `
    SELECT ID FRom \`Table\`
    `;
    var table = yield mysql.query(query);

    // distributeBusboy成功的状态
    var r = yield orderModel.distributeBusboy(busboy[0].ID, table[0].ID);
    expect(r.affectedRows).to.equal(1);

    query = `
    DELETE FRom EmployeeInTable
    WHERE EmployeeID = '${busboy[0].ID}'
    AND TableID = '${table[0].ID}'
    `;
    yield mysql.query(query);
  });


  it('订单OrderList方法测试', function* () {
    var r = yield orderModel.OrderList();
    expect(r).to.be.a('array');
  });
});
