range = require './range'

randomColor = -> range 0, 255

module.exports = (count) ->
  return (r:randomColor(),g:randomColor(),b:randomColor() for num in [0..count])