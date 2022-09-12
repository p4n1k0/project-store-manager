const models = require('../models');
const validations = require('../middlewares/validations');

async function newSale(sale) {
  let result = validations.saleValidation(sale);

  if (result.type) {
    return result;
  }

  const products = [];
  sale.forEach(async (product) => {
    const p = await models.products.findById(product.productId);
    
    products.push(p);
  });
  result = validations.productsValidation(products);

  if (result.type) {
    return result;
  }
}

module.exports = {
  newSale,
};
