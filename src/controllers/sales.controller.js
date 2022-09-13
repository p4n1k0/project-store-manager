const services = require('../services');

async function newSale(req, res) {
  const data = await services.sales.newSale(req.body);

  if (data.type) {
    return res.status(data.type).json({ message: data.message });
  }
  res.status(201).json(data);
}

async function findAll(req, res) {
  const data = await services.sales.findAll();

  res.status(200).json(data);
}

async function findById(req, res) {
  const { id } = req.params;
  const data = await services.sales.findById(id);

  if (data.type) {
    res.status(data.type).json({ message: data.message });
  } else {
    res.status(200).json(data);
  }
}

  module.exports = {
    newSale,
    findAll,
    findById,
};
