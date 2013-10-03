var getColors = require('../getColors');
var getFontSize = require('../getFontSize');
var getFontRotation = require('../getFontRotation');

module.exports = function(canvas, opt) {
  var ctx = canvas.getContext('2d');

  var colors = getColors(opt.text.length);

  var x = 3;

  opt.text.split('').forEach(function(letter, idx) {
    var color = colors[idx];

    // set font
    var size = getFontSize(opt.height, opt.width, opt.font);
    ctx.font = '' + size + 'px ' + opt.font;
    ctx.textBaseline = 'top';
    var te = ctx.measureText(letter);
    var y = Math.floor(((Math.random() * opt.height - size) / 100) + size / 3);
    
    // set color
    ctx.fillStyle = color.css;
    
    // set font rotation
    var rot = getFontRotation();
    ctx.rotate(rot);

    // draw text
    ctx.fillText(letter, x, y);

    // unset rotation for next letter
    ctx.rotate(-rot);

    // space the x-axis for the next letter
    x += te.width+1;
  });
  return canvas;
};
