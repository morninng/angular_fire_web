'use strict';

/**
 * @ngdoc function
 * @name mixideaWebApp.controller:LoginFormCtrl
 * @description
 * # LoginFormCtrl
 * Controller of the mixideaWebApp
 */
angular.module('mixideaWebApp')
  .controller('LoginFormCtrl',['$scope', 'UserAuthService','$uibModalInstance',  function ($scope, UserAuthService, $uibModalInstance) {

  	console.log("login form control is called");
  	$scope.fb_login_show = true;
  	$scope.fb_login_loading_show = false;
  	$scope.lang_type = null;
  	$scope.user_introduction = null;
  	$scope.user = UserAuthService;


	var root_ref = new Firebase("https://mixidea.firebaseio.com/");

  	$scope.login_fb = function(){
  		console.log("facebook login is clicked");
	  	$scope.fb_login_show = false;
	  	$scope.fb_login_loading_show = true;
  		$scope.user.login();
  	}

	$scope.close_modal = function(){
		$uibModalInstance.close();
	}

	$scope.click_introduction_input = function(){

		var user_introduction = $scope.user_introduction;
		if(!user_introduction){
			alert("input your self introduction");
			return;
		}

		var own_uid = $scope.user.own_uid;
		var user_ext_lang_type_ref = root_ref.child("users/user_ext/" + own_uid + "/profile/introduction");
        user_ext_lang_type_ref.set(user_introduction);
	}


	$scope.click_language_select = function(){

		var lang_type = $scope.lang_type;
		if(!lang_type){
			alert("select one of the english types");
			return;
		}
		var own_uid = $scope.user.own_uid;
		var user_ext_lang_type_ref = root_ref.child("users/user_ext/" + own_uid + "/profile/lang_type");
        user_ext_lang_type_ref.set(lang_type);
	}

	$scope.$watch('user.regist_complete', function(){
		if($scope.user.regist_complete == true){

			var myCarousel_element = document.getElementById("myCarousel")
			var carousel_element = angular.element(myCarousel_element);   

			var own_uid = $scope.user.own_uid;
        	var user_ext_lang_type_ref = root_ref.child("users/user_ext/" + own_uid + "/profile/lang_type");
        	var user_ext_introduction_ref = root_ref.child("users/user_ext/" + own_uid + "/profile/introduction");
        	user_ext_lang_type_ref.on('value', function(snapshot){ 
        		var lang_type = snapshot.val();
        		if(lang_type){
        			console.log(lang_type);
					user_ext_introduction_ref.on('value', function(snapshot2){
						var introduction = snapshot2.val();
						if(introduction){
							$uibModalInstance.close();
						}else{
							carousel_element.carousel(2);
							carousel_element.carousel('pause');

						}
					})
        		}else{
					carousel_element.carousel(1);
					carousel_element.carousel('pause');
        			console.log(lang_type);
        		}
        	},function(){
        		console.log(lang_type);
        	});
		}
  	})



  }]);
