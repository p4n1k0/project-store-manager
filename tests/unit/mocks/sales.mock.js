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

const salesMock = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const newSale = {
  "id": 2,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
};

const saleUpdate = [
  {
    productId: 1,
    quantity: 10
  },
  {
    productId: 2,
    quantity: 50
  }
];

const returnAllSales = [
  { 
    date: '2022-09-11T20:38:35.000Z',
    productId: 1,
    quantity: 5
  },
  {
    date: '2022-09-11T20:38:35.000Z',
    productId: 2,
    quantity: 10
  },
  {
    date: '2022-09-11T20:38:35.000Z',
    productId: 3,
    quantity: 15
  }
];

const saleCreated = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 4,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

const notProduct = [{
  'quantity': 1
},
{
  'quantity': 4
}];

const notQuantity = [{
  'productId': 1,
  'quantity': 0
},
{
  'productId': 4,
  'quantity': 0
}];

const salesCreate = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  },
  {
    "productId": 80,
    "quantity": 5
  }
];

module.exports = {
  allSales,
  saleEdited,
  salesMock,
  newSale,
  saleUpdate,
  returnAllSales,
  saleCreated,
  notProduct,
  notQuantity,
  salesCreate,
};
