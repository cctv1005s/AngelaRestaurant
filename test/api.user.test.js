const app = require('../app.js');
const request = require('co-supertest').agent(app.listen());
const should = require('chai').should;
require('co-mocha');

describe('userApi接口测试', () => {
  it('注册接口测试', function* () {
    yield request
          .post('/api/v1/signup')
          .send({ Account: 'cctv1005k', Password: '123456' });
  });
});
