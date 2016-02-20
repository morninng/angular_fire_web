'use strict';

describe('Service: EventSearchService', function () {

  // load the service's module
  beforeEach(module('mixideaWebApp'));

  // instantiate service
  var EventSearchService;
  beforeEach(inject(function (_EventSearchService_) {
    EventSearchService = _EventSearchService_;
  }));

  it('should do something', function () {
    expect(!!EventSearchService).toBe(true);
  });

});
