captchagen = require '../'
should = require 'should'
require 'mocha'

describe 'text()', ->
  it 'should return the input value', (done) ->
    captcha = captchagen.generate text: 'test'
    captcha.text().should.equal 'test'
    done()

describe 'uri()', ->
  it 'should work synchronously', (done) ->
    captcha = captchagen.generate()
    uri = captcha.uri()
    should.exist uri
    done()