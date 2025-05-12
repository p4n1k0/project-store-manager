const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../../src/app');
const connection = require('../../../src/models/connection');
const { dataMock, dataMockId } = require('../mocks/products.model.mock');

describe('Testa camada controller da aplicação', () => {
  it('Testa se todos os produtos estão na lista', async () => {
    sinon.stub(connection, 'execute').resolves([[dataMock]]);

    const data = await chai.request(app).get('/products').send();

    expect(data.status).to.be.eq(200);
  });

  it('Testa se é possível buscar produto pelo id', async () => {
    sinon.stub(connection, 'execute').resolves([[dataMock[0]]]);

    const data = await chai.request(app).get('/products/1').send();

    expect(data.status).to.be.eq(200);
  });

  it('Testa busca de um id inválido', async () => {
    sinon.stub(connection, 'execute').resolves([dataMock[0]]).onSecondCall().resolves([dataMock]);

    const data = await chai.request(app).get('/products/666').send();

    expect(data.status).to.be.eq(404);
    expect(data.body).to.be.deep.eq({ message: 'Product not found' });
  });

  it('Testa se produto tem nome', async () => {
    sinon.stub(connection, 'execute').resolves([{ id: 4, name: 'test077' }]);

    const data = await chai.request(app).post('/products').send({ name: '' });

    expect(data.status).to.be.eq(400);
    expect(data.body).to.be.deep.eq({ message: '"name" is required' });
  });

  it('Testa tamanho de caracteres do nome do produto', async () => {
    sinon.stub(connection, 'execute').resolves([{ id: 4, name: 'test04' }]);

    const data = await chai.request(app).post('/products').send({ name: 'test' });

    expect(data.status).to.be.eq(422);
    expect(data.body).to.be.deep.eq({ message: '"name" length must be at least 5 characters long' });
  });

  it('Testa se é possível adicionar um produto', async () => {
    sinon.stub(connection, 'execute').resolves([{ id: 4, name: 'test04' }]);

    const data = await chai.request(app).post('/products').send({ id: 4, name: 'test04' });

    expect(data.status).to.be.eq(201);
    expect(data.body).to.be.deep.eq({ name: 'test04' });
  });
  afterEach(sinon.restore);
});
