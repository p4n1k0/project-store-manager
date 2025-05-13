const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const models = require("../../../src/models");

const { saleById, allSales, saleEdited } = require('../mocks/sales.model.mock');

describe('Teste de unidade do models', () => {
    it('Retorna todas as vendas', async () => {
        sinon.stub(connection, "execute").resolves([allSales]);
        const results = await models.sales.findAll();
        expect(results).to.be.deep.equal(allSales);
    });

    it('Buscando uma venda por ID', async () => {
        sinon.stub(connection, 'execute').resolves([[saleById]]);
        const result = await models.sales.findSaleById(2);
        expect(result).to.deep.equal(saleById);
    });

    it('Atualizando uma venda', async () => {
        sinon.stub(connection, 'execute').resolves([saleEdited]);

        const data = await models.sales.updateSale(2);

        expect(data).to.be.deep.eq(saleEdited);
    });

    it('Deletando uma venda por ID', async () => {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
        const result = await models.sales.deleteSales(1);
        expect(result.affectedRows).to.equal(1);
    });

    afterEach(sinon.restore);
});
