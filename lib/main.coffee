Canvas = require "canvas"
Captcha = require "./Captcha"

module.exports =
  generate: (opt={}) ->
    {height,width,text} = opt
    height ?= 150
    width ?= 300
    text ?= (((1 + Math.random()) * 0x10000000) | 0).toString 32

    randomColor = -> Math.floor Math.random()*255
    colors = (r:randomColor(),g:randomColor(),b:randomColor() for num in [0..7])
    getColor = -> colors[Math.floor(Math.random()*colors.length)]

    canvas = new Canvas width, height
    ctx = canvas.getContext "2d"

    background = colors.pop()
    ctx.fillStyle = "rgb(#{background.r},#{background.g},#{background.b})"
    ctx.fillRect 0, 0, width, height

    x = 5
    for letter, idx in text
      size = Math.floor(Math.random()*60)+50
      ctx.font = "#{size}px sans"
      ctx.textBaseline = "top"
      te = ctx.measureText letter
      y = Math.floor (((Math.random()*height-size)/100)+size/3)

      color = getColor()
      ctx.fillStyle = "rgb(#{color.r},#{color.g},#{color.b})"
      rot = (Math.random()*-0.4)+0.2
      ctx.rotate rot
      ctx.fillText letter, x, y
      ctx.rotate -rot
      x += te.width

      ctx.lineWidth = 2
      ctx.fillStyle = ctx.strokeStyle = "rgb(#{color.r},#{color.g},#{color.b})"
      ctx.moveTo Math.random()*width, Math.random()*height
      ctx.bezierCurveTo Math.random()*height, Math.random()*height, Math.random()*width, Math.random()*height, Math.random()*width, Math.random()*height
      ctx.stroke()

    imageData = ctx.getImageData 0, 0, width, height
    pixels = imageData.data
    for pixel, i in pixels by Math.floor width*0.12
      color = getColor()
      pixels[i] = pixels[i]*color.r/255
      pixels[i+1] = pixels[i+1]*color.g/255
      pixels[i+2] = pixels[i+2]*color.b/255
    ctx.putImageData imageData, 0, 0
    return new Captcha canvas, text