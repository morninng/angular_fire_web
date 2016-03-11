'use strict';

/**
 * @ngdoc function
 * @name mixideaWebApp.controller:ArticleLayoutCtrl
 * @description
 * # ArticleLayoutCtrl
 * Controller of the mixideaWebApp
 */
angular.module('mixideaWebApp')
  .controller('ArticleLayoutCtrl', function ($scope,  $stateParams, UserDataStorageService, MixideaSetting) {

  	console.log("ArticleLayoutCtrl");

  	var article_id = $stateParams.id;
  	$scope.article_id = article_id;
  	console.log($scope.article_id);


    var root_ref = new Firebase(MixideaSetting.firebase_url);
	var full_participants_ref = root_ref.child("event_related/participants/" + article_id + "/full")
	full_participants_ref.once("value", function(snapshot) {
		var participants_array_obj  = snapshot.val();
		if(participants_array_obj){
		  console.log(participants_array_obj);
		  var user_id_array = new Array();
		  for(var key in participants_array_obj){
		  	user_id_array.push(key);
		  }
		  UserDataStorageService.add_by_array(user_id_array);
		}
	});





  });
