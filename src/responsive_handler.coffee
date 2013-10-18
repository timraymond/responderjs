class @ResponsiveHandler

  constructor: (@config) ->
    parse_size = (size) ->
      if /^max/.test size
        Infinity
      else
        parseInt size[0..-3]

    @action_queue = []
    for name, breakpoint of config
      size = parse_size(breakpoint)
      this[name] = (action) ->
          @action_queue.push
            size: size
            lambda: action

  invokeActionsForScreenSize: (size) ->
    for action in @action_queue
      if size < action.size
        action.lambda.apply(document)
