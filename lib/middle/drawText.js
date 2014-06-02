var getColors = require('../getColors');
var getFontSize = require('../getFontSize');
var getFontRotation = require('../getFontRotation');

module.exports = function(canvas, opt)
{
	var ctx = canvas.getContext('2d');

	var colors = getColors(opt.text.length);

	var x = 0;
	var y = 0;

	var maxY = opt.height - 20;
	var minY = 20;
	var lastY = 0;
	if (opt.text.indexOf(' ') == -1)
	{
		x = 3;
	}

	var size = -1;
	opt.text.split('').forEach(function(letter, idx)
	{
		var color = colors[idx];

		// set font
		if (size == -1)
		{
			size = getFontSize(opt.height);
			ctx.font = '' + size + 'px ' + opt.font;
			ctx.textBaseline = 'top';

			// Shrink the font to fit the entire string into the image
			var stringMeasurement = ctx.measureText(opt.text);

			var pointSize = (stringMeasurement.width / size);
			size = Math.floor((opt.width - 3) / pointSize);
			ctx.font = '' + size + 'px ' + opt.font;

			maxY -= size;
			y = Math.floor(Math.random() * (maxY - minY) + minY);
		}
		else
		{
			// To make math more readable we
			// restrict characters from appearing
			// more than 20 pixels above or below
			// the position of the last character
			var localMinY = 0;
			var localMaxY = 0;

			if ((lastY - 20) < minY)
			{
				localMinY = minY;
			}
			else
			{
				localMinY = (lastY - 20);
			}

			if ((lastY + 20) > maxY)
			{
				localMaxY = maxY;
			}
			else
			{
				localMaxY = (lastY + 20);
			}

			y = Math.floor(Math.random() * (localMaxY - localMinY) + localMinY);
		}

		var te = ctx.measureText(letter);

		// set color
		ctx.fillStyle = color.css;

		// Center our letter to its X and Y
		// coordinates so rotation doesn't
		// widely space the letter
		ctx.translate(x, y);

		// set font rotation
		var rot = getFontRotation();
		ctx.rotate(rot);

		// draw text
		ctx.fillText(letter, 0, 0);

		// unset rotation for next letter
		ctx.rotate(-rot);

		// space the x-axis for the next letter
		ctx.translate(-x, -y);
		x += te.width;

		if (opt.text.indexOf(' ') == -1)
		{
			x += 1;
		}

		lastY = y;
	});

	return canvas;
};