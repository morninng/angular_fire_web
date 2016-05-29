'use strict';

describe('Service: EventParticipateService', function () {

  // load the service's module
  beforeEach(module('mixideaWebApp'));

  // instantiate service
  var EventParticipateService;
  beforeEach(inject(function (_EventParticipateService_) {
    EventParticipateService = _EventParticipateService_;
  }));

  it('should do something', function () {
    expect(!!EventParticipateService).toBe(true);
  });

});
