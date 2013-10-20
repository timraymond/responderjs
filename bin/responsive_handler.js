(function() {
  this.ResponsiveHandler = (function() {
    var parse_max_size, parse_min_size, parse_size;

    parse_size = function(size) {
      if (/^max/.test(size)) {
        return Infinity;
      } else {
        return parseInt(size.slice(0, -2));
      }
    };

    parse_min_size = function(size) {
      return parse_size(size.match(/(.+)\-(.+)/)[1]);
    };

    parse_max_size = function(size) {
      return parse_size(size.match(/(.+)\-(.+)/)[2]);
    };

    function ResponsiveHandler(config) {
      var breakpoint, name, _fn,
        _this = this;
      this.config = config;
      this.action_queue = [];
      this.waiting_stack = [];
      _fn = function(breakpoint) {
        return _this[name] = function(action) {
          var waiting, _i, _len, _ref;
          if (arguments.length === 0) {
            this.waiting_stack.push({
              name: name,
              breakpoint: breakpoint
            });
          } else {
            this.waiting_stack.push({
              name: name,
              breakpoint: breakpoint
            });
            _ref = this.waiting_stack;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              waiting = _ref[_i];
              this.action_queue.push({
                min_size: parse_min_size(waiting.breakpoint),
                max_size: parse_max_size(waiting.breakpoint),
                lambda: action
              });
            }
            this.waiting_stack = [];
          }
          return this;
        };
      };
      for (name in config) {
        breakpoint = config[name];
        _fn(breakpoint);
      }
    }

    ResponsiveHandler.prototype.setInjector = function(injector) {
      return this.injector = injector;
    };

    ResponsiveHandler.prototype.invokeActionsForScreenSize = function(size) {
      var action, _i, _len, _ref, _results;
      _ref = this.action_queue;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        action = _ref[_i];
        if (action.min_size < size && size <= action.max_size) {
          if (this.injector) {
            _results.push(this.injector.invoke(action.lambda));
          } else {
            _results.push(action.lambda.apply(document));
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return ResponsiveHandler;

  })();

}).call(this);
