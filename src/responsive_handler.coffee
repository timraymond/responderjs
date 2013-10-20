class @ResponsiveHandler

  parse_size = (size) ->
    if /^max/.test size
      Infinity
    else
      parseInt size[0..-3]

  parse_min_size = (size) ->
    parse_size(size.match(/(.+)\-(.+)/)[1])

  parse_max_size = (size) ->
    parse_size(size.match(/(.+)\-(.+)/)[2])

  constructor: (@config) ->
    @action_queue = []
    @waiting_stack = []
    for name, breakpoint of config
      do (breakpoint) =>
        this[name] = (action) ->
            if arguments.length == 0
              @waiting_stack.push {name: name, breakpoint: breakpoint}
            else
              @waiting_stack.push {name: name, breakpoint: breakpoint}
              for waiting in @waiting_stack
                @action_queue.push
                  min_size: parse_min_size(waiting.breakpoint)
                  max_size: parse_max_size(waiting.breakpoint)
                  lambda: action
              @waiting_stack = []
            return this

  setInjector: (injector) ->
    @injector = injector

  invokeActionsForScreenSize: (size) ->
    for action in @action_queue
      if action.min_size < size && size <= action.max_size
        if @injector
          @injector.invoke(action.lambda)
        else
          action.lambda.apply(document)
