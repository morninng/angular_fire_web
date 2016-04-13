'use strict';

describe('Service: DataStorageArticleService', function () {

  // load the service's module
  beforeEach(module('mixideaWebApp'));

  // instantiate service
  var DataStorageArticleService;
  beforeEach(inject(function (_DataStorageArticleService_) {
    DataStorageArticleService = _DataStorageArticleService_;
  }));

  it('should do something', function () {
    expect(!!DataStorageArticleService).toBe(true);
  });

});
