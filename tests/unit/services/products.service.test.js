const { expect } = require('chai');
const sinon = require('sinon');
const services = require('../../../src/services');
const models = require('../../../src/models');

describe('1 - Testa da camada service de productos', () => {
  it('retorno de erro ao tentar atualizar produto sem nome', async () => {
    sinon.stub(models.products, 'updateProducts').resolves(undefined);

    const data = await services.products.updateProducts();

    expect(data.type).to.be.deep.eq(400);
    expect(data.message).to.be.deep.eq('"name" is required');
  });

  afterEach(() => {
    sinon.restore();
  });
});
