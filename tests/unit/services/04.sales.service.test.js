const { expect } = require('chai');
const sinon = require('sinon');
const services = require('../../../src/services');
const models = require('../../../src/models');
const {
    allSales,
    saleEdited,
    salesMock,
    saleCreated,
    notProduct,
    notQuantity,
    salesCreate,
} = require('../mocks/sales.mock');

describe('4 - Testando camada de serviço de vendas', () => {
    it('validando criação de nova venda', async () => {
        sinon.stub(models.sales, 'newSale').resolves({ id: saleCreated.insertId });

        const data = await services.sales.newSale(salesMock);

        expect(data).to.be.deep.eq({ id: saleCreated.insertId });
    });

    it('erro ao validar criação de nova venda sem id do produto', async () => {
        sinon.stub(models.sales, 'newSale').resolves([notProduct]);

        const data = await services.sales.newSale(notProduct);

        expect(data.type).to.be.deep.eq(400);
        expect(data.message).to.be.deep.eq('"productId" is required');
    });

    it('validando erro de criação de nova venda sem quantidade', async () => {
        sinon.stub(models.sales, 'newSale').resolves([notQuantity]);

        const data = await services.sales.updateSale(1, notQuantity);

        expect(data.type).to.be.deep.eq(422);
        expect(data.message).to.be.deep.eq('"quantity" must be greater than or equal to 1');
    });

    it('erro de validação na criação de uma venda', async () => {
        sinon.stub(models.sales, 'newSale').resolves({ id: saleCreated.insertId });

        const data = await services.sales.newSale(salesCreate, { id: saleCreated.insertId });

        expect(data.type).to.be.deep.eq(404);
        expect(data.message).to.be.deep.eq('Product not found');
    });

    it('validação EditProduct Productid que não existe', async () => {
        sinon.stub(models.sales, 'updateSale').resolves(saleEdited);

        const data = await services.sales.updateSale(2, salesCreate);

        expect(data.type).to.be.deep.eq(404);
        expect(data.message).to.be.deep.eq('Product not found');
    });

    it('erro ao buscar venda por id inexistente', async () => {
        sinon.stub(models.sales, 'findSaleById').resolves(allSales[3]);

        const data = await services.sales.findSaleById();

        expect(data.type).to.be.deep.eq('NOT_FOUND');
        expect(data.message).to.be.deep.eq('Sale not found');
    });

    it('buscando venda pelo id', async () => {
        sinon.stub(models.sales, 'findSaleById').resolves([allSales[0], allSales[1]]);

        const data = await services.sales.findSaleById();

        expect(data.type).to.be.deep.eq(null);
        expect(data.message).to.be.deep.eq([allSales[0], allSales[1]]);
    });

    it('editando produto', async () => {
        sinon.stub(models.sales, 'updateSale').resolves(saleEdited);

        const data = await services.sales.updateSale(2, salesMock);

        expect(data.type).to.be.deep.eq(null);
    });

    it('editando venda por id inexistente', async () => {
        sinon.stub(models.sales, 'updateSale').resolves([]);

        const data = await services.sales.updateSale(1000, salesMock);

        expect(data.type).to.be.deep.eq(404);
        expect(data.message).to.be.deep.eq('Sale not found');
    });

    afterEach(() => {
        sinon.restore();
    });
});
