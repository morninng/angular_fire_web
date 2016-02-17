'use strict';

describe('Controller: LoginFormCtrl', function () {

  // load the controller's module
  beforeEach(module('mixideaWebApp'));

  var LoginFormCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginFormCtrl = $controller('LoginFormCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LoginFormCtrl.awesomeThings.length).toBe(3);
  });
});
