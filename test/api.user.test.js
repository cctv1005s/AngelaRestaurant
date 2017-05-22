const app = require('../app.js');
const request = require('co-supertest').agent(app.listen());
const expect = require('chai').expect;
const shortid = require('shortid');
const mysql = require('../models');


require('co-mocha');

describe('Api_ User接口测试', () => {
  it('注册，登陆接口测试', function* () {
    // 随机生成账号密码
    var p = shortid.generate();
    var newUser = {
      Account: shortid.generate(),
      Password: p,
      Phone: '12345678901',
      NickName: 'testNickName',
      RePassword: p,
      Gender: 'Female',
    };
    var r = yield request
            .post('/api/v1/signup')
            .send(newUser)
            .end();
    r = r.body;
    expect(r.success).to.equal(true);
    // 重复注册，报错
    var r = yield request
            .post('/api/v1/signup')
            .send(newUser);
    r = r.body;
    expect(r.success).to.equal(false);

    // 登陆
    var r = yield request
                  .post('/api/v1/signin')
                  .send(newUser)
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

    // 测试完毕，删除这个用户
    yield mysql.query(`DELETE FROM \`Customer\` WHERE (\`Account\`='${newUser.Account}')`);
  });
});
