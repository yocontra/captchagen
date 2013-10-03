var randomBetween = require('./randomBetween');

var randomColor = function() {
  return randomBetween(0, 255);
};

module.exports = function(count) {
  var colors = [];
  for (var i = 0; i < count; i++) {
    var color = {
      r: randomColor(),
      g: randomColor(),
      b: randomColor()
    };
    color.css = 'rgb('+color.r+','+color.g+','+color.b+')';
    colors.push(color);
  }
  return colors;
};
