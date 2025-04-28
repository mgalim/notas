function generateId(array) {
  const maxId = array.length > 0 ? Math.max(...array.map((n) => n.id)) : 0;
  return maxId + 1;
}

module.exports = { generateId };
