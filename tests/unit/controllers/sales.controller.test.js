const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../../../src/app');
const connection = require('../../../src/models/connection');
const services = require('../../../src/services')
const controllers = require('../../../src/controllers');
const { allSales } = require('../mocks/sales.model.mock');

const { expect } = chai;

chai.use(chaiHttp);


describe('Testa camada controller de vendas', () => {
    it('Retorno Ok ao cadastrar uma venda', async () => {
        const req = {};
        const res = {};

        req.body = { name: 'ProdutoX' };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(services.sales, 'newSale').resolves({ id: 4, name: 'ProdutoX' });

        await controllers.sales.newSale(req, res);

        expect(res.json.args[0]).to.deep.equal([{ id: 4, name: 'ProdutoX' }]);
    });

    it('Retorna todas as vendas', async () => {
        sinon.stub(connection, 'execute').resolves([[allSales]]);

        const data = await chai.request(app).get('/sales').send();

        expect(data.status).to.be.deep.eq(200);
    });

    it('Buscando venda pelo id', async () => {
        sinon.stub(connection, 'execute').resolves([[allSales[0]]]);

        const data = await chai.request(app).get('/sales/1').send();

        expect(data.status).to.be.deep.eq(200);
    });

    it('Erro ao buscar venda pelo id inválido', async () => {
        sinon.stub(connection, 'execute').resolves([allSales[0]]).onSecondCall().resolves([allSales]);

        const data = await chai.request(app).get('/sales/999').send();

        expect(data.status).to.be.deep.eq(404);
        expect(data.body).to.be.deep.eq({ message: 'Sale not found' });
    });

    it('Erro ao buscar venda com produto inexistente', async () => {
        const req = {};
        const res = {};

        req.params = { id: 19 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(services.sales, 'findSaleById').resolves({ message: 'Product not found' });

        await controllers.sales.findSaleById(req, res);

        expect(res.json.args[0]).to.deep.eq(['Product not found']);
    });

    it('Deletando venda caso ela existe', async () => {
        sinon.stub(connection, 'execute').resolves([[allSales[0]]]);

        const data = await chai.request(app).delete('/sales/1').send();

        expect(data.status).to.be.deep.eq(204);
    });

    it('Erro ao deletar uma venda pelo id inexistente', async () => {
        sinon.stub(connection, 'execute').resolves([[allSales[5]]]);

        const data = await chai.request(app).delete('/sales/4').send();

        expect(data.status).to.be.deep.eq(404);
        expect(data.body).to.be.deep.eq({ message: 'Sale not found' });
    });



    afterEach(() => {
        sinon.restore();
    });
})
