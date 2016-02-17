'use strict';

describe('Controller: HeaderUserCtrl', function () {

  // load the controller's module
  beforeEach(module('mixideaWebApp'));

  var HeaderUserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HeaderUserCtrl = $controller('HeaderUserCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HeaderUserCtrl.awesomeThings.length).toBe(3);
  });
});
