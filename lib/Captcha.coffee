{speak} = require 'espeak'

class Captcha
  constructor: (@_canvas, @_text) ->

  text: => @_text
  height: => @_canvas.height
  width: => @_canvas.width
  uri: (args...) => @_canvas.toDataURL args...
  buffer: (args...) => @_canvas.toBuffer args...
  stream: (type="png") =>
    if type.toLowerCase() is "png"
      return @_canvas.createPNGStream()
    else if type.toLowerCase() is "jpeg"
      return @_canvas.createJPEGStream()
    else
      throw new Error "Invalid stream type"
  audio: (args..., cb) =>
    args = if args.length then args[0] else ['-s 90', '-g 20', '-p 50']
    textSpaced = @_text.replace /\w/g, '$& '
    speak textSpaced, args, cb

module.exports = Captcha
