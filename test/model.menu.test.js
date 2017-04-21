var menu_model = require('../proxy/menu.js');
var co = require('co');
var expect = require('chai').expect;

describe("菜单数据库测试",function(){
    it("获取类别测试",function(done){
        co(function*(){
            var r = yield menu_model.type();
            expect(r).to.be.a('array');
            done();
        }).catch(function(e){
            throw new Error(e);
        });
    });

    it("获取某一个类别下的菜的测试",function(done){
        co(function*(){
            var r = yield menu_model.oneType('1');
            console.log(r);
            done();
        }).catch(function(e){
            throw new Error(e);
        });
    });
})