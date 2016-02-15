'use strict';

describe('Controller: EventLayoutCtrl', function () {

  // load the controller's module
  beforeEach(module('mixideaWebApp'));

  var EventLayoutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventLayoutCtrl = $controller('EventLayoutCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
