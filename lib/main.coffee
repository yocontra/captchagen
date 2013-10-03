Captcha = require "./Captcha"
drawBackground = require "./middle/drawBackground"
drawText = require "./middle/drawText"
drawLines = require "./middle/drawLines"

module.exports = lib =
  Captcha: Captcha

  drawBackground: drawBackground
  drawText: drawText
  drawLines: drawLines

  getColors: getColors
  getFontSize: getFontSize
  generateText: generateText
  
  create: (opt) ->
    cap = new Captcha opt
    cap.use drawBackground
    cap.use drawLines
    cap.use drawText
    cap.use drawLines
    return cap