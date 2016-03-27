'use strict';

describe('Controller: ArticleWrittendescriptionCtrl', function () {

  // load the controller's module
  beforeEach(module('mixideaWebApp'));

  var ArticleWrittendescriptionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArticleWrittendescriptionCtrl = $controller('ArticleWrittendescriptionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ArticleWrittendescriptionCtrl.awesomeThings.length).toBe(3);
  });
});
