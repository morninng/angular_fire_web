'use strict';

describe('Controller: EventCalendarCtrl', function () {

  // load the controller's module
  beforeEach(module('mixideaWebApp'));

  var EventCalendarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventCalendarCtrl = $controller('EventCalendarCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
