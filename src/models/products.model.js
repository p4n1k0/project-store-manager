const connection = require('./connection');

async function findAll() {
  const [data] = await connection.execute('SELECT * FROM StoreManager.products ORDER BY id');

  return data;
}

async function findById(id) {
  const [data] = await connection.execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);

  return data[0];
}

module.exports = {
  findAll,
  findById,
};
