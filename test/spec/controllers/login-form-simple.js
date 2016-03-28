'use strict';

describe('Controller: LoginFormSimpleCtrl', function () {

  // load the controller's module
  beforeEach(module('mixideaWebApp'));

  var LoginFormSimpleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginFormSimpleCtrl = $controller('LoginFormSimpleCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LoginFormSimpleCtrl.awesomeThings.length).toBe(3);
  });
});
