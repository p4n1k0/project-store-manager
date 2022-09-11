const sinon = require('sinon');
const index = require('../../../src/controllers/index');
const { dataMock, dataMockId } = require('./mocks/products.controller.mock');
const { services } = require('../../../src/services/products.service');
const { controllers } = require('../../../src/controllers/products.controller');

describe('Testa camada controller da aplicação', () => {
  it('Testa se todos os produtos estão na lista', async () => {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(services, 'findAll').resolves(dataMock);

    await controllers.findAll(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, dataMock);
  });

  it('Testa se é possível buscar produto pelo id', async () => {
    const res = {};
    const req = { params: 1 };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(services, 'findById').resolves({ type: null, messsage: dataMockId });

    await controllers.findById(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, dataMockId);
  });

  it('Testa busca de um id inválido', async () => {
    const res = {};
    const req = { params: 666 };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(services, 'findById').resolves({ type: 'INVALID_ID', message: 'Product not found' });

    await controllers.findById(req, res);

    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledWith(res.json, { message: 'Product not found' });
  });
  afterEach(sinon.restore);
});
