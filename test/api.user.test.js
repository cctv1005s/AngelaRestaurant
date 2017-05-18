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
  });
});
