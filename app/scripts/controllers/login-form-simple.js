'use strict';

/**
 * @ngdoc function
 * @name mixideaWebApp.controller:LoginFormSimpleCtrl
 * @description
 * # LoginFormSimpleCtrl
 * Controller of the mixideaWebApp
 */
angular.module('mixideaWebApp')
  .controller('LoginFormSimpleCtrl',['$scope','UserAuthService','$uibModalInstance', function ($scope, UserAuthService, $uibModalInstance) {


  	$scope.fb_login_show = true;
  	$scope.fb_login_loading_show = false;
  	$scope.user = UserAuthService;


  	$scope.login_fb = function(){
  		console.log("facebook login is clicked");
	  	$scope.fb_login_show = false;
	  	$scope.fb_login_loading_show = true;
  		$scope.user.login();
  	}

	$scope.close_modal = function(){
		$uibModalInstance.close();
	  	$scope.fb_login_show = true;
	  	$scope.fb_login_loading_show = false;
	}


	$scope.$watch('user.regist_complete', function(){
		if($scope.user.regist_complete == true){
		  	$scope.fb_login_show = true;
		  	$scope.fb_login_loading_show = false;
			$uibModalInstance.close();
		}
  	})


  }]);
