'use strict';

/**
 * @ngdoc function
 * @name mixideaWebApp.controller:EventWebchatCtrl
 * @description
 * # EventWebchatCtrl
 * Controller of the mixideaWebApp
 */
angular.module('mixideaWebApp')
  .controller('EventWebchatMobileCtrl',['$scope','EventWebchatMessageService','DataStorageUserService','$timeout','$uibModalInstance', function ($scope, EventWebchatMessageService, DataStorageUserService, $timeout, $uibModalInstance) {

  	$scope.webchat_message = EventWebchatMessageService;
  	$scope.chat_text_input = new Object();
    $scope.user_service = DataStorageUserService;

  	$scope.chat_keyup = function(e){
  		console.log(e.which);
  		if(e.which==13){
  			var message = $scope.chat_text_input.message
  			EventWebchatMessageService.send_message(message);
  			$scope.chat_text_input.message = null;
        //$timeout(function(){});
  		}
  	}

    $scope.close_window = function(){
      EventWebchatMessageService.finalize(); 
      $uibModalInstance.close('done');


    }

    $scope.click_title = function(){
      EventWebchatMessageService.goto_eventsite();
      $uibModalInstance.close('done');
      EventWebchatMessageService.finalize();

    }

    $scope.$on("$destroy", function handler() {
      console.log("event webchat controller destroyed");
      EventWebchatMessageService.finalize();
    });


  }]);
