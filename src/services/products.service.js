const models = require('../models');
const validations = require('../middlewares/validations');

async function findAll() {
  await models.products.findAll();
}

async function findById(id) {
  await models.products.findById(id);  
}

async function newProduct(name) {
  const validationName = validations.nameValidation(name);
  
  if (validationName.type) {
    return validationName;
  }
  const data = await models.products.newProduct(name);

  return data;
}

async function updateProducts(id, name) {
  let validated = validations.nameValidation(name);

  if (validated.type) {
    return validated;
  }
  const data = await models.products.findById(id);

  validated = validations.productValidation(data);

  if (validated.type) {
    return validated;
  }
  const dataUpdate = await models.products.updateProducts(id, name);

  return dataUpdate;
}

async function deleteProductById(id) {  
  await models.products.deleteProductById(id);
}

module.exports = {
  findAll,
  findById,
  newProduct,
  updateProducts,
  deleteProductById,
};
