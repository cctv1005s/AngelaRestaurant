const app = require('../app.js');
const request = require('co-supertest').agent(app.listen());
const expect = require('chai').expect;
const shortid = require('shortid');
require('co-mocha');

describe('Api_ Order接口测试', () => {
  it('预订接口测试', function* () {
    // 预订成功的情况
    // var r = yield request
    //               .post('/api/v1/reserve')
    //               .send({ PeopleNum: '5', Phone: '13113124125',  OrderTime: new Data()})
    //               .end();
    // var d = r.body;
    // expect(d.success).to.equal(true);
    // // 预定失败的情况
    // r = yield request
    //           .post('/api/v1/reserve')
    //           .send({ PeopleNum: '0', Phone: '13113124125',  OrderTime: new Data()})
    //           .end();
    // d = r.body;
    // expect(d.data).to.equal('预订人数范围为1-20人');

    //   r = yield request
    //           .post('/api/v1/reserve')
    //           .send({ PeopleNum: '5', Phone: '13113124125',  OrderTime: new Data()})
    //           .end();
    // d = r.body;
    // expect(d.data).to.equal('请预订七天以内的时间');

    //     r = yield request
    //           .post('/api/v1/reserve')
    //           .send({ PeopleNum: '0', Phone: '13113124125',  OrderTime: new Data()})
    //           .end();
    // d = r.body;
    // expect(d.data).to.equal('没有该用户');

    //     r = yield request
    //           .post('/api/v1/reserve')
    //           .send({ PeopleNum: '0', Phone: '13113124125',  OrderTime: new Data()})
    //           .end();
    // d = r.body;
    // expect(d.data).to.equal('预订人数范围为1-20人');
  });


  it('支付接口测试', function* () {
    // 支付成功的情况
    var r = yield request
                  .post('/api/v1/payforOrder')
                  .send({ orderID: '1' })
                  .end();
    var d = r.body;
    expect(d.success).to.equal(true);
    // 支付失败的情况
    r = yield request
              .post('/api/v1/payforOrder')
              .send({ orderID: 'test' })
              .end();
    d = r.body;
    expect(d.data).to.equal('此订单还未点餐');
  });
});
