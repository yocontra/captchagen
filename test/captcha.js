var captchagen = require('../');
var should = require('should');

require('mocha');

describe('text()', function() {
  it('should return the input value', function(done) {
    var captcha = captchagen.create({
      text: 'test'
    });
    captcha.text().should.equal('test');
    done();
  });
});

describe('uri()', function() {
  it('should work synchronously', function(done) {
    var captcha = captchagen.create();
    captcha.generate();
    var uri = captcha.uri();
    console.log(uri);
    should.exist(uri);
    done();
  });
});