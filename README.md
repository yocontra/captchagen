![status](https://secure.travis-ci.org/wearefractal/captchagen.png?branch=master)

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

![example](http://i.imgur.com/ASDf4.png)

## Usage

```coffee-script
c = require 'captchagen'

captcha = c.generate()

captcha.text() # Outputs captcha text (6 chars by default)
captcha.uri() # Outputs png data uri - optional callback param for async (mandatory in node >=0.8)
captcha.buffer() # Outputs node buffer - optional callback param for async

# Audio via espeak (thanks @freewil)
captcha.audio (err, wav) ->
  wav.toDataUri() # Outputs wav data uri
  wav.buffer # Outputs node buffer
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