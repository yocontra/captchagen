captchagen = require '../'
should = require 'should'
open = require 'open'
require 'mocha'

describe 'text()', ->
  it 'should return the input value', (done) ->
    captcha = captchagen.create text: 'test'
    captcha.text().should.equal 'test'
    done()

describe 'uri()', ->
  it 'should work synchronously', (done) ->
    captcha = captchagen.create()
    captcha.generate()
    uri = captcha.uri()
    console.log uri
    should.exist uri
    done()

###
describe 'audio()', ->
  it 'should give wav object', (done) ->
    captcha = captchagen.create()
    captcha.audio (err, wav) ->
      should.not.exist err
      should.exist wav
      should.exist wav.buffer
      should.exist wav.toDataUri()
      done()
###