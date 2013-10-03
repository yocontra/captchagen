var captchagen = require('../');
var should = require('should');

require('mocha');

describe('create()', function() {
  it('should create with random text randomly', function(done) {
    var captcha = captchagen.create();
    captcha.text().length.should.equal(6);
    done();
  });
});
