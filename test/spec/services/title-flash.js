'use strict';

describe('Service: TitleFlash', function () {

  // load the service's module
  beforeEach(module('mixideaWebApp'));

  // instantiate service
  var TitleFlash;
  beforeEach(inject(function (_TitleFlash_) {
    TitleFlash = _TitleFlash_;
  }));

  it('should do something', function () {
    expect(!!TitleFlash).toBe(true);
  });

});
