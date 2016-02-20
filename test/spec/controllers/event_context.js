'use strict';

describe('Controller: EventContextCtrl', function () {

  // load the controller's module
  beforeEach(module('mixideaWebApp'));

  var EventContextCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventContextCtrl = $controller('EventContextCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
