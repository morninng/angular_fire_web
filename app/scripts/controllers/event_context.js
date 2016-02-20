'use strict';

angular.module('mixideaWebApp')
  .controller('EventContextCtrl',['$scope', '$stateParams',  '$firebaseObject','$timeout', function ($scope, $stateParams,  $firebaseObject,$timeout) {

  	var event_id = $stateParams.id;
  	$scope.event_obj = new Object();


    var root_ref = new Firebase("https://mixidea.firebaseio.com/");
    var event_ref = root_ref.child("event_related/event/" + event_id);
    event_ref.on("value", function(snapshot){
    	$timeout(function() {
    		$scope.event_obj = snapshot.val();
	    });
    },function(){
    	
    });


	$scope.join_as_debater = function(){

	}

	$scope.join_as_audience = function(){

	}

	$scope.join_as_AudOrDebater = function(){

	}

  }]);
