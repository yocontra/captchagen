getColors = require '../getColors'

module.exports = (canvas, opt) ->
  ctx = canvas.getContext "2d"

  [bg, bg2] = getColors 2

  gradient = ctx.createLinearGradient 0, 0, opt.width, 0
  gradient.addColorStop 0, "rgb(#{bg.r},#{bg.g},#{bg.b})"
  gradient.addColorStop 1, "rgb(#{bg2.r},#{bg2.g},#{bg2.b})"

  ctx.fillStyle = gradient
  ctx.fillRect 0, 0, opt.width, opt.height

  return canvas