'use strict';

describe('Service: EventUtil', function () {

  // load the service's module
  beforeEach(module('mixideaWebApp'));

  // instantiate service
  var EventUtil;
  beforeEach(inject(function (_EventUtil_) {
    EventUtil = _EventUtil_;
  }));

  it('should do something', function () {
    expect(!!EventUtil).toBe(true);
  });

});
