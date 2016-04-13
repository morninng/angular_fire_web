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
    $scope.event_list_obj = new Object();

    var upcoming_to = $scope.current_time + 2*24*60*60*1000;
    var upcoming_from = $scope.current_time;
    var undergoing_to = $scope.current_time -1;
    var undergoing_from = $scope.current_time - 2*60*60*1000;

    var mightfinish_to = $scope.current_time - 2*60*60*1000 -1;
    var mightfinish_from = $scope.current_time - 2*24*60*60*1000;


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
        $scope.event_list_obj = snapshot.val();

        $scope.event_id_array.length=0;
        for(var key in $scope.event_list_obj){
          $scope.event_id_array.push(key);
        }
        DataStorageEventService.add_by_array($scope.event_id_array);

    	});
  	}

    $scope.$watch('event_data.counter' , function(){
      re_organize_data();
    });

    function re_organize_data(){

      for(var key in $scope.event_list_obj){
        var obj = {id:key, status:$scope.event_list_obj[key]};
        var event_time = DataStorageEventService.all_data[key].date_time;
        obj.time = event_time;

        var include = false;
        if( (mightfinish_from <  event_time) && ( event_time < mightfinish_to ) ){
          obj.style = "mightfinish";
          include = true;
          //$scope.event_obj_array.push(obj);
        } else if ((undergoing_from <  event_time) && ( event_time < undergoing_to ) ){
          obj.style = "undergoing";
          include = true;
          //$scope.event_obj_array.push(obj);     
        } else if ((upcoming_from <  event_time) && ( event_time < upcoming_to ) ){
          obj.style = "upcoming";
          include = true;
          //$scope.event_obj_array.push(obj);     
        } else if (upcoming_to <  event_time ){
          obj.style = "planned";
          include = true;
          //$scope.event_obj_array.push(obj);     
        }
        if(obj.status == "cancelled"){
          obj.style="cancelled"
        }
        if(include==true){
          $scope.event_obj_array.push(obj);  
        }

      }


    }
//retrieve own event info


// send own event id to both datastorageevent-service and datastoragegame-service






  }]);
