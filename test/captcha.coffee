captchagen = require '../'
should = require 'should'
require 'mocha'

describe 'text()', ->
  it 'should return the input value', (done) ->
    captcha = captchagen.generate text: 'test'
    captcha.text().should.equal 'test'
    done()

describe 'uri()', ->
  # synchronous broken in node 0.8.x
  # see: https://github.com/LearnBoost/node-canvas/issues/182
  it 'should work synchronously', (done) ->
    captcha = captchagen.generate()
    uri = captcha.uri()
    should.exist uri
    done()
    
describe 'audio()', ->
  it 'should give wav object', (done) ->
    captcha = captchagen.generate()
    captcha.audio (err, wav) ->
      should.not.exist err
      should.exist wav
      should.exist wav.buffer
      should.exist wav.toDataUri()
      done()
