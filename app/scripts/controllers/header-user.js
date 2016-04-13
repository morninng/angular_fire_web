'use strict';

/**
 * @ngdoc function
 * @name mixideaWebApp.controller:HeaderUserCtrl
 * @description
 * # HeaderUserCtrl
 * Controller of the mixideaWebApp
 */
angular.module('mixideaWebApp')
  .controller('HeaderUserCtrl',['$scope','UserAuthService','$uibModal' ,'$state', function ($scope, UserAuthService, $uibModal, $state) {

  	$scope.user = UserAuthService;
  	$scope.header_below_type = "menu";
  	$scope.show_header_below = false;
  	$scope.menu_list = new Array();

  	$scope.logout = function(){
		$scope.user.logout();
		console.log("logout");
		$scope.show_header_below = false;
  	}
  	
  	$scope.menu_click = function(param){
  		console.log("menu_click" + param);
  		switch(param){
  			case "link_eventlist":
  				$scope.link_eventlist();
  			break;
  			case "link_articlelist":
  				$scope.link_articlelist();
  			break;
  			case "link_mypage":
  				$scope.link_mypage();
  			break;
  			case "logout":
  				$scope.logout();
  			break;
  		}
  	}


  	$scope.link_articlelist = function(){
		  console.log("link_articlelist");
		  $scope.show_header_below = false;
  	}
  	$scope.link_eventlist = function(){
		  console.log("link_eventlist");
  		$state.go('eventsearch_layout_three_column.list');
		  $scope.show_header_below = false;
  	}

  	$scope.link_mypage = function(){
		  console.log("link_mypage");
      if(true){
        //popup to show login dialog if not logedin
      }
      $state.go('mypage');
		  $scope.show_header_below = false;
  	}

  	$scope.click_notification = function(){
		  console.log("click_notification");	
  	}

  	$scope.click_message = function(){
		  console.log("click_message");	
  	}
    
  	$scope.click_hamburger = function(){
		console.log("click_hamburger");
		$scope.show_header_below = !$scope.show_header_below;
  		$scope.header_below_type = "menu";
  		var window_width = document.documentElement.clientWidth;
  		if(window_width < 800){
  			$scope.menu_list = [
  			{name:"Event List", func_param:"link_eventlist"},
  			{name:"Article List", func_param:"link_articlelist"},
  			{name:"My Page", func_param:"link_mypage"},
  			{name:"Logout", func_param:"logout"},
  			];
  		}else{
  			$scope.menu_list = [
  			{name:"Logout", func_param:"logout"}
  			];
  		}

  	}



/*
	$scope.show_lgoin_form = function(){
		console.log("show login form is called");
		var modalInstance = $uibModal.open({
			templateUrl: 'views/login_form.html',
			controller: 'LoginFormCtrl',
			backdrop:"static",
			size:'sm'
		})
	}
*/

	$scope.show_lgoin_form = function(){
		console.log("show login form is called");
		var modalInstance = $uibModal.open({
			templateUrl: 'views/login_form_simple.html',
			controller: 'LoginFormSimpleCtrl',
			backdrop:"static",
			size:'sm'
		})
	}



  }]);
