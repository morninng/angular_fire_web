'use strict';

describe('Controller: EventWebchatCtrl', function () {

  // load the controller's module
  beforeEach(module('mixideaWebApp'));

  var EventWebchatCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventWebchatCtrl = $controller('EventWebchatCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EventWebchatCtrl.awesomeThings.length).toBe(3);
  });
});
