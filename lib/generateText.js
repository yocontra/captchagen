module.exports = function() {
  return (((1 + Math.random()) * 0x10000000) | 0).toString(32);
};