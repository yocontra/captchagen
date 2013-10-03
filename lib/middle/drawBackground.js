var getColors = require('../getColors');

module.exports = function(canvas, opt) {
  var ctx = canvas.getContext('2d');

  var colors = getColors(2);

  var gradient = ctx.createLinearGradient(0, 0, opt.width, 0);
  gradient.addColorStop(0, colors[0].css);
  gradient.addColorStop(1, colors[1].css);
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, opt.width, opt.height);
  return canvas;
};
