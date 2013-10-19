Responder.js
============

A configurable mini library for triggering actions at custom breakpoints.

Usage
-----

Let's say we have a website that we want to trigger certain functions at mobile, tablet, and desktop breakpoints.
We can configure responder.js like this:

```
  var responsive = new ResponsiveHandler({
    mobile: "0px-480px",
    tablet: "480px-768px",
    desktop: "768px-max"
  });
```
  
We can then forget about breakpoints and setup actions to happen at the breakpoints we set up.

```
  responsive.mobile(function() {
    console.log("I'll only be triggered on mobile");
  });
  
  responsive.desktop(function() {
    console.log("Desktop only");
  });
  
  responsive.mobile().tablet(function() {
    console.log("I'll be triggered on mobile and tablet, but not desktop");
  });
```

Installation
------------

```
  bower install responderjs
```

License
-------

The MIT License (MIT)

Copyright (c) 2013 Timothy J. Raymond

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
