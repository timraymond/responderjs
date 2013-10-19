Responder.js
============

A configurable mini library for triggering actions at custom breakpoints.

Usage
-----

Let's say we have a website that we want to trigger certain functions at mobile, tablet, and desktop breakpoints.
We can configure responder.js like this:

  var responsive = new ResponsiveHandler({
    mobile: "0px-480px",
    tablet: "480px-768px",
    desktop: "768px-max"
  });
  
We can then forget about breakpoints and setup actions to happen at the breakpoints we set up.

  responsive.mobile(function() {
    console.log("I'll only be triggered on mobile");
  });
  
  responsive.desktop(function() {
    console.log("Desktop only");
  });
  
  responsive.mobile().tablet(function() {
    console.log("I'll be triggered on mobile and tablet, but not desktop");
  });
  
Installation
------------

  bower install responderjs
