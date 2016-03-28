'use strict';

describe('Service: CheckBrowserService', function () {

  // load the service's module
  beforeEach(module('mixideaWebApp'));

  // instantiate service
  var CheckBrowserService;
  beforeEach(inject(function (_CheckBrowserService_) {
    CheckBrowserService = _CheckBrowserService_;
  }));

  it('should do something', function () {
    expect(!!CheckBrowserService).toBe(true);
  });

});
