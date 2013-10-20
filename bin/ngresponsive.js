(function() {
  angular.module("ngResponsive", []).provider("$responsive", function() {
    this.setBreakpoints = function(config) {
      return this.breakpoints = config;
    };
    this.$get = [
      '$injector', '$rootScope', '$window', function($injector, $rootScope, $window) {
        var responder;
        responder = new ResponsiveHandler(this.breakpoints);
        responder.setInjector($injector);
        return responder;
      }
    ];
  }).run([
    '$responsive', '$rootScope', '$window', function($responsive, $rootScope, $window) {
      $rootScope.windowWidth = $window.outerWidth;
      angular.element($window).bind('resize', function() {
        $rootScope.windowWidth = $window.outerWidth;
        return $rootScope.$apply('windowWidth');
      });
      return $rootScope.$watch('windowWidth', function(newVal, oldVal) {
        return $responsive.invokeActionsForScreenSize(newVal);
      });
    }
  ]);

}).call(this);
