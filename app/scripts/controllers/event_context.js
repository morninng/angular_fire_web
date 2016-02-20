'use strict';

angular.module('mixideaWebApp')
  .controller('EventContextCtrl', function ($scope, $stateParams,  $firebaseObject,$timeout) {

  	var event_id = $stateParams.id;
  	$scope.event_obj = new Object();


    var root_ref = new Firebase("https://mixidea.firebaseio.com/");
    var event_ref = root_ref.child("event_related/event/" + event_id);
    event_ref.on("value", function(snapshot){

    	$timeout(function() {
	    	var event_obj = snapshot.val();
	    	$scope.event_obj.context = event_obj.context;
	    	var date_time_value = event_obj.date_time;
	    	var event_date = new Date(date_time_value);
	    	$scope.event_obj.date_time = event_date;
	    	$scope.event_obj.motion = event_obj.motion;
	    	$scope.event_obj.context = event_obj.context;
	    	$scope.event_obj.prerequisit = event_obj.prerequisit;
	    	$scope.event_obj.deb_style = event_obj.deb_style;
	    	$scope.event_obj.deb_skill = event_obj.deb_skill;
	    });

    },function(){

    });


	$scope.join_as_debater = function(){

	}

	$scope.join_as_audience = function(){

	}

	$scope.join_as_AudOrDebater = function(){

	}

  });
