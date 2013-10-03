getColors = require '../getColors'
getFontSize = require '../getFontSize'
getFontRotation = require '../getFontRotation'

module.exports = (canvas, opt) ->
  ctx = canvas.getContext "2d"

  colors = getColors opt.text.length

  x = 3 # original x offset

  opt.text.split('').forEach (letter, idx) ->
    color = colors[idx]

    # set font
    size = getFontSize opt.height, opt.width, opt.font
    ctx.font = "#{size}px #{opt.font}"
    ctx.textBaseline = "top"
    te = ctx.measureText letter
    y = Math.floor (((Math.random()*opt.height-size)/100)+size/3)

    # set color
    ctx.fillStyle = "rgb(#{color.r},#{color.g},#{color.b})"
    
    # set rotation
    rot = getFontRotation()
    ctx.rotate rot

    # draw text
    ctx.fillText letter, x, y

    # unset rotatation
    ctx.rotate -rot

    # space it for the next one
    x += 1
    x += te.width

  return canvas