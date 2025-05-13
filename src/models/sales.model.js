const connection = require('./connection');

async function newSale(sales) {
  const [data] = await connection.execute('INSERT INTO StoreManager.sales (date) VALUES (NOW())');
  const saleId = data.insertId;
  let saleMap = sales.map((sale) => [saleId, sale.productId, sale.quantity]);
  saleMap = saleMap.map((product) => product.join(','));
  saleMap = saleMap.join('), (');
  saleMap = `(${saleMap})`;
  await connection.execute(`INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES ${saleMap}`,);
  const result = { id: saleId, itemsSold: sales };
  return result;
};

async function findSaleById(id) {
  const [data] = await connection.execute('SELECT * FROM StoreManager.sales WHERE id = ?', [id]);
  return data[0];
};

async function findProductSaleById(id) {
  const [data] = await connection.execute('SELECT * FROM StoreManager.sales_products WHERE sale_id = ?', [id]);
  return data;
};

async function findAll() {
  const [data] = await connection.execute(
    `SELECT sale_id saleId, date, product_id productId, quantity
      FROM StoreManager.sales_products sp
      JOIN StoreManager.sales s ON sp.sale_id = s.id
      ORDER BY product_id`,
  );
  return data;
};

async function deleteSales(id) {
  const [data] = await connection.execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
  return data;
};

async function updateSale(id, saleUpdateArray) {
  saleUpdateArray.forEach(async (sale) => {
    await connection.execute(`UPDATE StoreManager.sales_products SET product_id = ?, quantity = ? WHERE sale_id = ? AND product_id = ?`,
      [sale.productId, sale.quantity, id, sale.productId],);
  });
  return null;
};

module.exports = {
  newSale,
  findSaleById,
  findProductSaleById,
  findAll,
  deleteSales,
  updateSale,
};
