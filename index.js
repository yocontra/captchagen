var Captcha = require('./lib/Captcha');
var drawBackground = require('./lib/middle/drawBackground');
var drawText = require('./lib/middle/drawText');
var drawLines = require('./lib/middle/drawLines');
var drawPoints = require('./lib/middle/drawPoints');
var drawImage = require('./lib/middle/drawImage');

var getColors = require('./lib/getColors');
var getFontSize = require('./lib/getFontSize');
var generateText = require('./lib/generateText');

module.exports = {
  Captcha: Captcha,

  // stock middleware
  drawBackground: drawBackground,
  drawText: drawText,
  drawLines: drawLines,
  drawPoints: drawPoints,
  drawImage: drawImage,

  // utils
  getColors: getColors,
  getFontSize: getFontSize,
  generateText: generateText,
  
  // use default settings
  create: function (opt, drawArguments) {
    var cap = new Captcha(opt);
    var obj = drawArguments || {};


    if (isEmptyObj(obj)) {
      cap.use(drawBackground);
      if (opt.img) {
       cap.use(drawImage);
      }
      cap.use(drawText);
      cap.use(drawLines);
      cap.use(drawPoints);
      return cap;
    }
    if (obj.drawBackground) {
      cap.use(drawBackground);
    }
    if (obj.drawImage && opt.img) {
      cap.use(drawImage);
    }
    if (obj.drawLines) {
      cap.use(drawLines);
    }
    if (obj.drawPoints) {
      cap.use(drawPoints);
    }
    cap.use(drawText);
    return cap;
  }
};
function isEmptyObj (obj){
  for(var key in obj){
    return false;
  }
  return true;
}