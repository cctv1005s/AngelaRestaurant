const app = require('../app.js');
const request = require('co-supertest').agent(app.listen());
const expect = require('chai').expect;
const shortid = require('shortid');
require('co-mocha');

describe('Api_ User接口测试', () => {
  it('注册接口测试', function* () {
    var r = yield request
            .post('/api/v1/signup')
            .send({ Account: 'cctv1005k', Password: '123456' });
    // 本接口测试还没有写完，暂时认为不通过，下面代码是手动抛出错误的代码
    throw Error('测试未完成');
  });

  it('登录接口测试', function* () {
    // 登录成功的情况
    var r = yield request
                  .post('/api/v1/signin')
                  .send({ Account: 'cctv1005s', Password: 'password' })
                  .end();
    var d = r.body;
    expect(d.success).to.equal(true);
    // 登录失败的情况
    r = yield request
              .post('/api/v1/signin')
              .send({ Account: shortid.generate(), Password: shortid.generate() })
              .end();
    d = r.body;
    expect(d.success).to.equal(false);
  });


  // it('员工登录接口测试', function* () {
  //   // 登录成功的情况
  //   var r = yield request
  //                 .post('/api/v1/employeeSignin')
  //                 .send({ Account: 'employeeSignin', Password: 'password' })
  //                 .end();
  //   var d = r.body;
  //   expect(d.success).to.equal(true);
  //   // 登录失败的情况
  //   r = yield request
  //             .post('/api/v1/employeeSignin')
  //             .send({ Account: shortid.generate(), Password: shortid.generate() })
  //             .end();
  //   d = r.body;
  //   expect(d.success).to.equal(false);
  // });
});
