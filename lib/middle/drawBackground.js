var getColors = require('../getColors');

module.exports = function(canvas, opt)
{
	var ctx = canvas.getContext('2d');

	var colors = getColors(opt.colorStops);

	var gradient = ctx.createLinearGradient(0, 0, opt.width, 0);

	for (var counter = 0; counter < colors.length; counter++)
	{
		  gradient.addColorStop(0, colors[counter].css);
	}
  
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, opt.width, opt.height);

	return canvas;
};