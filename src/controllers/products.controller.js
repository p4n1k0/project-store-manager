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
  }
  res.status(404).json({ message: 'Product not found' });
}

module.exports = {
  findAll,
  findById,
};
