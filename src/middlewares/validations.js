function nameValidation(name) {
  if (!name || name.length === 0) {
    return { type: 400, message: '"name" is required' };
  }
  if (name.length < 5) {
    return { type: 422, message: '"name" length must be at least 5 characters long' };
  }
  return { type: null, message: 'ok' };
}

function saleDataValidation(sale) {
  const saleMap = sale.map((s) => {
    const { productId, quantity } = s;

    if (!productId) {
      return { type: 400, message: '"productId" is required' };
    }
    if (quantity <= 0) {
      return { type: 422, message: '"quantity" must be greater than or equal to 1' };
    }
    if (!quantity) {
      return { type: 400, message: '"quantity" is required' };
    }
    return { type: null, message: 'ok' };
  });
  return saleMap[0];
}

function productValidation(product) {
  if (product) {
    return { type: null, message: 'ok' };
  }
  return { type: 404, message: 'Product not found' };
}

function productsValidation(products) {
  const productFilter = products.filter((product) => {
    if (!product) {
      return true;
    }
    return false;
  });
  if (!products || productFilter > 0) {
    return { type: 404, message: 'Product not found' };
  }
  return { type: null, message: 'ok' };
}

function saleValidation(sale) {
  if (sale) {
    return { type: null, message: 'ok' };
  } 
  return { type: 404, message: 'Sale not found' };
}

module.exports = {
  nameValidation,
  saleDataValidation,
  productValidation,
  productsValidation,
  saleValidation,
};
