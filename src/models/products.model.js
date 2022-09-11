const connection = require('./connection');

async function findAll() {
  const [data] = await connection.execute('SELECT * FROM StoreManager.products ORDER BY id');

  return data;
}

async function findById(id) {
  const [data] = await connection.execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);

  return data[0];
}

async function newProduct(name) {
  const [data] = await connection
    .execute('INSERT INTO StoraManager.products (name) VALUES(?)', [name]);

  return { id: data.insertId, name };
}

module.exports = {
  findAll,
  findById,
  newProduct,
};
