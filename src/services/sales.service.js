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

module.exports = {
  newSale,
};
