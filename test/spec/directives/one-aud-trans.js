'use strict';

describe('Directive: oneAudTrans', function () {

  // load the directive's module
  beforeEach(module('mixideaWebApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<one-aud-trans></one-aud-trans>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the oneAudTrans directive');
  }));
});
