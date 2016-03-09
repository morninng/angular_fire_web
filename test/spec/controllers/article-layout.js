'use strict';

describe('Controller: ArticleLayoutCtrl', function () {

  // load the controller's module
  beforeEach(module('mixideaWebApp'));

  var ArticleLayoutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArticleLayoutCtrl = $controller('ArticleLayoutCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ArticleLayoutCtrl.awesomeThings.length).toBe(3);
  });
});
