const app = require('../app.js');
const request = require('co-supertest').agent(app.listen());
const should = require('chai').should;
require('co-mocha');
var expect=require('chai').expect;
describe('satffApi接口测试', () => {
    it('经理登陆测试', function* () {
    yield request
          .post('/api/v1/employeeSignin')
          .send({ Account: 'test6', Password: 'password' });
  });
  it('所有类别接口测试', function* () {
    
    var r=yield request
          .get('/api/v1/staff/type');
       expect(r['body']['success']).to.be.true;
  });
  it('create a new employeeclass',function* (){
    var r=yield request
        .post('/api/v1/staff/type/add')
        .send({ClassName:'烧火的',ClassDescription:'lit the fire'});
        expect(r['body']['success']).to.be.true;
});
  it('find a employee by ID',function* (){
    var r=yield request
        .get('/api/v1/staff/6');
            expect(r['body']['success']).to.be.true;

    
  });
  it('create a new employee',function* (){
    var r=
    yield request
        .post('/api/v1/staff/add')
        .send({Account:'testwang',Password:'password',Name:'王测试',Salary:'10',Phone:'12112121212',BankCard:'123',
        WorkTime:'10:10',ClassID:'2'});
           expect(r['body']['success']).to.be.true;
  });
  it('update a employee',function* (){
    var r= yield request
        .post('/api/v1/staff/update')
        .send({ID :'1',Password:'password'})
        .end();
    expect(r['body']['success']).to.be.true;
  });

});