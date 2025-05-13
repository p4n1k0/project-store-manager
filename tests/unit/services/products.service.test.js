const { expect } = require('chai');
const sinon = require('sinon');
const services = require('../../../src/services');
const models = require('../../../src/models');
const { dataMock } = require('../mocks/products.model.mock')

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

  it('Retorno de produto excluído pelo id existente', async () => {
    sinon.stub(models.products, 'deleteProductById').resolves({ affectedRows: 1 });

    const { type, message } = await services.products.deleteProductById(1);

    expect(type).to.eq(null);
    expect(message.affectedRows).to.eq(1)
  });

  it('Encontra produto pelo nome caso ele exista', async () => {
    searchResult = { id: 1, name: "Martelo de Thor" };
    sinon.stub(models.products, 'getBySearchTerm').resolves(searchResult);

    const result = await services.products.getBySearchTerm('martelo');

    expect(result).to.equal(searchResult);
  });


  afterEach(() => {
    sinon.restore();
  });
});
