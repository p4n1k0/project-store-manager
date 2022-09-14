const { expect } = require('chai');
const sinon = require('sinon');
const models = require('../../../src/models');
const { dataMock, dataMockId } = require('../mocks/products.model.mock');
const connection = require('../../../src/models/connection');

describe('Testa camada model de produtos', () => {
  it('Testa se é possível buscar todos os produtos', async () => {
    sinon.stub(connection, 'execute').resolves([dataMock]);

    const data = await models.products.findAll();

    expect(data).to.deep.equal(dataMockId);
  });

  it('Testa se é possível buscar produto pelo id', async () => {
    sinon.stub(connection, 'execute').resolves([[dataMockId[0]]]);

    const data = await models.products.findById();

    expect(data).to.deep.equal(dataMockId[0]);
  });

  it('Testa se é possível inserir um novo produto', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const data = await models.products.newProduct('name04');

    expect(data).to.be.deep.equal({ id: 4, name: 'name04' });
  });

  it('Testa se é possível atualizar produto', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 2 }]);

    const data = await models.products.updateProducts(3, 'nameTest');
  });
  afterEach(sinon.restore);
});
