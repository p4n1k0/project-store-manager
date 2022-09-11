function nameValidation(name) {
  if (!name || name.length === 0) {
    return { type: 400, message: '"name" is required' };
  }
  if (name.length < 5) {
    return { type: 422, message: '"name" must be at least 5 characters long' };
  }
  return { type: null, message: 'ok' };
}

module.exports = {
  nameValidation,
};
