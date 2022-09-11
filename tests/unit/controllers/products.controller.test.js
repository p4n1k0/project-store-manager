const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { dataMock, dataMockId } = require('./mocks/products.mocks');
const { services } = require('../../../src/services');
const { controllers } = require('../../../src/controllers');

describe('Testa 5% da camada de aplicação', () => {
  afterEach(sinon.restore);

  it('Testa se todos os produtos estão na lista', async () => {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(services, 'findAll').resolves({ type: null, message: dataMock });

    await controllers.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(dataMock);
  });

  it('Testa se é possível buscar produto pelo id', async () => {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(services, 'findById').resolves({ type: null, messsage: dataMockId });

    await controllers.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(dataMockId);
  });

  it('Testa busca de um id inválido', async () => {
    const res = {};
    const req = { params: { id: 666 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(services, 'findById').resolves({ type: 'NOT FOUND', message: 'Product not found' });

    await controllers.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});
