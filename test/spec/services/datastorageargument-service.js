'use strict';

describe('Service: DataStorageArgumentService', function () {

  // load the service's module
  beforeEach(module('mixideaWebApp'));

  // instantiate service
  var DataStorageArgumentService;
  beforeEach(inject(function (_DataStorageArgumentService_) {
    DataStorageArgumentService = _DataStorageArgumentService_;
  }));

  it('should do something', function () {
    expect(!!DataStorageArgumentService).toBe(true);
  });

});
