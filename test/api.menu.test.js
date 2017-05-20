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

    it('菜单addType,updateType,deleteType接口测试', function* () {
        const a = yield request.post('/api/v1/menu/type/add')
            .send({
                ClassName: 'test1',
                ClassDescription: 'test',
                Token: 'H14WnStlb'
            });
        var typeID = a.body.data.message;
        expect(a.body.success).to.be.equal(true);

        const u = yield request.post('/api/v1/menu/type/update')
            .send({
                ID: typeID,
                ClassName: 'test',
                ClassDescription: shortid.generate(),
                Token: 'H14WnStlb'
            });
            console.log(u.body);
            console.log(typeID);
        expect(u.body.success).to.be.equal(true);

        const d = yield request.post('/api/v1/menu/type/delete')
            .send({ ID: typeID, Token: 'H14WnStlb' });
        expect(d.body.success).to.be.equal(true);
    });

    it('菜单addDish,updateDish,stopDish,deleteDish接口测试', function* () {
        const a = yield request.post('/api/v1/menu/dish/add')
            .send({
                Description: 'test',
                ClassID: '2',
                Price: 100,
                Name: 'test',
                Token: 'H14WnStlb'
            });
        var dishID = a.body.data.message;
        expect(a.body.success).to.be.equal(true);

        const u = yield request.post('/api/v1/menu/dish/update')
            .send({
                ID: dishID,
                Description: 'test',
                ClassID: '1',
                Price: 1000,
                Name: 'test',
                Token: 'H14WnStlb'
            });
        expect(u.body.success).to.be.equal(true);

        const s = yield request.post('/api/v1/menu/dish/stop')
            .send({ ID: dishID, Token: 'H14WnStlb' });
        expect(s.body.success).to.be.equal(true);

        const d = yield request.post('/api/v1/menu/dish/delete')
            .send({ ID: dishID, Token: 'H14WnStlb' });
        expect(d.body.success).to.be.equal(true);
    });

});