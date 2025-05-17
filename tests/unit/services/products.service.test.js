const { expect } = require('chai');
const sinon = require('sinon');
const services = require('../../../src/services');
const models = require('../../../src/models');
const { dataMock } = require('../mocks/products.model.mock')

describe('Testa da camada service de productos', () => {
  it('Buscando todos os produtos', async () => {
    sinon.stub(models.products, 'findAll').resolves(dataMock);

    const data = await services.products.findAll();

    expect(data).to.be.deep.eq(dataMock);
  });

  it('Buscando produto pelo id', async () => {
    sinon.stub(models.products, 'findById').resolves(dataMock[0]);

    const data = await services.products.findById(1);

    expect(data).to.be.deep.eq(dataMock[0]);
  });

  it('Retorno de erro caso não exista o produto pelo id', async () => {
    sinon.stub(models.products, 'findById').resolves([]);

    try {
      await services.products.findById(999);
    } catch (error) {
      expect(error.message).to.be.deep.eq('Product not found');
    }
  });

  it('Falha ao cadastrar nome com menos de 5 caracteres', async () => {
    sinon.stub(models.products, 'newProduct').resolves({ id: 4, name: 'test' });

    const data = await services.products.newProduct('test');

    expect(data.type).to.be.deep.eq(422);
    expect(data.message).to.be.deep.eq('"name" length must be at least 5 characters long');
  });

  it('Testa se há algum nome', async () => {
    sinon.stub(models.products, 'newProduct').resolves({ id: 4, name: undefined });

    const data = await services.products.newProduct(undefined);

    expect(data.type).to.be.deep.eq(400);
    expect(data.message).to.be.deep.eq('"name" is required');
  });

  it('Testa se está tudo ok com o cadastro do novo produto', async () => {
    sinon.stub(models.products, 'newProduct').resolves({ id: 4, name: 'test04' });

    const data = await services.products.newProduct('test04');

    expect(data).to.be.deep.eq({ id: 4, name: 'test04' });
  });

  it('Retorno de erro ao tentar atualizar produto sem nome', async () => {
    sinon.stub(models.products, 'updateProducts').resolves(undefined);

    const data = await services.products.updateProducts();

    expect(data.type).to.be.deep.eq(400);
    expect(data.message).to.be.deep.eq('"name" is required');
  });

  it('Retorno de produto excluído pelo id existente', async () => {
    sinon.stub(models.products, 'deleteProductById').resolves({ affectedRows: 1 });

    const { type, message } = await services.products.deleteProductById(1);

    expect(type).to.be.deep.eq(null);
    expect(message.affectedRows).to.be.deep.eq(1)
  });

  it('Encontra produto pelo nome caso ele exista', async () => {
    sinon.stub(models.products, 'getBySearchTerm').resolves(dataMock[0]);

    const data = await services.products.getBySearchTerm('martelo');

    expect(data).to.be.deep.eq(dataMock[0]);
  });

  afterEach(() => {
    sinon.restore();
  });
});
