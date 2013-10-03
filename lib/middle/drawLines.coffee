getColors = require '../getColors'
range = require '../range'

module.exports = (canvas, opt) ->
  ctx = canvas.getContext "2d"

  colors = getColors range 1, 4

  colors.forEach (color) ->
    ctx.beginPath()
    ctx.moveTo range(0, opt.width), range(0, opt.height)
    ctx.bezierCurveTo range(0, opt.height), range(0, opt.height), range(0, opt.width), range(0, opt.height), range(0, opt.width), range(0, opt.height)
    
    ctx.fillStyle = ctx.strokeStyle = "rgb(#{color.r},#{color.g},#{color.b})"
    ctx.lineWidth = range(2, 5)
    ctx.stroke()

  return canvas