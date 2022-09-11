const services = require('../services');

async function findAll(req, res) {
  const data = await services.products.findAll();

  res.status(200).json(data);
}

async function findById(req, res) {
  const { id } = req.params;
  const data = await services.products.findById(id);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
}

async function newProduct(req, res) {
  const { name } = req.body;
  const data = await services.products.newProduct(name);

  if (data.type) {
    res.status(data.type).json({ message: data.message });
  } else {
    res.status(201).json(data);
  }
}

module.exports = {
  findAll,
  findById,
  newProduct,
};
