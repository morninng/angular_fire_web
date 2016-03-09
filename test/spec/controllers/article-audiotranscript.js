'use strict';

describe('Controller: ArticleAudiotranscriptCtrl', function () {

  // load the controller's module
  beforeEach(module('mixideaWebApp'));

  var ArticleAudiotranscriptCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArticleAudiotranscriptCtrl = $controller('ArticleAudiotranscriptCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ArticleAudiotranscriptCtrl.awesomeThings.length).toBe(3);
  });
});
