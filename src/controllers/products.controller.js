const services = require('../services');

async function findAll(_req, res) {
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

async function updateProducts(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const data = await services.products.updateProducts(id, name);

  if (data.type) {
    res.status(data.type).json({ message: data.message });
  } else {
    res.status(200).json(data);
  }
}

async function deleteProductById(req, res) {
  const { id } = req.params;
  const data = await services.products.findById(id);
  if (!data) return res.status(404).json({ message: 'Product not found' });
  const dataDeleted = await services.products.deleteProductById(id);
  return res.status(204).json(dataDeleted);
};

async function getBySearchTerm(req, res) {
  const { q } = req.query;
  const product = await services.products.getBySearchTerm(q);
  res.status(200).json(product);  
};

module.exports = {
  findAll,
  findById,
  newProduct,
  updateProducts,
  deleteProductById,
  getBySearchTerm,
};
