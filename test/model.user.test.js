const expect = require('chai').expect;
var modelUser = require('../proxy/user.js');
var shortid = require('shortid');
const md5 = require('md5');
var mysql = require('../models/index');
require('co-mocha');


describe('用户model的测试', () => {
  it('findByID方法测试', function* () {
    var query = `
    SELECT ID FRom Customer
    `;
    var user = yield mysql.query(query);
    // findByID成功情况
    var r = yield modelUser.findByID(user[0].ID);
    expect(r).to.have.lengthOf(1);

    // findByID失败情况
    r = yield modelUser.findByID('-11111');
    expect(r).to.have.lengthOf(0);
  });


  it('findByToken方法测试', function* () {
    var query = `
    SELECT AccessToken FRom Customer
    `;
    var user = yield mysql.query(query);
    // findByToken成功情况
    var r = yield modelUser.findByToken(user[0].AccessToken);
    expect(r).to.have.lengthOf(1);

    
    // findByToken失败情况
    r = yield modelUser.findByToken('-11111');
    expect(r).to.have.lengthOf(0);
  });


  it('findByAccount方法测试', function* () {
    var query = `
    SELECT Account FRom Customer
    `;
    var user = yield mysql.query(query);
    // findByAccount成功情况
    var r = yield modelUser.findByAccount(user[0].Account);
    expect(r).to.have.length.least(0);

    // findByAccount失败情况
    r = yield modelUser.findByAccount('-11111');
    expect(r).to.have.lengthOf(0);
  });


  it('add方法测试', function* () {
    // add成功情况
    var id = shortid.generate();
    var r = yield modelUser.add({
      ID: id,
      Account: 'aaacount',
      Password: md5('Password'),
      Phone: 12345678901,
      NickName: '一个',
      AccessToken: shortid.generate(),
    });
    expect(r.affectedRows).to.equal(1);

    var query = `
    DELETE FRom Customer
    WHERE ID = '${id}'
    `;
    yield mysql.query(query);


    // try {
    //   r = yield modelUser.add({
    //     ID: 1,
    //     Account: 'aaacount',
    //     Password: md5('Password'),
    //     Phone: 12345678901,
    //     NickName: '一个',
    //     AccessToken: shortid.generate(),
    //   });
    // } catch (error) {
    //   expect(error).to.be.a('Object');
    // }
  });
});
