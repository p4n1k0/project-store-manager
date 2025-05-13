const saleById = [
    {
        date: '2025-05-12T23:44:01.000Z',
        productId: 3,
        quantity: 15,
    },
];

const allSales = [
  {
    saleId: 1,
    date: '2022-09-12 19:29:12',
    productId: 1,
    quantity: 5
  },
  {
    saleId: 1,
    date: '2022-09-12 19:29:12',
    productId: 2,
    quantity: 10
  },
  {
    saleId: 2,
    date: '2022-09-12 19:29:12',
    productId: 3,
    quantity: 15
  },
];

const saleEdited = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 1  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 1
}

module.exports = {
    saleById,
    allSales,
    saleEdited,
};
