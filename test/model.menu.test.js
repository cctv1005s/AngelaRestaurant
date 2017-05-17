const menuModel = require('../proxy/menu.js');
const co = require('co');
const expect = require('chai').expect;
require('co-mocha');

describe('菜单数据库测试', () => {
  it('获取类别测试', function*(){
      const r = yield menuModel.type();
      expect(r).to.be.a('array');
  });

  it('获取某一个类别下的菜的测试', function*(){
      const r = yield menuModel.oneType('1');
  });
});
