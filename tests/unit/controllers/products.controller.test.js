const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../../../src/app');
const connection = require('../../../src/models/connection');
const { dataMock } = require('../mocks/products.model.mock');
const service = require('../../../src/services');
const controller = require('../../../src/controllers');

const { expect } = chai;

chai.use(chaiHttp);

describe('Testa camada controller da aplicação produtos', () => {
  it('Testa se todos os produtos estão na lista', async () => {
    sinon.stub(connection, 'execute').resolves([[dataMock]]);

    const data = await chai.request(app).get('/products').send();

    expect(data.status).to.be.deep.eq(200);
  });

  it('Testa se é possível buscar produto pelo id', async () => {
    sinon.stub(connection, 'execute').resolves([[dataMock[0]]]);

    const data = await chai.request(app).get('/products/1').send();

    expect(data.status).to.be.deep.eq(200);
  });

  it('Testa busca de um id inválido', async () => {
    sinon.stub(connection, 'execute').resolves([dataMock[0]]).onSecondCall().resolves([dataMock]);

    const data = await chai.request(app).get('/products/666').send();

    expect(data.status).to.be.deep.eq(404);
    expect(data.body).to.be.deep.eq({ message: 'Product not found' });
  });

  it('Testa se produto tem nome', async () => {
    sinon.stub(connection, 'execute').resolves([{ id: 4, name: 'test077' }]);

    const data = await chai.request(app).post('/products').send({ name: '' });

    expect(data.status).to.be.deep.eq(400);
    expect(data.body).to.be.deep.eq({ message: '"name" is required' });
  });

  it('Testa tamanho de caracteres do nome do produto', async () => {
    sinon.stub(connection, 'execute').resolves([{ id: 4, name: 'test04' }]);

    const data = await chai.request(app).post('/products').send({ name: 'test' });

    expect(data.status).to.be.deep.eq(422);
    expect(data.body).to.be.deep.eq({ message: '"name" length must be at least 5 characters long' });
  });

  it('Testa se é possível adicionar um produto', async () => {
    sinon.stub(connection, 'execute').resolves([{ id: 4, name: 'test04' }]);

    const data = await chai.request(app).post('/products').send({ id: 4, name: 'test04' });

    expect(data.status).to.be.deep.eq(201);
    expect(data.body).to.be.deep.eq({ name: 'test04' });
  });

  it('Erro ao atualizar produto por ID inexistente', async () => {
    sinon.stub(connection, 'execute').resolves([[dataMock[3]]]);

    const data = await chai.request(app).put('/products/4').send({ name: 'testUpdate' });

    expect(data.status).to.be.deep.eq(404);
    expect(data.body).to.be.deep.eq({ message: 'Product not found' });
  });

  it('Atualizando um produto por ID', async () => {
    sinon.stub(connection, 'execute').resolves([[dataMock[0]]]);

    const data = await chai.request(app).put('/products/1').send({ name: 'testUpdate' });

    expect(data.status).to.be.deep.eq(200);
    expect(data.body).to.be.deep.eq({ name: 'testUpdate' });
  });

  it('Tenta exluir produto com id inexistente', async () => {
    sinon.stub(connection, 'execute').resolves([[dataMock[3]]]);

    const data = await chai.request(app).delete('/products/4').send();

    expect(data.status).to.be.deep.eq(404);
    expect(data.body).to.be.deep.eq({ message: 'Product not found' });
  });

  it('Exclusão de produto pelo ID com sucesso', async () => {
    sinon.stub(connection, 'execute').resolves([[dataMock[0]]]);

    const data = await chai.request(app).delete('/products/1').send();

    expect(data.status).to.be.deep.eq(204);
  });

  it('Buscando produto por letra', async () => {
    const res = {};
    const req = { query: { q: "Martelo" } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(dataMock[0]);

    sinon.stub(service.products, 'getBySearchTerm').resolves(dataMock[0]);

    await controller.products.getBySearchTerm(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, dataMock[0]);
  });

  afterEach(() => {
    sinon.restore();
  });
});
