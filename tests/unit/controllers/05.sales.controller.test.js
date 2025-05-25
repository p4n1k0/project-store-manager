const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../../../src/app');
const connection = require('../../../src/models/connection');
const services = require('../../../src/services')
const controllers = require('../../../src/controllers');
const { allSales, saleUpdate } = require('../mocks/sales.mock');

const { expect } = chai;

chai.use(chaiHttp);

describe('5 - Testa camada controller Sales', () => {
    it('erro ao criar venda sem produto', async () => {
        sinon.stub(services.sales, 'newSale').resolves({ type: 404, message: 'Product not found' });

        const data = await chai.request(app).post('/sales').send();

        expect(data.status).to.be.deep.eq(404);
        expect(data.body).to.be.deep.eq({ message: 'Product not found' });
    });

    it('retorno Ok ao cadastrar uma venda', async () => {
        sinon.stub(services.sales, 'newSale').resolves({ id: 4, name: 'ProdutoX' });

        const data = await chai.request(app).post('/sales').send();

        expect(data.status).to.be.deep.eq(201);
        expect(data.body).to.be.deep.eq({ id: 4, name: 'ProdutoX' });
    });

    it('retorna todas as vendas', async () => {
        sinon.stub(connection, 'execute').resolves([[allSales]]);

        const data = await chai.request(app).get('/sales').send();

        expect(data.status).to.be.deep.eq(200);
        expect(data.body).to.be.deep.eq([allSales]);
    });

    it('buscando venda pelo id', async () => {
        sinon.stub(connection, 'execute').resolves([[allSales[0]]]);

        const data = await chai.request(app).get('/sales/:id').send();

        expect(data.status).to.be.deep.eq(200);
    });

    it('erro ao buscar venda pelo id inválido', async () => {
        sinon.stub(connection, 'execute').resolves([allSales[0]]);

        const data = await chai.request(app).get('/sales/:id').send();

        expect(data.status).to.be.deep.eq(404);
        expect(data.body).to.be.deep.eq({ message: 'Sale not found' });
    });

    it('erro ao buscar venda com produto inexistente', async () => {
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(services.sales, 'findSaleById').resolves({ message: 'Product not found' });

        await controllers.sales.findSaleById({ params: { id: 19 } }, res);
       
        expect(res.json.args[0]).to.be.deep.eq(['Product not found']);
    });

    it('realizando a busca inválida de uma venda específica', async () => {
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(services.sales, 'findSaleById').resolves({ type: 404, message: 'Sale not found' });

        await controllers.sales.findSaleById({ params: { id: 1 } }, res);

        sinon.assert.calledWith(res.status, 404);
        sinon.assert.calledWith(res.json, { message: 'Sale not found' });
    });

    it('validação EditProduct', async () => {
        sinon.stub(services.sales, 'updateSale').resolves(saleUpdate);

        const data = await chai.request(app).put('/sales/1').send(saleUpdate);

        expect(data.status).to.be.deep.eq(200);
        expect(data.body).to.be.deep.eq({ saleId: '1', itemsUpdated: saleUpdate });
    });

    it('validação EditProduct id 100', async () => {        
        sinon.stub(services.sales, 'updateSale').resolves({ type: 404, message: 'Product not found' })

        const data = await chai.request(app).put('/sales/:id').send();

        expect(data.status).to.be.deep.eq(404);
        expect(data.body).to.be.deep.eq({ message: 'Product not found' });
    });

    it('deletando venda caso ela existe', async () => {
        sinon.stub(connection, 'execute').resolves([[allSales[0]]]);

        const data = await chai.request(app).delete('/sales/:id').send();

        expect(data.status).to.be.deep.eq(204);
        expect(data.body).to.be.deep.eq({});
    });

    it('erro ao deletar uma venda pelo id inexistente', async () => {
        sinon.stub(connection, 'execute').resolves([[allSales[3]]]);

        const data = await chai.request(app).delete('/sales/:id').send();

        expect(data.status).to.be.deep.eq(404);
        expect(data.body).to.be.deep.eq({ message: 'Sale not found' });
    });

    afterEach(() => {
        sinon.restore();
    });
});
