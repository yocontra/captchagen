captchagen = require '../'
should = require 'should'
require 'mocha'

describe 'generate()', ->
  it 'should generate randomly', (done) ->
    captcha = captchagen.generate()
    captcha.text().length.should.equal 6
    done()