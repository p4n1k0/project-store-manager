const services = require('../services');

async function newSale(req, res) {
  const saleData = req.body;
  const data = await services.sales.newSale(saleData);

  if (data.type) {
    res.status(data.type).json({ message: data.message });
  } else {
    res.status(201).json(data);
  }
}

module.exports = {
  newSale,
};
