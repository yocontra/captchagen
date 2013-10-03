captchagen = require '../'
should = require 'should'
require 'mocha'

describe 'create()', ->
  it 'should create with random text randomly', (done) ->
    captcha = captchagen.create()
    captcha.text().length.should.equal 6
    done()