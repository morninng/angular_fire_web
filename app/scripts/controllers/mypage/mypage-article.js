'use strict';

/**
 * @ngdoc function
 * @name mixideaWebApp.controller:MypageArticleCtrl
 * @description
 * # MypageArticleCtrl
 * Controller of the mixideaWebApp
 */
angular.module('mixideaWebApp')
  .controller('MypageArticleCtrl',['$scope','UserAuthService','DataStorageArticleService','MixideaSetting', function ($scope, UserAuthService, DataStorageArticleService, MixideaSetting) {

  	$scope.user = UserAuthService;
  	$scope.article_data = DataStorageArticleService;
    $scope.article_id_array = [];
    $scope.article_obj_array = [];
    var current_time = Date.now();
    var event_finish_time_criteria = current_time - 2*60*60*1000;


  	$scope.$watch($scope.user.loggedIn , function(){
  		retrieve_own_article_info();
  	});

  	function retrieve_own_article_info(){

	  	if(!$scope.user.loggedIn){
	  		//check login status again after 0.5 seconds 
	  		// if not login popup login dialog
	  	}else{
	  		execute_retrieve_own_article_info();
	  	}
	 }

  	function execute_retrieve_own_article_info(){

  	  var user_id = $scope.user.own_uid

      var root_ref = new Firebase(MixideaSetting.firebase_url);
    	var own_event_ref = root_ref.child("users/event_list/" + user_id);
    	own_event_ref.on("value", function(snapshot) {
        $scope.event_list_obj = snapshot.val();

        $scope.article_id_array.length=0;
        for(var key in $scope.event_list_obj){
          $scope.article_id_array.push(key);
        }
        DataStorageArticleService.add_by_array($scope.article_id_array);

    	});
  	}

    $scope.$watch('article_data.counter' , function(){
      re_organize_data();
    });


    function re_organize_data(){
      for(var key in $scope.event_list_obj){
        var obj = {id:key};
        var event_time = DataStorageArticleService.all_data[key].date_time;
        obj.time = event_time;

        var include = false;
        if(  event_time < event_finish_time_criteria && $scope.event_list_obj[key] !="cancelled"){
          include = true;
        } 
        if(include==true){
          $scope.article_obj_array.push(obj);  
        }
      }

    }


  }]);
