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
    for name, breakpoint of config
      do (breakpoint) =>
        this[name] = (action) ->
            @action_queue.push
              min_size: parse_min_size(breakpoint)
              max_size: parse_max_size(breakpoint)
              lambda: action
        this[name]

  invokeActionsForScreenSize: (size) ->
    for action in @action_queue
      if action.min_size < size && size <= action.max_size
        action.lambda.apply(document)
