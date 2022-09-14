const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../../src/app');
const connection = require('../../../src/models/connection');
const { dataMock } = require('../mocks/products.model.mock');

describe('Testa camada controller da aplicação', () => {
  it('Testa se todos os produtos estão na lista', async () => {
    sinon.stub(connection, 'execute').onFirstCall().resolves([[dataMock]]);

    const data = await chai.request(app).get('/products').send();

    expect(data.status).to.be.equal(200);
  });

  it('Testa se é possível buscar produto pelo id', async () => {
    sinon.stub(connection, 'execute').onFirstCall().resolves([[dataMock[0]]]);

    const data = await chai.request(app).get('/products/1').send();

    expect(data.status).to.be.equal(200);
  });

  it('Testa busca de um id inválido', async () => {
    sinon.stub(connection, 'execute').onFirstCall().resolves([dataMock[0]]).onSecondCall().resolves([dataMock]);

    const data = await chai.request(app).get('/products/666').send();

    expect(data.status).to.be.equal(404);
  });

  it('Testa tamanho de caracteres do nome do produto', async () => {
    sinon.stub(connection, 'execute').onFirstCall().resolves([{ id: 4, name: 'test04' }]);

    const data = await chai.request(app).post('/products').send({ name: 'test' });

    expect(data.status).to.be.equal(422);
    expect(data.body).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });

  it('Testa se é possível adicionar um produto', async () => {
    sinon.stub(connection, 'execute').onFirstCall().resolves([{ id: 4, name: 'test04' }]);

    const data = await chai.request(app).post('/products').send({ name: 'test04' });

    expect(data.status).to.be.equal(201);
    expect(data.body).to.be.deep.equal({ name: 'test04' });
  });
  afterEach(sinon.restore);
});
