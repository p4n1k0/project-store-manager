const connection = require('./connection');

async function findAll() {
  const [data] = await connection
    .execute('SELECT * FROM StoreManager.products ORDER BY id');
  return data;
}

async function findById(id) {
  const [data] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return data[0];
}

async function newProduct(name) {
  const [data] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUES(?)', [name]);
  return { id: data.insertId, name };
}

async function updateProducts(id, name) {
  const [data] = await connection
    .execute('UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, id]);

  return {
    id: data.insertId,
    name,
  };
}

async function deleteProductById(id) {
  const [data] = await connection
    .execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
  return data;
};

async function getBySearchTerm(query) {
  const [products] = await connection
    .execute(`SELECT * FROM StoreManager.products WHERE name LIKE '%${query}%'`,);
  return products;
};


module.exports = {
  findAll,
  findById,
  newProduct,
  updateProducts,
  deleteProductById,
  getBySearchTerm,
};
