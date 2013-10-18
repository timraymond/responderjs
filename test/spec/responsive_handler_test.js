define(['bin/responsive_handler'], function(ResponsiveHandler) {
  describe("ResponsiveHandler", function() {
    it("defines ResponsiveHandler on window", function() {
      expect(window.ResponsiveHandler).toBeDefined();
    });

    it("defines a mobile function when I pass in a mobile breakpoint", function() {
      var responsive = new window.ResponsiveHandler({mobile: "767px"});
      expect(responsive.mobile).toBeDefined();
    });
  });
});
