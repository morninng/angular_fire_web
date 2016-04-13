'use strict';

describe('Controller: MypageArticleCtrl', function () {

  // load the controller's module
  beforeEach(module('mixideaWebApp'));

  var MypageArticleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MypageArticleCtrl = $controller('MypageArticleCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MypageArticleCtrl.awesomeThings.length).toBe(3);
  });
});
