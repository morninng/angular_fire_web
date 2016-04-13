'use strict';

/**
 * @ngdoc function
 * @name mixideaWebApp.controller:MypageEventCtrl
 * @description
 * # MypageEventCtrl
 * Controller of the mixideaWebApp
 */
angular.module('mixideaWebApp')
  .controller('MypageEventCtrl', ['$scope','UserAuthService','DataStorageEventService','MixideaSetting', function ($scope, UserAuthService, DataStorageEventService, MixideaSetting) {


  	console.log("MypageEventCtrl");


  	$scope.user = UserAuthService;
  	$scope.event_data = DataStorageEventService;
    $scope.event_id_array = [];
    $scope.event_obj_array = [];
    $scope.current_time = Date.now();


    $scope.upcoming_to = $scope.current_time + 2*24*60*60*1000;
    $scope.upcoming_from = $scope.current_time;

    $scope.undergoing_to = $scope.current_time -1;
    $scope.undergoing_from = $scope.current_time - 2*60*60*1000;

    $scope.mightfinish_to = $scope.current_time - 2*60*60*1000 -1;
    $scope.mightfinish_from = $scope.current_time - 2*24*60*60*1000;


  	$scope.$watch($scope.user.loggedIn , function(){
  		retrieve_own_event_info();
  	});

  	function retrieve_own_event_info(){

	  	if(!$scope.user.loggedIn){
	  		//check login status again after 0.5 seconds 
	  		// if not login popup login dialog
	  	}else{
	  		execute_retrieve_own_event_info();

	  	}
	 }

  	function execute_retrieve_own_event_info(){

  		var user_id = $scope.user.own_uid

      var root_ref = new Firebase(MixideaSetting.firebase_url);
    	var own_event_ref = root_ref.child("users/event_list/" + user_id);
    	own_event_ref.on("value", function(snapshot) {
        var event_list_obj = snapshot.val();

        $scope.event_id_array.length=0;
        for(var key in event_list_obj){
          var obj = {id:key, status:event_list_obj[key]};
          $scope.event_obj_array.push(obj);
          $scope.event_id_array.push(key);
        }
        DataStorageEventService.add_by_array($scope.event_id_array);

    	});
  	}

//retrieve own event info


// send own event id to both datastorageevent-service and datastoragegame-service






  }]);
