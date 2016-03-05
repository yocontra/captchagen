var getColors = require('../getColors');
var randomBetween = require('../randomBetween');

module.exports = function(canvas, opt) {
  var ctx = canvas.getContext('2d');

  for (var i = 0; i < opt.width*opt.height/randomBetween(opt.height/10, (opt.width+opt.height)/10); i++) {
    ctx.strokeStyle = getColors(100)[randomBetween(1, 100)].css;
    ctx.fillRect(randomBetween(0,opt.width),randomBetween(0,opt.height),1,1);
    ctx.strokeRect();
  };

  return canvas;
};
