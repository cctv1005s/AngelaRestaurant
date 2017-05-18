var expect = require('chai').expect;
var co = require('co');
var model_user = require('../proxy/user.js');
require('co-mocha');

describe('用户model的测试', function () {
    it('findByID方法测试', function*(done) {
        var r = yield model_user.findByID('1');
    });

    it('findByAccount方法测试', function*() {
        var r = yield model_user.findByAccount('1');
    });

    it('add方法测试', function*() {
        var r = yield model_user.add({
            ID: '1',
            Account: 'Account',
            Password: 'Password',
            AccessToken: '1'
        });
    });
});