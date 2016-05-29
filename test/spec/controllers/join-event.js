'use strict';

describe('Controller: JoinEventCtrl', function () {

  // load the controller's module
  beforeEach(module('mixideaWebApp'));

  var JoinEventCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JoinEventCtrl = $controller('JoinEventCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(JoinEventCtrl.awesomeThings.length).toBe(3);
  });
});
