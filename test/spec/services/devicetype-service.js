'use strict';

describe('Service: DeviceTypeService', function () {

  // load the service's module
  beforeEach(module('mixideaWebApp'));

  // instantiate service
  var DeviceTypeService;
  beforeEach(inject(function (_DeviceTypeService_) {
    DeviceTypeService = _DeviceTypeService_;
  }));

  it('should do something', function () {
    expect(!!DeviceTypeService).toBe(true);
  });

});
