var authModel = require('../proxy/auth');
require('co-mocha');
describe('auth的数据库测试', () =>  {
  it('获取权限', function* () {
    var r = yield authModel.getAuth(3);
  });
});
