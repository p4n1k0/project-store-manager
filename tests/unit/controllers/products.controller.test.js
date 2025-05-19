const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../../../src/app');
const connection = require('../../../src/models/connection');
const { dataMock } = require('../mocks/products.model.mock');

const { expect } = chai;

chai.use(chaiHttp);

describe('2 - Testa camada controller de produtos', () => {
  it('retorna todos os produtos da lista', async () => {
    sinon.stub(connection, 'execute').resolves([[dataMock]]);

    const data = await chai.request(app).get('/products').send();

    expect(data.status).to.be.deep.eq(200);
    expect(data.body).to.be.deep.eq([dataMock]);
  });

  it('busca produto pelo id', async () => {
    sinon.stub(connection, 'execute').resolves([[dataMock[0]]]);

    const data = await chai.request(app).get('/products/1').send();

    expect(data.status).to.be.deep.eq(200);
    expect(data.body).to.be.deep.eq(dataMock[0]);
  });

  it('busca de um id inválido', async () => {
    sinon.stub(connection, 'execute').resolves([dataMock[0]]).onSecondCall().resolves([dataMock]);

    const data = await chai.request(app).get('/products/4').send();

    expect(data.status).to.be.deep.eq(404);
    expect(data.body).to.be.deep.eq({ message: 'Product not found' });
  });

  it('erro de tamanho de caracteres do nome do produto', async () => {
    sinon.stub(connection, 'execute').resolves([{ id: 4, name: 'test04' }]);

    const data = await chai.request(app).post('/products').send({ name: 'test' });

    expect(data.status).to.be.deep.eq(422);
    expect(data.body).to.be.deep.eq({ message: '"name" length must be at least 5 characters long' });
  });

  it('cadastra um produto', async () => {
    sinon.stub(connection, 'execute').resolves([{ id: 4, name: 'test04' }]);

    const data = await chai.request(app).post('/products').send({ name: 'test04' });

    expect(data.status).to.be.deep.eq(201);
    expect(data.body).to.be.deep.eq({ name: 'test04' });
  });

  it('erro ao atualizar produto por ID inexistente', async () => {
    sinon.stub(connection, 'execute').resolves([[dataMock[3]]]);

    const data = await chai.request(app).put('/products/4').send({ name: 'testUpdate' });

    expect(data.status).to.be.deep.eq(404);
    expect(data.body).to.be.deep.eq({ message: 'Product not found' });
  });

  it('atualizando um produto por ID', async () => {
    sinon.stub(connection, 'execute').resolves([[dataMock[0]]]);

    const data = await chai.request(app).put('/products/1').send({ name: 'testUpdate' });

    expect(data.status).to.be.deep.eq(200);
    expect(data.body).to.be.deep.eq({ name: 'testUpdate' });
  });

  it('tenta exluir produto com id inexistente', async () => {
    sinon.stub(connection, 'execute').resolves([[dataMock[3]]]);

    const data = await chai.request(app).delete('/products/4').send();

    expect(data.status).to.be.deep.eq(404);
    expect(data.body).to.be.deep.eq({ message: 'Product not found' });
  });

  it('exclusão de produto pelo ID com sucesso', async () => {
    sinon.stub(connection, 'execute').resolves([[dataMock[0]]]);

    const data = await chai.request(app).delete('/products/1').send();

    expect(data.status).to.be.deep.eq(204);
    expect(data.body).to.be.deep.eq({});
  });

  it('buscando produto por letra', async () => {
    sinon.stub(connection, 'execute').resolves([dataMock[0]]);

    const data = await chai.request(app).get('/products/search').send({ query: { q: 'martelo' } });

    expect(data.status).to.be.deep.eq(200);
    expect(data.body).to.be.deep.eq(dataMock[0]);
  });

  afterEach(() => {
    sinon.restore();
  });
});
