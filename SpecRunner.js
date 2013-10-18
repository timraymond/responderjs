require.config({
  baseUrl: "/src",
  urlArgs: 'cb=' + Math.random(),
  paths: {
    spec: '../../test/spec',
    jquery: '../bower_components/jquery/jquery.min',
    src: '../src',
    bin: '../bin'
  }
});

require(['jquery', 'spec/index'], function($, index) {
  var jasmineEnv = jasmine.getEnv(),
      htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  }

  $(function() {
    require(index.specs, function() {
      jasmineEnv.execute();
    });
  });
});
