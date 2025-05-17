const { expect } = require('chai');
const sinon = require('sinon');
const models = require('../../../src/models');
const { dataMock } = require('../mocks/products.model.mock');
const connection = require('../../../src/models/connection');

describe('Testa camada model de produtos', () => {
  it('Buscando todos os produtos', async () => {
    sinon.stub(connection, 'execute').resolves([dataMock]);

    const data = await models.products.findAll();

    expect(data).to.be.deep.eq(dataMock);
  });


  it('Buscando produto pelo id', async () => {
    sinon.stub(connection, 'execute').resolves([[dataMock[0]]]);

    const data = await models.products.findById(1);

    expect(data).to.be.deep.eq(dataMock[0]);
  });

  it('Inserindo um novo produto', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const data = await models.products.newProduct('name04');

    expect(data).to.be.deep.eq({ id: 4, name: 'name04' });
  });

  it('Atualizando produto', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 2 }]);

    const data = await models.products.updateProducts(2, 'nameTest');

    expect(data).to.be.deep.eq({ id: 2, name: 'nameTest' });
  });

  it('Retorno correto de busca pelo nome do produto', async () => {
    sinon.stub(connection, 'execute').resolves([[dataMock[0]]]);

    const [data] = await models.products.getBySearchTerm('martelo');

    expect(data).to.be.deep.eq(dataMock[0]);
  });

  it('Exclusão de produto pelo id', async () => {
    sinon.stub(connection, 'execute').resolves([[{ affectedRows: 1 }]]);

    const [data] = await models.products.deleteProductById(1);

    expect(data.affectedRows).to.be.deep.eq(1);
  });

  afterEach(() => {
    sinon.restore();
  });
});
