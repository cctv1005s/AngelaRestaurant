const menuModel = require('../proxy/menu.js');
const co = require('co');
const expect = require('chai').expect;

describe('菜单数据库测试', () => {
  it('获取类别测试', (done) => {
    co(function* () {
      const r = yield menuModel.type();
      expect(r).to.be.a('array');
      done();
    }).catch((e) => {
      throw new Error(e);
    });
  });

  it('获取某一个类别下的菜的测试', (done) => {
    co(function* () {
      const r = yield menuModel.oneType('1');
      done();
    }).catch((e) => {
      throw new Error(e);
    });
  });

  it('菜单oneDish方法测试', function (done) {
    co(function* () {
      var r = yield menuModel.oneDish('1');
      expect(r).to.be.a('array');
      done();
    })
      .catch(function (e) {
        throw new Error(e);
      });
  });

  it('菜单addType方法测试', function (done) {
    co(function* () {
      var r = yield menuModel.addType({
        ID: 'test',
        ClassName: 'test',
        ClassDescription: 'test'
      });
      console.log(r);
      done();
    })
      .catch(function (e) {
        throw new Error(e);
      });
  });

  it('菜单updateType方法测试', function (done) {
    co(function* () {
      var r = yield menuModel.updateType({
        ID: 'test',
        ClassName: 'test1',
        ClassDescription: 'test1'
      });
      console.log(r);
      done();
    })
      .catch(function (e) {
        throw new Error(e);
      });
  });

  it('菜单deleteType方法测试', function (done) {
    co(function* () {
      var r = yield menuModel.deleteType('test');
      console.log(r);
      done();
    })
      .catch(function (e) {
        throw new Error(e);
      });
  });

  it('菜单addDish方法测试', function (done) {
    co(function* () {
      var r = yield menuModel.addDish({
        ID: 'test',
        Description: 'test',
        ClassID: '1',
        Price: 100,
        Name: 'test',
        Status: 'Available'
      });
      console.log(r);
      done();
    })
      .catch(function (e) {
        throw new Error(e);
      });
  });

  it('菜单updateDish方法测试', function (done) {
    co(function* () {
      var r = yield menuModel.updateDish({
        ID: 'test',
        Description: 'test1',
        ClassID: '1',
        Price: 100,
        Name: 'test1',
        Status: 'Available'
      });
      console.log(r);
      done();
    })
      .catch(function (e) {
        throw new Error(e);
      });
  });

  it('菜单stopDish方法测试', function (done) {
    co(function* () {
      var r = yield menuModel.stopDish('test');
      console.log(r);
      done();
    })
      .catch(function (e) {
        throw new Error(e);
      });
  });

  it('菜单deleteDish方法测试', function (done) {
    co(function* () {
      var r = yield menuModel.deleteDish('test');
      console.log(r);
      done();
    })
      .catch(function (e) {
        throw new Error(e);
      });
  });


});
