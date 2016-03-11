'use strict';

describe('Service: UserDataStorageService', function () {

  // load the service's module
  beforeEach(module('mixideaWebApp'));

  // instantiate service
  var UserDataStorageService;
  beforeEach(inject(function (_UserDataStorageService_) {
    UserDataStorageService = _UserDataStorageService_;
  }));

  it('should do something', function () {
    expect(!!UserDataStorageService).toBe(true);
  });

});
