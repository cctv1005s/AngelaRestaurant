var staff_model=require('../proxy/staff');
require('co-mocha');
var expect = require('chai').expect;
var shortid=require('shortid');
describe('staff的数据库测试', () =>  {
  it('get all employeeclass', function* () {
    for (var index = 11; index < 41; index++) {
      
      var r = yield staff_model.adddishforchef(1,index);
    
    }
    
    expect(r).to.be.an('object');
  });
    
});
