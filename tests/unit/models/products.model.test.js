const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { findAll, findById } = require('../../../src/models/products.model');
const { dataMock } = require('./mocks/products.mock');

describe('Testa se as rotas dos produtos estão trabalhando', () => {
  it('Testa se é retornado todos os produtodos do banco de dados', async () => {
    sinon.stub(connection, 'execute').resolves([dataMock]);

    const data = await findAll();

    expect(data).equals(dataMock);
  });
  it('Testa se é possível buscar produto pelo id', async () => {
    sinon.stub(connection, 'execute').resolves([dataMock[0]]);

    const data = await findById(1);

    expect(data).equals(dataMock[0]);
  });
  afterEach(sinon.stub);
});
