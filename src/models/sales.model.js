const connection = require('./connection');

async function newSale(sales) {
  const [data] = await connection.execute('INSERT INTO StoreManager.sales (date) VALUES (NOW())');
  const saleId = data.insertId;

  let saleMap = sales.map((sale) => [saleId, sale.productId, sale.quantity]); 
  saleMap = saleMap.map((product) => product.join(','));
  saleMap = saleMap.join('), (');
  saleMap = `(${saleMap})`;

  await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES ${saleMap}`,
  );
  const result = { id: saleId, itemsSold: sales };

  return result;
}

module.exports = {
  newSale,
};
