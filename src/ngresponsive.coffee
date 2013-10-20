angular.module("ngResponsive", [])
  .provider "$responsive", ->

    @setBreakpoints = (config) ->
      @breakpoints = config

    this.$get = ($injector, $rootScope, $window) ->
      responder = new ResponsiveHandler(@breakpoints)
      responder.setInjector($injector)

      return responder

  .run ($responsive, $rootScope, $window) ->
    $rootScope.windowWidth = $window.outerWidth

    angular.element($window).bind 'resize', ->
      $rootScope.windowWidth = $window.outerWidth
      $rootScope.$apply('windowWidth')

    $rootScope.$watch 'windowWidth', (newVal, oldVal) ->
      $responsive.invokeActionsForScreenSize(newVal)
