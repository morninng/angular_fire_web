'use strict';

describe('Controller: CreateEventCtrl', function () {

  // load the controller's module
  beforeEach(module('mixideaWebApp'));

  var CreateEventCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateEventCtrl = $controller('CreateEventCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CreateEventCtrl.awesomeThings.length).toBe(3);
  });
});
