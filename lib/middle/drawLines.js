var getColors = require('../getColors');
var randomBetween = require('../randomBetween');

module.exports = function(canvas, opt) {
  var ctx = canvas.getContext('2d');
  var colors = getColors(randomBetween(1, 4));

  colors.forEach(function(color) {
    ctx.beginPath();
    ctx.moveTo(randomBetween(0, opt.width), randomBetween(0, opt.height));
    ctx.bezierCurveTo(randomBetween(0, opt.height), randomBetween(0, opt.height), randomBetween(0, opt.width), randomBetween(0, opt.height), randomBetween(0, opt.width), randomBetween(0, opt.height));
    
    ctx.fillStyle = ctx.strokeStyle = color.css;
    ctx.lineWidth = randomBetween(2, 5);
    return ctx.stroke();
  });
  return canvas;
};
