var Canvas = require('canvas');
var generateText = require('./generateText');

function Captcha(options) {
  // defaults
  this.options = options || {};
  if (!this.options.height) this.options.height = 150;
  if (!this.options.width) this.options.width = 300;
  if (!this.options.text) this.options.text = generateText();
  if (!this.options.font) this.options.font = 'sans';

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

Captcha.prototype.generate = function() {
  this.reset();
  this._middleware.forEach(function(fn){
    this.canvas = fn(this.canvas, this.options);
  }.bind(this));
  return this;
};

Captcha.prototype.text = function() {
  return this.options.text;
};

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

module.exports = Captcha;
