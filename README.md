[![status](https://travis-ci.org/wearefractal/captchagen.png?branch=master)](https://travis-ci.org/wearefractal/captchagen)

## Information

<table>
<tr> 
<td>Package</td><td>captchagen</td>
</tr>
<tr>
<td>Description</td>
<td>Captcha image generator</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.6</td>
</tr>
</table>

![example](http://7xrltq.com1.z0.glb.clouddn.com/captchagen1)


## Dependencies

This relies on a native module called node-canvas. You will need to install cairo, so read https://github.com/learnboost/node-canvas/wiki before installing.

## Usage

```javascript
var captchagen = require('node-captchagen');
var fs = require('fs');
var img = fs.readFileSync('example.png');
var optional = {
	height: 150, // default is 150
	width: 300, // dafault is 300
	text: 'abc123', // default is six random characters
	backgroundColor: '#EF766A', // default is a random gradient color
	// textColor: '#000', // default is a random color every letter
	font: ' Microsoft YaHei', // default is 'sans'
	fontsize: 70, // default between 0.4*height and 0.6*height
	offset: 50, // default is 3
	img: img // default is none
}
// optional object arg with background, image, lines, points ,text will always output.
var drawOption = {drawBackground: true,drawImage: false,drawLines: true,drawPoints: true}; 
var captcha = captchagen.create(optional,drawOption);
captcha.generate(); // Draws the image to the canvas

/* call `generate()` before running the below */

captcha.uri();      // outputs png data-uri. works sync and async (cb is optional)
captcha.buffer();   // outputs png buffer. works sync and async (cb is optional)
captcha.buffer('png'); // outputs an image stream. type can be either png or jpeg (png is the default)
res.end(captcha.buffer()); // output image or base64 
```

## Middleware

The whole thing is a middleware stack. When you use .create() it uses our default settings which look like this:

```javascript
captcha.use(drawBackground);
captcha.use(drawText);
captcha.use(drawLines);
captcha.use(drawPoints);
```


## LICENSE

(MIT License)

Copyright (c) 2012 Fractal <contact@wearefractal.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/wearefractal/captchagen/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

