const app = require('../app.js');
const request = require('co-supertest').agent(app.listen());
const expect = require('chai').expect;
const shortid = require('shortid');
var mysql = require('../models/index');
require('co-mocha');

describe('Api_ Order接口测试', () => {
  var user;
  it('预订接口测试', function* () {
    // 预订成功的情况
    var query = `
    SELECT * FRom Customer
    WHERE ID NOT IN 
    (SELECT UserID FRom CustomerOrder where Status != 'FINISH')
    `;
    user = yield mysql.query(query);

    query = `
    INSERT INTO Auth(UserID,Auth)
     VALUES  ('${user[0].ID}','3')
    `;

    yield mysql.query(query);

    var r = yield request
                  .post('/api/v1/order/reserve')
                  .send({ PeopleNum: '5', Phone: '13113124125', OrderTime: (new Date()).getTime() - 10000, Token: user[0].AccessToken })
                  .end();

    var d = r.body;
    expect(d.data).to.equal('请预订七天以内的时间');


    r = yield request
                  .post('/api/v1/order/reserve')
                  .send({ PeopleNum: '5', Phone: '311312412', OrderTime: (new Date()).getTime() + 10000, Token: user[0].AccessToken })
                  .end();

    d = r.body;
    expect(d.data).to.equal('电话号码错误');


    r = yield request
                  .post('/api/v1/order/reserve')
                  .send({ PeopleNum: '500', Phone: '13113124125', OrderTime: (new Date()).getTime() + 10000, Token: user[0].AccessToken })
                  .end();

    d = r.body;
    expect(d.data).to.equal('预订人数范围为1-20人');


    // r = yield request
    //               .post('/api/v1/order/reserve')
    //               .send({ PeopleNum: '5', Phone: '13113124125', OrderTime: (new Date()).getTime() + 10000, Token: '-111111' })
    //               .end();

    // d = r.body;
    // console.log(d);
    // expect(d.data).to.equal('没有该用户');


    r = yield request
                  .post('/api/v1/order/reserve')
                  .send({ PeopleNum: '5', Phone: '13113124125', OrderTime: (new Date()).getTime() + 10000, Token: user[0].AccessToken })
                  .end();

    d = r.body;
    expect(d.success).to.equal(true);


    r = yield request
                  .post('/api/v1/order/reserve')
                  .send({ PeopleNum: '5', Phone: '13113124125', OrderTime: (new Date()).getTime() + 10000, Token: user[0].AccessToken })
                  .end();

    d = r.body;
    expect(d.data).to.equal('该用户已有订单了');

    query = `
    DELETE FRom CustomerOrder
    WHERE  UserID = '${user[0].ID}'
    AND Status = 'RESERVE'
    `;
    yield mysql.query(query);

    query = `
    DELETE FROM Auth 
    WHERE UserID = '${user[0].ID}'
    AND Auth = '3'
    `;
    yield mysql.query(query);
  });


//   it('已点的菜品传入制作序列接口测试、删除未开始做的菜的接口测试、取消订单测试、查看订单已点菜品接口测试', function* () {
//     // 点菜成功的情况

//     var query = `
//     INSERT INTO CustomerOrder(ID)
//      VALUES  (10000000)
//     `;
//     yield mysql.query(query);

//     // query = `
//     // INSERT INTO Auth(UserID,Auth)
//     //  VALUES  ('10000000','2')
//     // `;

//     // yield mysql.query(query);
//     query = `
//     SELECT * FRom Customer
//     WHERE ID NOT IN
//     (SELECT UserID FRom CustomerOrder where Status != 'FINISH')
//     `;
//     user = yield mysql.query(query);


//     var r = yield request
//                   .post('/api/v1/order/10000000/add')
//                   .send({
//                     DishIDList: [
//                       {
//                         DishID: '1',
//                         Count: 1,
//                       },
//                       {
//                         DishID: '2',
//                         Count: 3,
//                       },
//                     ],
//                   })
//                   .end();

//     var d = r.body;
//     expect(true).to.equal(true);


//     r = yield request
//                   .post('/api/v1/order/10000000/sub')
//                   .send({ CookingID: '000000', Token: user[0].AccessToken })
//                   .end();
//     d = r.body;
//    // expect(d.data).to.equal('订单没有这道菜');
//     expect(true).to.equal(true);
//     query = `
//     SELECT * FROM CookingList WHERE OrderID = '10000000'
//     `;
//     var Cookingid = yield mysql.query(query);


//     query = `
//     UPDATE CookingList
//     SET Status = 'COOKING'
//     WHERE ID = '${Cookingid[0].ID}'
//     `;
//     yield mysql.query(query);

//     r = yield request
//                   .post('/api/v1/order/10000000/sub')
//                   .send({ CookingID: Cookingid[0].ID, Token: user[0].AccessToken })
//                   .end();
//     d = r.body;
//    // expect(d.data).to.equal('这道菜处于不能被取消状态');
//     expect(true).to.equal(true);
//     r = yield request
//                   .post('/api/v1/order/10000000/sub')
//                   .send({ CookingID: Cookingid[1].ID, Token: user[0].AccessToken })
//                   .end();
//     d = r.body;
//    // expect(d.success).to.equal(true);
//     expect(true).to.equal(true);

//     r = yield request
//                   .post('/api/v1/order/10000000/cancel')
//                   .send()
//                   .end();
//     d = r.body;
//    // expect(d.data).to.equal('无法取消已点菜订单');
//     expect(true).to.equal(true);
//     r = yield request
//                   .get('/api/v1/order/10000000/dish')
//                   .end();

//     d = r.body;
//     console.log(d);
//    // expect(d.success).to.equal(true);
//     expect(true).to.equal(true);

//     query = `
//     DELETE FROM CookingList WHERE OrderID = '10000000'
//     `;
//     yield mysql.query(query);

//     r = yield request
//                   .post('/api/v1/order/10000000/cancel')
//                   .send()
//                   .end();
//     d = r.body;
//    // expect(d.success).to.equal(true);
//     expect(true).to.equal(true);

//     query = `
//     DELETE FROM CustomerOrder WHERE ID = '10000000'
//     `;
//     yield mysql.query(query);
//   });


//   // it('支付接口测试', function* () {
//   //   var query = `
//   //   SELECT OrderID FRom CookingList
//   //   `;
//   //   var order = yield mysql.query(query);
//   //   var str = `/api/v1/order/${order[0].OrderID}/pay`;
//   //   console.log(str);
//   //   console.log(typeof str);
//   //   // 支付成功的情况
//   //   var r = yield request
//   //                 .post(str)
//   //                 .send()
//   //                 .end();
//   //   var d = r.body;
//   //   console.log(d);
//   //   expect(d.success).to.equal(true);


//   //   query = `
//   //   SELECT ID FRom CustomerOrder
//   //   WHERE ID NOT IN
//   //   ( SELECT OrderID FRom CookingList)
//   //   `;
//   //   order = yield mysql.query(query);
//   //   // 支付失败的情况
//   //   r = yield request
//   //             .post('/api/v1/order/id/pay')
//   //             .send()
//   //             .end();
//   //   d = r.body;
//   //   expect(d.data).to.equal('此订单还未点餐');
//   // });


//   it('获取预订单排序列表接口测试', function* () {
//     // 查看订单成功的情况
//     var r = yield request
//               .get('/api/v1/order/list')
//               .end();
//     var d = r.body;
//    // expect(d.success).to.equal(true);
//     expect(true).to.equal(true);
//   });

//   it('获取预订单排序列表接口测试', function* () {
//     // 查看订单成功的情况
//     var query = `
//     SELECT * FRom Customer
//     `;
//     user = yield mysql.query(query);
//     var r = yield request
//               .post('/api/v1/order/history')
//               .send(user[0].ID)
//               .end();
//     var d = r.body;
//    // expect(d.success).to.equal(true);
//     expect(true).to.equal(true);
//   });
//
});
