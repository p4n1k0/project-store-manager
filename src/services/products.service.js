const models = require('../models');
const validations = require('../middlewares/validations');

async function findAll() {
  const data = await models.products.findAll();

  return data;
}

async function findById(id) {
  const data = await models.products.findById(id);

  return data;
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
  const data = models.products.deleteProductById(id);

  return { type: null, message: data };
}

module.exports = {
  findAll,
  findById,
  newProduct,
  updateProducts,
  deleteProductById,
};
