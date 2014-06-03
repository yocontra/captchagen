var randomBetween = require('../randomBetween');
var getColors = require('../getColors');

module.exports = function(canvas, opt)
{
	var g = canvas.getContext("2d");
	g.save();

	var colors = getColors(1);
	var noiseLevel = ((opt.noiseLevel > 10) ? 10 : opt.noiseLevel );
	noiseLevel *= 125;

	g.fillStyle = colors[0].css;
	for (var counter = 0; counter < noiseLevel; ++counter)
	{
		var x			= randomBetween(10, opt.width);
		var y			= randomBetween(10, opt.height);
		var size		= randomBetween(1, 3);
		var angleStart	= randomBetween(0, 2);
		var angleEnd	= randomBetween(0, 2);

		if (x - size <= 0 && y - size <= 0)
		{
			continue;
		}

		g.beginPath();
		if (angleStart > angleEnd)
		{
			g.arc(x, y, size, angleEnd * Math.PI, angleStart * Math.PI);
		}
		else
		{
			g.arc(x, y, size, angleStart * Math.PI, angleEnd * Math.PI);
		}

		g.fill();
	}
	
	g.restore();
	return canvas;
}