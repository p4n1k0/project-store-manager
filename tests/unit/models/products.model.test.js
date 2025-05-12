const { expect } = require('chai');
const sinon = require('sinon');
const models = require('../../../src/models');
const { dataMock } = require('../mocks/products.model.mock');
const connection = require('../../../src/models/connection');

describe('Testa camada model de produtos', () => {
  it('Testa se é possível buscar todos os produtos', async () => {
    sinon.stub(connection, 'execute').resolves([dataMock]);

    const data = await models.products.findAll();

    expect(data).to.deep.eq(dataMock);
  });


  it('Testa se é possível buscar produto pelo id', async () => {
    sinon.stub(connection, 'execute').resolves([[dataMock[0]]]);

    const data = await models.products.findById(1);

    expect(data).to.deep.eq(dataMock[0]);
  });

  it('Testa se é possível inserir um novo produto', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const data = await models.products.newProduct('name04');

    expect(data).to.be.deep.eq({ id: 4, name: 'name04' });
  });

  it('Testa se é possível atualizar produto', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 2 }]);

    const data = await models.products.updateProducts(2, 'nameTest');

    expect(data).to.be.deep.eq({ id: 2, name: 'nameTest' });
  });

  it('Retorno correto de busca pelo nome do produto', async () => {
    sinon.stub(connection, "execute").resolves([[dataMock[0]]]);

    const [result] = await models.products.getBySearchTerm("martelo");

    expect(result).to.equal(dataMock[0]);
  });

  it('Exclusão de produto pelo id', async () => {
    sinon.stub(connection, "execute").resolves([[{ affectedRows: 1 }]]);

    const [result] = await models.products.deleteProductById(1);

    expect(result.affectedRows).to.equal(1);
  });

  afterEach(sinon.restore);
});
