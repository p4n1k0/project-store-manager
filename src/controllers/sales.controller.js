const services = require('../services');

async function newSale(req, res) {
  const data = await services.sales.newSale(req.body);

  if (data.type) {
    return res.status(data.type).json({ message: data.message });
  }
  res.status(201).json(data);
}

  module.exports = {
    newSale,
};
