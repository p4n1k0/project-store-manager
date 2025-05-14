const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const models = require("../../../src/models");

const { saleById, allSales } = require('../mocks/sales.model.mock');

describe('Teste de unidade do models', () => {
    it('Retorna todas as vendas', async () => {
        sinon.stub(connection, "execute").resolves([allSales]);
        const data = await models.sales.findAll();
        expect(data).to.be.deep.equal(allSales);
    });

    it('Buscando uma venda por ID', async () => {
        sinon.stub(connection, 'execute').resolves([[saleById]]);
        const data = await models.sales.findSaleById(2);
        expect(data).to.deep.equal(saleById);
    });

    it('Deletando uma venda por ID', async () => {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
        const data = await models.sales.deleteSales(1);
        expect(data.affectedRows).to.equal(1);
    });

    afterEach(() => {
        sinon.restore();
    });
});
