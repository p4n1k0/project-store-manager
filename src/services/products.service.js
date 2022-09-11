const models = require('../models');

async function findAll() {
  const data = await models.products.findAll();

  return data;
}

async function findById(id) {
  const data = await models.products.findById(id);

  return data;
}

async function newProduct(name) {
  const data = await models.products.newProduct(name);

  return data;
}

module.exports = {
  findAll,
  findById,
  newProduct,
};
