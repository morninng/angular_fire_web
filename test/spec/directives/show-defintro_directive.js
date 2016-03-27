'use strict';

describe('Directive: showDefintroDirective', function () {

  // load the directive's module
  beforeEach(module('mixideaWebApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<show-defintro-directive></show-defintro-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the showDefintroDirective directive');
  }));
});
