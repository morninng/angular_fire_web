'use strict';

/**
 * @ngdoc function
 * @name mixideaWebApp.controller:ArticleLayoutCtrl
 * @description
 * # ArticleLayoutCtrl
 * Controller of the mixideaWebApp
 */
angular.module('mixideaWebApp')
  .controller('ArticleLayoutCtrl', function ($scope,  $stateParams) {

  	console.log("ArticleLayoutCtrl");

  	var article_id = $stateParams.id;
  	$scope.article_id = article_id;
  	console.log($scope.article_id);



  });
