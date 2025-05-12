const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const models = require("../../../src/models/sales.model");

const { saleById } = require('../mocks/sales.model.mock');

describe("Teste de unidade do models", function () {
    afterEach(function () {
        sinon.restore();
    });

    it("Buscando uma venda por ID", async function () {
        sinon.stub(connection, "execute").resolves([[saleById]]);
        const result = await models.findSaleById(2);
        expect(result).to.deep.equal(saleById);
    });

    it("Deletando uma venda por ID", async function () {
        sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);
        const result = await models.deleteSales(1);
        expect(result.affectedRows).to.equal(1);
    });
});
