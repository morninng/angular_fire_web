'use strict';

/**
 * @ngdoc function
 * @name mixideaWebApp.controller:JoinEventCtrl
 * @description
 * # JoinEventCtrl
 * Controller of the mixideaWebApp
 */
angular.module('mixideaWebApp')
  .controller('JoinEventCtrl',['$scope','$uibModalInstance','params','$state','EventParticipateService','$timeout','UserAuthService','EventUtil', function ($scope, $uibModalInstance, params ,$state, EventParticipateService, $timeout, UserAuthService, EventUtil) {

	var myCarousel_element = document.getElementById("myCarousel")
	var carousel_element = angular.element(myCarousel_element);
	$scope.event_join_process = "input";
  $scope.checked = new Object();
  $scope.checked.device = false;
  $scope.checked.debate_skill = false;
  $scope.checked.ontime = false;
  $scope.event_participant = EventParticipateService;
  $scope.user = UserAuthService;
  $scope.message = new Object();
  //$scope.checked. = false;
  //$scope.checked.device = false;

  $scope.event_date = params.event_date;
  var event_id = params.event_id;

  $scope.message.data = "I am " + UserAuthService.first_name + " " + UserAuthService.last_name + " I am looking forward to debate with you";

  $scope.calendar_link = EventUtil.set_google_calendar_info($scope.event_date);


	$scope.click_next = function(in_param){
		switch(in_param){
      case "calendar_invite":
        $scope.event_join_process = "complete";
      break;
			case "message":
				$scope.event_join_process = "input";
			break;
		}
	}

  function succeed_regist_cb(){
    $scope.event_join_process = "message";
    $timeout(function() {});
  }
  function fail_regist_cb(){
    $scope.event_join_process = "input";
    $timeout(function() {});
  }


  $scope.click_join = function(role){
    $scope.event_join_process = "under_process";
    $timeout(function() {});
    EventParticipateService.join(role, succeed_regist_cb, fail_regist_cb);

  }



  $scope.click_send = function(){


    if($scope.message.data){
      EventUtil.submit_chat(event_id, $scope.message.data, $scope.event_date)
    }
    $scope.message.data = null;
    $scope.event_join_process = "calendar_invite";
  }

  $scope.click_complete = function(){
    console.log($scope.checked.device);
    $scope.event_join_process = "calendar_invite";
  }

  $scope.goback_eventpage = function(){
    $uibModalInstance.close();
  }

  $scope.goto_mypage = function(){
    $uibModalInstance.close();
    $state.go('mypage');
  }


}]);
