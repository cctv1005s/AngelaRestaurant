const app = require('../app.js');
const request = require('co-supertest').agent(app.listen());
const should = require('chai').should;
const expect = require('chai').expect;
require('co-mocha');
var shortid = require('shortid');

describe('菜单api测试', () => {

    it('菜单type接口测试', function* () {
        const r = yield request.get('/api/v1/menu/type');
        expect(r.body.success).to.be.equal(true);
    });

    it('菜单oneType接口测试', function* () {
        const r = yield request.get('/api/v1/menu/type/1');
        expect(r.body.success).to.be.equal(true);
    });

    it('菜单oneDish接口测试', function* () {
        const r = yield request.get('/api/v1/menu/dish/1');
        expect(r.body.success).to.be.equal(true);
    });

    it('菜单addType接口测试', function* () {
        const r = yield request.post('/api/v1/menu/type/add')
            .send({
                ClassName: 'test1',
                ClassDescription: 'test',
                Token: 'H14WnStlb'
            });
        expect(r.body.success).to.be.equal(true);
    });

    it('菜单updateType接口测试', function* () {
        const r = yield request.post('/api/v1/menu/type/update')
            .send({
                ID: 'test',
                ClassName: 'test',
                ClassDescription: shortid.generate(),
                Token: 'H14WnStlb'
            });
        expect(r.body.success).to.be.equal(true);
    });

    it('菜单deleteType接口测试', function* () {
        const r = yield request.post('/api/v1/menu/type/delete')
            .send({ ID: 'test', Token: 'H14WnStlb' });
        expect(r.body.success).to.be.equal(true);
    });

    it('菜单addDish接口测试', function* () {
        const r = yield request.post('/api/v1/menu/dish/add')
            .send({
                Description: 'test',
                ClassID: '2',
                Price: 100,
                Name: 'test',
                Token: 'H14WnStlb'
            });
        expect(r.body.success).to.be.equal(true);
    });

    it('菜单updateDish接口测试', function* () {
        const r = yield request.post('/api/v1/menu/dish/update')
            .send({
                ID: 'test',
                Description: 'test',
                ClassID: '1',
                Price: 1000,
                Name: 'test',
                Token: 'H14WnStlb'
            });
        expect(r.body.success).to.be.equal(true);
    });


    it('菜单stopDish接口测试', function* () {
        const r = yield request.post('/api/v1/menu/dish/stop')
            .send({ ID: 'test', Token: 'H14WnStlb' });
        expect(r.body.success).to.be.equal(true);
    });

    it('菜单deleteDish接口测试', function* () {
        const r = yield request.post('/api/v1/menu/dish/delete')
            .send({ ID: 'test', Token: 'H14WnStlb' });
        expect(r.body.success).to.be.equal(true);
    });

});