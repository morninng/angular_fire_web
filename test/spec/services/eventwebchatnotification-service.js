'use strict';

describe('Service: EventWebchatNotificationService', function () {

  // load the service's module
  beforeEach(module('mixideaWebApp'));

  // instantiate service
  var EventWebchatNotificationService;
  beforeEach(inject(function (_EventWebchatNotificationService_) {
    EventWebchatNotificationService = _EventWebchatNotificationService_;
  }));

  it('should do something', function () {
    expect(!!EventWebchatNotificationService).toBe(true);
  });

});
