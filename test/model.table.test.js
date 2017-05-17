var expect = require('chai').expect;
var co = require('co');
var shortid = require('shortid');
var table_model = require('../proxy/table.js');
require('co-mocha');

describe('餐桌model的测试', () => {

    it('餐桌getID方法测试', function* () {
        var r = yield table_model.getID('BJ8R2j0yb');
        expect(r).to.be.a('array');
    });

    it('餐桌isOrder方法测试', function* () {
        var r = yield table_model.isOrder('f5ef0de0-3270-11e7-b0c2-13dda5');
        expect(r).to.be.a('array');
    });

    it('餐桌newOrder方法测试', function* () {
        var r = yield table_model.newOrder({
            ID: shortid.generate(),
            TableID: '3',
            UserID: '1',
            OrderTime: new Date(),
            Phone: 12345678987,
            Type: 1,
            Status: 'PROGRESS',
            WaiterID: '3',
            PeopleNum: 1
        });
        expect(r).to.be.an('object');
    });

    it('餐桌updateOrder方法测试', function* () {
        var r = yield table_model.updateOrder({
            ID: 'test1',
            TableID: '3',
            UserID: '1',
            OrderTime: new Date(),
            Phone: 12345678987,
            Type: 1,
            Status: 'PROGRESS',
            WaiterID: '3',
            PeopleNum: 2
        });
        expect(r).to.be.an('object');
    });

    it('餐桌table方法测试', function* () {
        var r = yield table_model.table();
        expect(r).to.be.a('array');
    });

    it('餐桌oneTable方法测试', function* () {
        var r = yield table_model.oneTable('1');
        expect(r).to.be.a('array');
    });

    it('餐桌busBoy方法测试', function* () {
        var r = yield table_model.busBoy('1');
        expect(r).to.be.a('array');
    });

    it('餐桌cleanup方法测试', function* () {
        var r = yield table_model.cleanup('test');
        expect(r).to.be.an('object');
    });

    it('餐桌cleanup_方法测试', function* () {
        var r = yield table_model.cleanup_('test');
        expect(r).to.be.an('object');
    });

});