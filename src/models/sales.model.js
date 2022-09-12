const connection = require('./connection');

async function newSale(sale) {
  const [data] = await connection.execute('INSERT INTO StorageManager.sales (date) VALUES (NOW())');

  const saleId = data.insertId;

  let saleMap = sale.map((product) => [saleId, product.productId, product.quantity]);
  saleMap = saleMap.map((saleValue) => saleValue.join(','));
  saleMap = saleMap.join('), (');
  saleMap = `(${saleMap})`;

  await connection.execute(
    `INSERT INTO StorageManager.sales_products (sale_id, product_id, quantity) VALUES ${saleMap}`,
  );
  const result = { id: saleId, items: sale };
  
  return result;
}

module.exports = {
  newSale,
};
