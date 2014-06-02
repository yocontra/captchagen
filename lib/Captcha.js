var Canvas = require('../includes/canvas/index');
var crypto = require('crypto');
var GenerateText = require('./generateText');

function Captcha(options)
{
	// defaults
	this.options = options || {};
	if (!this.options.height)			{ this.options.height = 150; }
	if (!this.options.width)			{ this.options.width = 300; }
	if (!this.options.useMath)			{ this.options.useMath = false; }
	if (!this.options.lineCount)		{ this.options.lineCount = 4; }
	if (!this.options.colorStops)		{ this.options.colorStops = 4; }
	if (!this.options.stringLength)		{ this.options.stringLength = 5; }
	if (!this.options.minOperations)	{ this.options.minOperations = 2; }
	if (!this.options.maxOperations)	{ this.options.maxOperations = 6; }
	if (!this.options.saveDataType)		{ this.options.saveDataType = 'buffer'; }

	var generator = new GenerateText(this.options.minOperations, this.options.maxOperations);
	if (this.options.useMath)
	{
		// We only want simple expressions that don't require
		// decimals or negative numbers. However it's impossible
		// to predict the value of a complex expression without
		// parsing it completely. So we use this loop here as
		// a somewhat resource intensive sanity check
		do
		{
			var mathExpression = generator.generateMath();
			this.options.text = generator.generateEquationString();
			this.options.answer = generator.solveMath(mathExpression);
		} while ((this.options.answer % 1 != 0) || this.options.answer < 1);
	}
	else if (!this.options.text)
	{
		this.options.text = generator.generateText(this.options.stringLength);
		this.options.answer = this.options.text;
	}

	this.key = crypto.createHash('sha512WithRSAEncryption').update(this.options.text, 'utf8').digest('hex');

	if (!this.options.font) { this.options.font = 'sans'; }

	this._middleware = [];
}

Captcha.prototype.use = function(fn) {
  this._middleware.push(fn);
  return this;
};

Captcha.prototype.reset = function() {
  this.canvas = new Canvas(this.options.width, this.options.height);
  return this;
};

Captcha.prototype.generate = function()
{
	this.reset();
	this._middleware.forEach(function(fn)
	{
		this.canvas = fn(this.canvas, this.options);
	}.bind(this));

	if (this.saveFunction)
	{
		var data = null;
		if (this.options.saveDataType == 'buffer')
		{
			data = this.buffer();
		}
		else if (this.options.saveDataType == 'streamPNG')
		{
			data = this.strean('png');
		}
		else if (this.options.saveDataType == 'streamJPEG')
		{
			data = this.stream('jpeg');
		}
		else
		{
			data = this.uri();
		}
		
		this.saveFunction(this.key, this.options.answer, data);
	}

	return this;
};

Captcha.prototype.text = function() {
  return this.options.text;
};

Captcha.prototype.id = function()
{
	return this.key;
}

Captcha.prototype.font = function() {
  return this.options.font;
};

Captcha.prototype.height = function() {
  return this.options.height;
};

Captcha.prototype.width = function() {
  return this.options.width;
};

Captcha.prototype.uri = function() {
  return this.canvas.toDataURL.apply(this.canvas, arguments);
};

Captcha.prototype.buffer = function() {
  return this.canvas.toBuffer.apply(this.canvas, arguments);
};

Captcha.prototype.stream = function(type) {
  if (!type) type = 'png';
  type = type.toLowerCase();

  if (type === 'png') {
    return this.canvas.createPNGStream();
  } else if (type === 'jpeg') {
    return this.canvas.createJPEGStream();
  } else {
    throw new Error('Invalid stream type');
  }
};

Captcha.prototype.setSaveValue = function(callback)
{
	this.saveFunction = callback;
}

Captcha.prototype.setRetrieveValue = function(callback)
{
	this.retrieveFunction = callback;
}

Captcha.prototype.check = function(answer)
{
	var oldAnswer = null;
	if (this.retrieveFunction)
	{
		oldAnswer = this.retrieveFunction.call(this);
	}

	if (oldAnswer != answer)
	{
		return false;
	}
	else
	{
		return true;
	}
}

module.exports = Captcha;