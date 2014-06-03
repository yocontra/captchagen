var Captcha = require('./lib/Captcha');
var drawBackground = require('./lib/middle/drawBackground');
var drawText = require('./lib/middle/drawText');
var drawLines = require('./lib/middle/drawLines');
var drawNoise = require('./lib/middle/drawNoise');

var getColors = require('./lib/getColors');
var getFontSize = require('./lib/getFontSize');
var generateText = require('./lib/generateText');

module.exports = {
  Captcha: Captcha,

  // stock middleware
  drawBackground: drawBackground,
  drawText: drawText,
  drawLines: drawLines,
  drawNoise: drawNoise,

  // utils
  getColors: getColors,
  getFontSize: getFontSize,
  generateText: generateText,
  
  // use default settings
  create: function (opt) {
    var cap = new Captcha(opt);
    cap.use(drawBackground);
    cap.use(drawLines);
    cap.use(drawText);
    cap.use(drawNoise);
    cap.use(drawLines);
    return cap;
  }
};