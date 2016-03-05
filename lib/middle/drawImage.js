var Canvas = require('canvas');
module.exports = function(canvas, opt) {
  var ctx = canvas.getContext('2d');

  var img = new Canvas.Image;
  img.src = opt.img;

  ctx.drawImage(img, 0, 0, opt.width,opt.width);
  return canvas;
};