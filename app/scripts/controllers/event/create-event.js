'use strict';

/**
 * @ngdoc function
 * @name mixideaWebApp.controller:CreateEventCtrl
 * @description
 * # CreateEventCtrl
 * Controller of the mixideaWebApp
 */
angular.module('mixideaWebApp')
  .controller('CreateEventCtrl',["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {

  	console.log("CreateEventCtrl");

    $scope.event_create_status = "input";
    $scope.event_date = null;
    $scope.event_time = null;
    $scope.context = null;
    $scope.deb_style = null;
    $scope.exp_deb_skill = null;
    $scope.exp_lang_skil = null;
    $scope.event_time = null;
    $scope.date_time = null;
    $scope.motion = null;
    $scope.prerequisit = null;
    $scope.event_id = null;

  	$scope.click_cancel = function(){
  		console.log("cancel button is clicked");
      $uibModalInstance.close();
	}

}]);


angular.module('mixideaWebApp')
  .controller('CreateEventInputCtrl',["$scope", function ($scope) {

	var current_date = new Date(); 
	$scope.minDate = current_date.setDate(current_date.getDate()-1);
	var init_time = new Date(2015,1,1,0,0);
	$scope.event_time = init_time;
	$scope.context_maxchar = 350;
	$scope.context_minchar = 20;
	$scope.show_time = false;


    $scope.click_create = function(){

      console.log("create button is clicked");
      console.log($scope.$parent.event_create_status);

      if(!$scope.event_date || 
        !$scope.context || 
        $scope.context.length > $scope.context_maxchar  || 
        $scope.context.length < $scope.context_minchar ||
        !$scope.show_time){
        alert("input data error");
        return;

      }else{
        $scope.$parent.$parent.date_time = new Date();
        $scope.$parent.$parent.date_time.setYear($scope.event_date.getFullYear());
        $scope.$parent.$parent.date_time.setMonth($scope.event_date.getMonth());
        $scope.$parent.$parent.date_time.setDate($scope.event_date.getDate());
        $scope.$parent.$parent.date_time.setHours($scope.event_time.getHours());
        $scope.$parent.$parent.date_time.setMinutes($scope.event_time.getMinutes());

        $scope.$parent.$parent.event_date = $scope.event_date;
        $scope.$parent.$parent.context = $scope.context;
        $scope.$parent.$parent.deb_style = $scope.deb_style;
        $scope.$parent.$parent.exp_deb_skill = $scope.exp_deb_skill;
        $scope.$parent.$parent.exp_lang_skil = $scope.exp_lang_skil;
        $scope.$parent.$parent.event_time = $scope.event_time;
        $scope.$parent.$parent.motion = $scope.motion;
        $scope.$parent.$parent.prerequisit = $scope.prerequisit;

        $scope.$parent.$parent.event_create_status = "confirm";

       // $scope.$emit('status_change', "confirm");
        return;
      }
    }


    $scope.time_changed = function(){
      $scope.show_time = true;
    }

}]);


angular.module('mixideaWebApp')
  .controller('CreateEventConfirmCtrl',["$scope", "UserAuthService","$timeout", function ($scope, UserAuthService,$timeout) {

    $scope.click_save = function(){

      var event_date = $scope.$parent.$parent.date_time.getTime();
      var event_time = $scope.$parent.$parent.date_time.getUTCHours() * 60 + 
      						$scope.$parent.$parent.date_time.getUTCMinutes();

      console.log("sss");

      var event_obj = {
      	"date_time": event_date,
      	"time":event_time,
      	"deb_style": $scope.$parent.$parent.deb_style,
      	"context": $scope.$parent.$parent.context,
      	"deb_skill": $scope.$parent.$parent.exp_deb_skill,
      	"lang_skil": $scope.$parent.$parent.exp_lang_skil,
      	"motion": $scope.$parent.$parent.motion,
      	"prerequisit": $scope.$parent.$parent.prerequisit,
      	"created_by": UserAuthService.own_uid
      }
      var game_obj = {
      	"deb_style": $scope.$parent.$parent.deb_style,
      	"motion":$scope.$parent.$parent.motion,
      	"game_status": "introduction",
      	"type": "debate",
      }

      var root_ref = new Firebase("https://mixidea.firebaseio.com/");
      var event_ref = root_ref.child("event_related/event");
      var event_obj_ref = event_ref.push(event_obj, function(error){
      	if(error){
      		console.log("fail to save");
      	}else {
      		var event_id = event_obj_ref.key();
      		var game_ref = root_ref.child("event_related/game/" + event_id);
      		game_ref.set(game_obj, function(error){
      			if(error){
      				console.log("error occured");
      			} else {
      				console.log("succeed to save");
              $scope.$parent.$parent.event_id = event_id;
              $timeout(function() {
        			   $scope.$parent.$parent.event_create_status = "saved";
              });
      			}
      		})
      	}
      });
      return;
    }

 
    $scope.go_back_edit = function(){

        $scope.$parent.$parent.event_create_status = "input";

    }

}]);


angular.module('mixideaWebApp')
  .controller('CreateEventCompleteCtrl',["$scope", "$state", function ($scope,$state) {


    $scope.goto_event_window = function(){
      console.log($scope.$parent.$parent.event_id);
      var event_id = $scope.$parent.$parent.event_id;
      $state.go("/eventcontext_layout_two_column.context", {id:event_id});
      $scope.$parent.$parent.click_cancel();
      return;
    }

}]);


