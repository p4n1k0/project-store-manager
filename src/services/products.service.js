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

module.exports = {
  findAll,
  findById,
  newProduct,
};
