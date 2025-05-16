const { expect } = require('chai');
const sinon = require('sinon');
const services = require('../../../src/services');
const models = require('../../../src/models');
const { allSales } = require('../mocks/sales.model.mock');
const { dataMock } = require('../mocks/products.model.mock');

const sales = [
    {
        "productId": 1,
        "quantity": 1
    },
    {
        "productId": 2,
        "quantity": 5
    }
];

const returnAllSales = [
    { date: '2022-09-11T20:38:35.000Z', productId: 1, quantity: 5 },
    { date: '2022-09-11T20:38:35.000Z', productId: 2, quantity: 10 },
    { date: '2022-09-11T20:38:35.000Z', productId: 3, quantity: 15 }
];

const saleCreated = {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 4,
    info: '',
    serverStatus: 2,
    warningStatus: 0
}

const saleEdited = {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1
}

describe('Testando camada de serviço Sales', () => {
    it('Validando criação de nova venda', async () => {
        sinon.stub(models.sales, 'newSale').resolves({ id: saleCreated.insertId });
        sinon.stub(models.sales, 'findProductSaleById').resolves(dataMock[0], dataMock[1]);
        sinon.stub(models.products, 'newProduct').resolves([]);

        const data = await services.sales.newSale(sales);

        expect(data).to.be.deep.eq({ id: saleCreated.insertId });
    });

    it('Erro de validação na criação de uma venda', async () => {
        sinon.stub(models.sales, 'newSale').resolves({ id: saleCreated.insertId });
        sinon.stub(models.sales, 'findProductSaleById').resolves(dataMock.pop());

        const salesCreate = [
            {
                "productId": 1,
                "quantity": 1
            },
            {
                "productId": 2,
                "quantity": 5
            },
            {
                "productId": 80,
                "quantity": 5
            }
        ]
        const data = await services.sales.newSale(salesCreate, { id: saleCreated.insertId });

        expect(data.type).to.be.deep.eq(404);
        expect(data.message).to.be.deep.eq('Product not found');
    });

    it('Validação EditProduct Productid que não existe', async () => {
        sinon.stub(models.sales, 'updateSale').resolves(saleEdited);
        sinon.stub(models.sales, 'findProductSaleById').resolves(dataMock.pop());

        const sales = [
            {
                "productId": 1,
                "quantity": 1
            },
            {
                "productId": 2,
                "quantity": 5
            },
            {
                "productId": 80,
                "quantity": 5
            }
        ];
        const data = await services.sales.updateSale(2, sales);

        expect(data.type).to.be.deep.eq(404);
        expect(data.message).to.be.deep.eq('Product not found');
    });

    it('Retorna todas as vendas', async () => {
        sinon.stub(models.sales, 'findAll').resolves(allSales);

        const data = await services.sales.findAll();

        expect(data).to.be.deep.eq(allSales);
    });

    it('Erro ao buscar venda por id inexistente', async () => {
        sinon.stub(models.sales, 'findSaleById').resolves([]);

        try {
            await services.sales.findById(999);
        } catch (error) {
            expect(error.message).to.be.deep.eq('Sale not found');
        }
    });

    it('Buscando venda pelo id', async () => {
        sinon.stub(models.sales, 'findSaleById').resolves([allSales[0], allSales[1]]);

        const { type, message } = await services.sales.findSaleById(1);

        expect(type).to.be.deep.eq(null);
        expect(message).to.be.deep.eq([allSales[0], allSales[1]]);
    });

    it('Erro ao deletar venda com id incorreto', async () => {
        sinon.stub(models.sales, 'deleteSales').resolves([]);

        const { type, message } = await services.sales.deleteSales(999);

        expect(type).to.be.deep.eq('NOT_FOUND');
        expect(message).to.be.deep.eq('Sale not found');
    });

    it('Retorno de venda excluída pelo id existente', async () => {
        sinon.stub(models.sales, 'deleteSales').resolves({
            fieldCount: 0,
            affectedRows: 1,
            insertId: 0,
            info: '',
            serverStatus: 2,
            warningStatus: 0
        });

        const data = await services.sales.deleteSales(2);

        expect(data.type).to.be.deep.eq(null);
    });

    it('Editando produto', async () => {
        sinon.stub(models.sales, 'updateSale').resolves(saleEdited);
        sinon.stub(models.sales, 'findSaleById').resolves(returnAllSales[0], returnAllSales[1]);

        const data = await services.sales.updateSale(2, sales);

        expect(data.type).to.be.deep.eq(null);
    });

    it('Editando venda por id inexistente', async () => {
        sinon.stub(models.sales, 'updateSale').resolves([]);
        const { type, message } = await services.sales.updateSale(1000, sales);

        expect(type).to.be.deep.eq(404);
        expect(message).to.be.deep.eq('Sale not found');
    });

    afterEach(() => {
        sinon.restore();
    });
});
