const { expect } = require('chai');
const sinon = require('sinon');
const services = require('../../../src/services');
const models = require('../../../src/models');
const { dataMock, dataMockId } = require('../mocks/products.model.mock')

describe('Testa da camada service de productos', () => {
  it('Testa se é possível buscar todos os produtos', async () => {
    sinon.stub(models.products, 'findAll').resolves(dataMock);

    const data = await services.products.findAll();

    expect(data).to.deep.eq(dataMock);
  });

  it('Testa se é possivel buscar produto pelo id', async () => {
    sinon.stub(models.products, 'findById').resolves(dataMock[0]);

    const data = await services.products.findById(1);

    expect(data).to.deep.eq(dataMock[0]);
  });

  it('Testa retorno de erro caso não exista o produto pelo id', async () => {
    sinon.stub(models.products, 'findById').resolves([]);

    try {
      await services.products.findById(999);      
    } catch (error) {
      expect(error.message).to.eq('Product not found');      
    }
  });

  it('Testa se falha ao cadastrar nome com menos de 5 caracteres', async () => {
    const data = await services.products.newProduct('test');

    expect(data).to.deep.eq({ type: 422, message: '"name" length must be at least 5 characters long' });
  });

  it('Testa se há algum nome', async () => {
    const data = await services.products.newProduct(undefined);

    expect(data).to.deep.eq({ type: 400, message: '"name" is required' });
  });

  it('Testa se está tudo ok com o cadastro do novo produto', async () => {
    sinon.stub(models.products, 'newProduct').resolves({ id: 4, name: 'test04' });

    const data = await services.products.newProduct('test04');

    expect(data).to.deep.eq({ id: 4, name: 'test04' });
  });

  afterEach(() => {
    sinon.restore();
  });
});


describe('Testa se é possivel atualizar produto', () => {
  it('Testa se falha ao cadastrar nome com menos de 5 caracteres', async () => {
    const data = await services.products.updateProducts(1, 'test');

    expect(data).to.deep.eq({ type: 422, message: '"name" length must be at least 5 characters long' });
  });

  it('Testa se há algum nome', async () => {
    const data = await services.products.updateProducts(1, undefined);

    expect(data).to.deep.eq({ type: 400, message: '"name" is required' });
  });

  it('Testa se há o id para atualização', async () => {
    const data = await services.products.updateProducts(666, 'test666');

    expect(data).to.deep.eq({ type: 404, message: 'Product not found' });
  });

  it('Testa se está tudo ok com o cadastro do novo produto', async () => {
    sinon.stub(models.products, 'updateProducts').resolves({ id: 1, name: 'updateTest' });

    const data = await services.products.updateProducts(1, 'updateTest');

    expect(data).to.deep.eq({ id: 1, name: 'updateTest' });
  });

  afterEach(() => {
    sinon.restore();
  });
});
