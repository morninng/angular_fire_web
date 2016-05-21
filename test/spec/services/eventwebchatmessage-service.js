'use strict';

describe('Service: EventWebchatMessageService', function () {

  // load the service's module
  beforeEach(module('mixideaWebApp'));

  // instantiate service
  var EventWebchatMessageService;
  beforeEach(inject(function (_EventWebchatMessageService_) {
    EventWebchatMessageService = _EventWebchatMessageService_;
  }));

  it('should do something', function () {
    expect(!!EventWebchatMessageService).toBe(true);
  });

});
