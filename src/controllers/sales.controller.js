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

async function findSaleById(req, res) {
  const { id } = req.params;
  const { type, message } = await services.sales.findSaleById(Number(id));

  if (type) {
    return res.status(404).json({ message });
  }
  res.status(200).json(message);
}

async function deleteSales(req, res) {
  const { id } = req.params;
  const { type, message } = await services.sales.deleteSales(Number(id));

  if (type) {
    return res.status(404).json({ message });
  }
  res.status(204).end();
}

module.exports = {
  newSale,
  findAll,
  findById,
  deleteSales,
  findSaleById,
};
