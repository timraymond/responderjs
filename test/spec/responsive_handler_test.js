define(['bin/responsive_handler'], function(ResponsiveHandler) {
  describe("ResponsiveHandler", function() {
    it("defines ResponsiveHandler on window", function() {
      expect(window.ResponsiveHandler).toBeDefined();
    });

    it("defines a mobile function when I pass in a mobile breakpoint", function() {
      var responsive = new window.ResponsiveHandler({mobile: "767px"});
      expect(responsive.mobile).toBeDefined();
    });

    it("only runs mobile functions when screen size is less than that resolution", function() {
      var result;
      var responsive = new window.ResponsiveHandler({mobile: "0px-767px"});
      mobile = jasmine.createSpy('mobile')
      responsive.mobile(mobile)
      responsive.invokeActionsForScreenSize(300);
      expect(mobile).toHaveBeenCalled();
    });

    it("doesn't run any actions above the breakpoint for the current size", function() {
      var responsive = new window.ResponsiveHandler(
        {
          mobile:  "0px-700px",
          tablet:  "700px-1000px",
          desktop: "1000px-max"
        }
      );

      mobile = jasmine.createSpy('mobile')
      tablet = jasmine.createSpy('tablet')
      desktop = jasmine.createSpy('desktop')

      responsive.mobile(mobile);
      responsive.tablet(tablet)
      responsive.desktop(desktop)

      responsive.invokeActionsForScreenSize(300);
      expect(mobile).toHaveBeenCalled()
      expect(tablet.callCount).toBe(0)
      expect(desktop.callCount).toBe(0)
    });

    it("sets an action to happen on more than one resolution by chaining", function() {
      var responsive = new window.ResponsiveHandler(
        {
          mobile:  "0px-700px",
          tablet:  "700px-1000px",
          desktop: "1000px-max"
        }
      );

      mobileAndDesktop = jasmine.createSpy('mobile')
      tablet = jasmine.createSpy('tablet')

      responsive.mobile().desktop(mobileAndDesktop);

      responsive.invokeActionsForScreenSize(1200);
      responsive.invokeActionsForScreenSize(300);

      expect(mobileAndDesktop.callCount).toBe(2);
    });
  });
});
