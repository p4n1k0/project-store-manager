const models = require('../models');
const validations = require('../middlewares/validations');

async function newSale(sales) {
  let validated = validations.salesValidation(sales);

  if (validated.type) {
    return validated;
  }

  const products = await Promise.all(sales.map(async (sale) => {
    const data = await models.products.findById(sale.productId);

    return data;
  }));

  validated = validations.productsValidation(products);
  
  if (validated.type) {
    return validated;
  }
  const result = await models.sales.newSale(sales);

  return result;
}

async function findAll() {
  const data = await models.sales.findAll();

  return data;
}

async function findById(id) {
  const data = await models.sales.findSaleById(id);
  const validated = validations.salesValidation(data);

  if (validated.type) {
    return validated;
  }

  const dataSales = await models.sales.findProductSaleById(id);
  const saleMap = dataSales.map((sales) => {
    const productId = sales.product_id;
    const { quantity } = sales;
    const { date } = data;

    return { productId, quantity, date };
  });
  return saleMap;
}

module.exports = {
  newSale,
  findAll,
  findById,
};
