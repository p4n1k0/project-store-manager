const sinon = require('sinon');
const { dataMock, dataMockId } = require('./mocks/products.model.mock');
const connection = require('../../../src/models/connection');
const index = require('../../../src/models/index');
const { expect } = require('chai');
const models = require('../../../src/models/products.model')/

describe('Testa camada model da aplicação', () => {
  it('Testa se todos os produtos estão na lista', async () => {
    sinon.stub(connection, 'execute').resolves([dataMock]);

    const data = await models.findAll();

    expect(data).to.deep.equal(dataMock);
  });

  it('Testa se é possível buscar produto pelo id', async () => {
    sinon.stub(connection, 'execute').resolves.apply([[dataMockId]]);

    const data = await models.findById(1);

    expect(data).to.deep.equal(dataMockId);
  });
  afterEach(sinon.restore);
})