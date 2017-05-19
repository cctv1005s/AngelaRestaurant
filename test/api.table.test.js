const app = require('../app.js');
const request = require('co-supertest').agent(app.listen());
const should = require('chai').should;
const expect = require('chai').expect;
require('co-mocha');

describe('餐桌api测试', () => {

    it('餐桌bind接口测试', function* () {
        const r = yield request.post('/api/v1/table/5/bind')
            .send({ AccessToken: 'BJ8R2j0yb', PeopleNum: '2', Token: 'r1YVGX3yW' });
        expect(r.body.success).to.be.equal(true);
    });

    it('餐桌table接口测试', function* () {
        const r = yield request.get('/api/v1/table');
        expect(r.body.success).to.be.equal(true);
    });

    it('餐桌oneTable接口测试', function* () {
        const r = yield request.get('/api/v1/table/1');
        expect(r.body.success).to.be.equal(true);
    });

    it('餐桌cleanup接口测试', function* () {
        const r = yield request.post('/api/v1/table/cleanup')
            .send({ TableID: '5', Token: 'r1YVGX3yW' });
        expect(r.body.success).to.be.equal(true);
    });
});