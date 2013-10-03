{speak} = require 'espeak'
Canvas = require "canvas"
generateText = require "./generateText"

class Captcha
  constructor: (@options={}) ->
    @options.height ?= 150
    @options.width ?= 300
    @options.text ?= generateText()
    @options.font ?= "sans"

    @_middleware = []

  use: (fn) ->
    @_middleware.push fn
    return @

  reset: ->
    @canvas = new Canvas @options.width, @options.height
    return @

  generate: ->
    @reset()
    for fn in @_middleware
      @canvas = fn @canvas, @options
    return @

  text: => @options.text
  font: => @options.font
  height: => @options.height
  width: => @options.width

  uri: (args...) => @canvas.toDataURL args...
  buffer: (args...) => @canvas.toBuffer args...
  stream: (type="png") =>
    if type.toLowerCase() is "png"
      return @canvas.createPNGStream()
    else if type.toLowerCase() is "jpeg"
      return @canvas.createJPEGStream()
    else
      throw new Error "Invalid stream type"

  audio: (args..., cb) =>
    args = if args.length then args[0] else ['-s 90', '-g 20', '-p 50']
    textSpaced = @options.text.replace /\w/g, '$& '
    speak textSpaced, args, cb

module.exports = Captcha
