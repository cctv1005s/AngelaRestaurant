var staff_model=require('../proxy/staff');
require('co-mocha');
var expect = require('chai').expect;
var shortid=require('shortid');
describe('staff的数据库测试', () =>  {
  it('get all employeeclass', function* () {
    var r = yield staff_model.getall();
    expect(r).to.be.a('array');
  });
   it('add a new employeeclass', function* () {
    var r = yield staff_model.addtype({ID:shortid.generate(),
        ClassName:'数据库烧火的',
        ClassDescription:'lit the fire'});
    expect(r).to.be.an('object');
  });
   it('find a employee by ID',function* (){
    var r=yield staff_model.getstaffdetail(1);
    expect(r).to.be.a('array');
    
  });
   it('add a new employee',function* (){
    var r=yield staff_model.addemployee({
        ID:shortid.generate(),
        Account:'testwang',
        Password:'password',
        Status:'WORK',
        Name:'王测试',
        Salary:'10',
        Phone:'12112121212',
        BankCard:'123',
        WorkTime:'10:10',
        HeadIcon:'NULL',
        ClassID:'1',
        AccessToken:shortid.generate()
    });
    expect(r).to.be.an('object');
    
  });
     it('update a new employeeclass', function* () {
    var r = yield staff_model.updateEmployee("HeadIcon='test'",1);
    expect(r).to.be.an('object');

});
    
});
