const { expect } = require('chai');
const sinon = require('sinon');
const services = require('../../../src/services');
const models = require('../../../src/models');
const { dataMock, dataMockId } = require('../mocks/products.model.mock')

describe('Testa da camada service de productos', () => {
  it('Testa se é possível buscar todos os produtos', async () => {
    sinon.stub(models.products, 'findAll').resolves(dataMock);

    const data = await services.products.findAll();

    expect(data).to.deep.equal(dataMock);
  });

  it('Testa se é possivel buscar produto pelo id', async () => {
    sinon.stub(models.products, 'findById').resolves(dataMock[0]);

    const id = 1;
    const data = await services.products.findById(id);

    expect(data).to.deep.equal(dataMockId[0]);
  });

  it('Testa se falha ao cadastrar nome com menos de 5 caracteres', async () => {
    const name = 'test'
    const data = await services.products.newProduct(name);

    expect(data).to.deep.equal({ type: 422, message: '"name" length must be at least 5 characters long' });
  });

  it('Testa se há algum nome', async () => {
    const name = undefined;
    const data = await services.products.newProduct(name);

    expect(data).to.deep.equal({ type: 400, message: '"name" is required' });
  });

  it('Testa se está tudo ok com o cadastro do novo produto', async () => {
    sinon.stub(models.products, 'newProduct').resolves({ id: 4, name: 'test04' });

    const name = 'test04'
    const data = await services.products.newProduct(name);

    expect(data).to.deep.equal({ id: 4, name: 'test04' });
  });

  afterEach(() => {
    sinon.restore();
  });
});

describe('Testa se é possivel atualizar produto', () => {
  it('Testa se falha ao cadastrar nome com menos de 5 caracteres', async () => {
    const id = 1;
    const name = 'test';
    const data = await services.products.updateProducts(id, name);

    expect(data).to.deep.equal({ type: 422, message: '"name" length must be at least 5 characters long' });
  });
  
  it('Testa se há algum nome', async () => {
    const id = 1;
    const name = undefined;
    const data = await services.products.updateProducts(id, name);

    expect(data).to.deep.equal({ type: 400, message: '"name" is required' });
  });

  it('Testa se há o id para atualização', async () => {
    const id = 666;
    const name = 'test666';
    const data = await services.products.updateProducts(id, name);

    expect(data).to.deep.equal({ type: 404, message: 'Product not found' });
  });

  it('Testa se está tudo ok com o cadastro do novo produto', async () => {
    sinon.stub(models.products, 'updateProducts').resolves({ id: 1, name: 'updateTest' });

    const id = 1;
    const name = 'updateTest';
    const data = await services.products.updateProducts(id, name);

    expect(data).to.deep.equal({ id: 1, name: 'updateTest' });
  });

  afterEach(() => {
    sinon.restore();
  });

  afterEach(() => {
    sinon.restore();
  });
});

