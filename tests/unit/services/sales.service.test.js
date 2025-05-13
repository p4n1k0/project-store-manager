const { expect } = require('chai');
const sinon = require('sinon');
const services = require('../../../src/services');
const models = require('../../../src/models');
const { allSales } = require('../mocks/sales.model.mock');

describe('Testando camada de serviço Sales', () => {
    it('Retorna todas as vendas', async () => {
        sinon.stub(models.sales, 'findAll').resolves(allSales);

        const data = await services.sales.findAll();

        expect(data).to.eq(allSales);
    });

    it('Buscando venda pelo id', async () => {
        sinon.stub(models.sales, 'findSaleById').resolves([allSales[0], allSales[1]]);

        const { type, message } = await services.sales.findSaleById(1);
        
        expect(type).to.eq(null);
        expect(message).to.be.deep.eq([allSales[0], allSales[1]]);
    });

    afterEach(sinon.restore);
});
