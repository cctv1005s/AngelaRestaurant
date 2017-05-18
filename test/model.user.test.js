const expect = require('chai').expect;
var modelUser = require('../proxy/user.js');
const uuidV1 = require('uuid/v1');
const md5 = require('md5');
const shortid = require('shortid');
require('co-mocha');


describe('用户model的测试', () => {
  it('findByID方法测试', function* () {
    var r = yield modelUser.findByID('1');
    expect(r).to.have.length.least(1);

    r = yield modelUser.findByID('0000');
    expect(r).to.have.lengthOf(0);
  });


  it('findByToken方法测试', function* () {
    var r = yield modelUser.findByToken('BJ8R2j0yb');
    expect(r).to.have.length.least(1);

    r = yield modelUser.findByToken('00000');
    expect(r).to.have.lengthOf(0);
  });


  it('findByAccount方法测试', function* () {
    var r = yield modelUser.findByAccount('123456');
    expect(r).to.have.length.least(1);

    r = yield modelUser.findByAccount('00000');
    expect(r).to.have.lengthOf(0);
  });


  it('add方法测试', function* () {
    var r = yield modelUser.add({
      ID: uuidV1(),
      Account: 'aaacount',
      Password: md5('Password'),
      Phone: 12345678901,
      NickName: '一个',
      AccessToken: shortid.generate(),
    });
    expect(r.affectedRows).to.equal(1);


    // r = yield modelUser.add({
    //   ID: 1,
    //   Account: 'aaacount',
    //   Password: md5('Password'),
    //   Phone: 12345678901,
    //   NickName: '一个',
    //   AccessToken: shortid.generate(),
    // });
    // console.log(r);
    // expect(r.affectedRows).to.equal(0);
  });  
});
