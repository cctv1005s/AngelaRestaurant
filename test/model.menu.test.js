const menuModel = require('../proxy/menu.js');
const expect = require('chai').expect;
require('co-mocha');
var shortid = require('shortid');


describe('菜单数据库测试', () => {
    it('获取类别测试', function* () {
        const r = yield menuModel.type();
        expect(r).to.be.a('array');
    });

    it('获取某一个类别下的菜的测试', function* () {
        const r = yield menuModel.oneType('1');
        expect(r).to.be.a('array');
    });

    it('菜单oneDish方法测试', function* () {
        var r = yield menuModel.oneDish('1');
        expect(r).to.be.a('array');
    });

    it('菜单addType方法测试', function* () {
        var r = yield menuModel.addType({
            ID: shortid.generate(),
            ClassName: 'test',
            ClassDescription: 'test'
        });
        expect(r).to.be.an('object');
    });

    it('菜单updateType方法测试', function* () {
        var r = yield menuModel.updateType({
            ID: shortid.generate(),
            ClassName: 'test1',
            ClassDescription: 'test1'
        });
        expect(r).to.be.an('object');
    });

    it('菜单deleteType方法测试', function* () {
        var r = yield menuModel.deleteType('test');
        expect(r).to.be.an('object');
    });

    it('菜单addDish方法测试', function* () {
        var r = yield menuModel.addDish({
            ID: shortid.generate(),
            Description: 'test',
            ClassID: '1',
            Price: 100,
            Name: 'test',
            Status: 'Available'
        });
        expect(r).to.be.an('object');
    });

    it('菜单updateDish方法测试', function* () {
        var r = yield menuModel.updateDish({
            ID: shortid.generate(),
            Description: 'test1',
            ClassID: '1',
            Price: 100,
            Name: 'test1',
            Status: 'Available'
        });
        expect(r).to.be.an('object');
    });

    it('菜单stopDish方法测试', function* () {
        var r = yield menuModel.stopDish('test');
        expect(r).to.be.an('object');
    });

    it('菜单deleteDish方法测试', function* () {
        var r = yield menuModel.deleteDish('test');
        expect(r).to.be.an('object');
    });
});
