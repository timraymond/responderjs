angular.module("ngResponsive", [])
  .provider "$responsive", ->

    @setBreakpoints = (config) ->
      @breakpoints = config

    this.$get = ['$injector', '$rootScope', '$window', ($injector, $rootScope, $window) ->
      responder = new ResponsiveHandler(@breakpoints)
      responder.setInjector($injector)

      return responder
    ]

    return

  .run ['$responsive', '$rootScope', '$window', ($responsive, $rootScope, $window) ->
    $rootScope.windowWidth = $window.outerWidth

    angular.element($window).bind 'resize', ->
      $rootScope.windowWidth = $window.outerWidth
      $rootScope.$apply('windowWidth')

    $rootScope.$watch 'windowWidth', (newVal, oldVal) ->
      $responsive.invokeActionsForScreenSize(newVal)
  ]
