'use strict';

describe('Service: MixideaInitialSetting', function () {

  // load the service's module
  beforeEach(module('mixideaWebApp'));

  // instantiate service
  var MixideaInitialSetting;
  beforeEach(inject(function (_MixideaInitialSetting_) {
    MixideaInitialSetting = _MixideaInitialSetting_;
  }));

  it('should do something', function () {
    expect(!!MixideaInitialSetting).toBe(true);
  });

});
