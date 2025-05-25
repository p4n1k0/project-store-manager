const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const models = require("../../../src/models");

const { salesMock, newSale, saleUpdate } = require('../mocks/sales.mock');

describe('3 - Teste unidade models de vendas', () => {
    it('cadastrando uma nova venda', async () => {        
        sinon.stub(connection, 'execute').resolves([{ insertId: 2 }]);

        const data = await models.sales.newSale(salesMock, newSale);

        expect(data.id).to.be.deep.eq(2);
    });

    it('realizando a atualização de uma venda', async () => {
        sinon.stub(connection, 'execute').onFirstCall().resolves({}).onSecondCall().resolves({});

        const data = await models.sales.updateSale(1, saleUpdate);

        expect(data).to.be.deep.eq(null);
    });

    afterEach(() => {
        sinon.restore();
    });
});
