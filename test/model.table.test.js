var expect = require('chai').expect;
var co = require('co');
var table_model = require('../proxy/table.js');

describe('餐桌model的测试', function () {

    it('餐桌getID方法测试', function (done) {
        co(function* () {
                var r = yield table_model.getID('BJ8R2j0yb');
                expect(r).to.be.equal('46649b40-3461-11e7-89f5-238df1');
                done();
            })
            .catch(function (e) {
                throw new Error(e);
            });
    });

    it('餐桌isOrder方法测试', function (done) {
        co(function* () {
                var r = yield table_model.isOrder('f5ef0de0-3270-11e7-b0c2-13dda5');
                expect(r).to.be.a('array');
                done();
            })
            .catch(function (e) {
                throw new Error(e);
            });
    });

    it('餐桌newOrder方法测试', function (done) {
        co(function* () {
                var r = yield table_model.newOrder({
                    ID: 'test',
                    TableID: '3',
                    UserID: '1',
                    OrderTime: new Date(),
                    Phone: 12345678987,
                    Type: 1,
                    Status: 'PROGRESS',
                    WaiterID: '3',
                    PeopleNum: 1
                });
                console.log(r);
                done();
            })
            .catch(function (e) {
                throw new Error(e);
            });
    });

    it('餐桌updateOrder方法测试', function (done) {
        co(function* () {
                var r = yield table_model.updateOrder({
                    ID: 'test',
                    TableID: '3',
                    UserID: '1',
                    OrderTime: new Date(),
                    Phone: 12345678987,
                    Type: 1,
                    Status: 'PROGRESS',
                    WaiterID: '3',
                    PeopleNum: 2
                });
                console.log(r);
                done();
            })
            .catch(function (e) {
                throw new Error(e);
            });
    });

    it('餐桌table方法测试', function (done) {
        co(function* () {
                var r = yield table_model.table();
                expect(r).to.be.a('array');
                done();
            })
            .catch(function (e) {
                throw new Error(e);
            });
    });

    it('餐桌oneTable方法测试', function (done) {
        co(function* () {
                var r = yield table_model.oneTable('1');
                expect(r).to.be.a('array');
                done();
            })
            .catch(function (e) {
                throw new Error(e);
            });
    });

    it('餐桌busBoy方法测试', function (done) {
        co(function* () {
                var r = yield table_model.busBoy('1');
                expect(r).to.be.a('array');
                done();
            })
            .catch(function (e) {
                throw new Error(e);
            });
    });

    it('餐桌cleanup方法测试', function (done) {
        co(function* () {
                var r = yield table_model.cleanup('1');
                expect(r).to.be.a('array');
                done();
            })
            .catch(function (e) {
                throw new Error(e);
            });
    });

    it('餐桌cleanup_方法测试', function (done) {
        co(function* () {
                var r = yield table_model.cleanup_('1');
                expect(r).to.be.a('array');
                done();
            })
            .catch(function (e) {
                throw new Error(e);
            });
    });

});