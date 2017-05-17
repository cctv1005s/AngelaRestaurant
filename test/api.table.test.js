const app = require('../app.js');
const request = require('co-supertest').agent(app.listen());
const should = require('chai').should;
const expect = require('chai').expect;
require('co-mocha');

describe('餐桌api测试', () => {

    it('餐桌bind接口测试', function* () {
        const r = yield request.post('/api/v1/table/5/bind')
            .send({ AccessToken: '1', PeopleNum: '2' });
        expect(r).to.be.a('object');
    });

    it('餐桌table接口测试', function* () {
        const r = yield request.get('/api/v1/table');
        expect(r).to.be.a('object');
    });

    it('餐桌oneTable接口测试', function* () {
        const r = yield request.get('/api/v1/table/1');
        expect(r).to.be.a('object');
    });

    it('餐桌cleanup接口测试', function* () {
        const r = yield request.post('/api/v1/table/cleanup')
            .send({ TableID: '1' });
        expect(r).to.be.a('object');
    });
});