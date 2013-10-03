var Captcha = require('./lib/Captcha');
var drawBackground = require('./lib/middle/drawBackground');
var drawText = require('./lib/middle/drawText');
var drawLines = require('./lib/middle/drawLines');

var getColors = require('./lib/getColors');
var getFontSize = require('./lib/getFontSize');
var generateText = require('./lib/generateText');

module.exports = {
  Captcha: Captcha,

  // stock middleware
  drawBackground: drawBackground,
  drawText: drawText,
  drawLines: drawLines,

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
    cap.use(drawLines);
    return cap;
  }
};