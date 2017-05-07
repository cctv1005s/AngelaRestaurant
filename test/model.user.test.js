var expect = require('chai').expect;
var co = require('co');
var model_user = require('../proxy/user.js');

describe('用户model的测试', function () {
    it('findByID方法测试', function (done) {
        co(function* () {
                var r = yield model_user.findByID('1');
                console.log(r);
                done();
            })
            .catch(function (e) {
                throw new Error(e);
            });
    });


    it('findByAccount方法测试', function (done) {
        co(function* () {
                var r = yield model_user.findByAccount('1');
                console.log(r);
                done();
            })
            .catch(function (e) {
                throw new Error(e);
            });
    });


    it('add方法测试', function (done) {
        co(function* () {
                var r = yield model_user.add({
                    ID: '1',
                    Account: 'Account',
                    Password: 'Password',
                    AccessToken: '1'
                });
                console.log(r);
                done();
            })
            .catch(function (e) {
                throw new Error(e);
            });
    });

});