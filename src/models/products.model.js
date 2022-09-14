const connection = require('./connection');

async function findAll() {
  const [data] = await connection.execute('SELECT * FROM StoreManager.products ORDER BY id');

  return data;
}

async function findById(id) {
  try {
    const [data] = await connection
      .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
    
    return data[0];
  } catch (err) {
    console.log(err);
  }
}

async function newProduct(name) {
  const [data] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUES(?)', [name]);

  return { id: data.insertId, name };
}

async function findAllProductsById(ids) {
  const query = ids.split(',');
  const queryIn = ids.split(',').map((_product) => '?').join(',');

  try {
    const [data] = await connection
      .execute(`SELECT * FROM StoreManager.products WHERE id IN (${queryIn}})`, [...query]);

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function updateProducts(id, name) {
  const [data] = await connection
    .execute('UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, id]);

  return { id: data.insertId, name };
}

async function deleteProductById(id) {
  const [{ data }] = await connection
    .execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
  
  return data;  
}

module.exports = {
  findAll,
  findById,
  newProduct,
  findAllProductsById,
  updateProducts,
  deleteProductById,
};
