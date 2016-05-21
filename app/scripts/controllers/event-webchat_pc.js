'use strict';

/**
 * @ngdoc function
 * @name mixideaWebApp.controller:EventWebchatCtrl
 * @description
 * # EventWebchatCtrl
 * Controller of the mixideaWebApp
 */
angular.module('mixideaWebApp')
  .controller('EventWebchatPcCtrl',['$scope','EventWebchatMessageService','DataStorageUserService','$timeout', function ($scope, EventWebchatMessageService, DataStorageUserService, $timeout) {

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


      var screen_type = $scope.$parent.webchat_screentype;
      console.log(screen_type);

      if(screen_type == "ScreenBottom"){
        $scope.$emit("close_ScreenBottom_chat_window");

      }else{
       // $uibModalInstance.close('done');
      }

    }

    $scope.click_title = function(){
      EventWebchatMessageService.goto_eventsite();

    }


  }]);
