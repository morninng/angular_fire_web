'use strict';

/**
 * @ngdoc function
 * @name mixideaWebApp.controller:HeaderUserCtrl
 * @description
 * # HeaderUserCtrl
 * Controller of the mixideaWebApp
 */
angular.module('mixideaWebApp')
  .controller('HeaderUserCtrl',['$scope','UserAuthService','$uibModal' ,'$state','NotificationService','DataStorageUserService','DataStorageArticleService','DataStorageArgumentService','$location','$anchorScroll','EventWebchatNotificationService','EventWebchatMessageService','DeviceTypeService', function ($scope, UserAuthService, $uibModal, $state, NotificationService, DataStorageUserService, DataStorageArticleService, DataStorageArgumentService, $location, $anchorScroll, EventWebchatNotificationService, EventWebchatMessageService, DeviceTypeService) {

  	$scope.user = UserAuthService;
    $scope.user_data_store = DataStorageUserService;
    $scope.article_data_store = DataStorageArticleService;
    $scope.argument_data_store = DataStorageArgumentService;



    $scope.show_menu = false;
    $scope.show_notification = false;
    $scope.show_message = false;
    $scope.show_webchat_PC_dialog = false;
    $scope.webchat_screentype = null;

  	$scope.menu_list = new Array();
    $scope.notify_service = NotificationService;
    $scope.event_webchat_notify_service = EventWebchatNotificationService;

  	$scope.logout = function(){
  		$scope.user.logout();
  		console.log("logout");
      $scope.show_menu = false;
      $scope.show_notification = false;
      $scope.show_message = false;
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
      $scope.show_menu = false;
      $scope.show_notification = false;
      $scope.show_message = false;
  	}
  	$scope.link_eventlist = function(){
		  console.log("link_eventlist");
  		$state.go('eventsearch_layout_three_column.list');
      $scope.show_menu = false;
      $scope.show_notification = false;
      $scope.show_message = false;
  	}

  	$scope.link_mypage = function(){
		  console.log("link_mypage");
      if(true){
        //popup to show login dialog if not logedin
      }
      $state.go('mypage');
      $scope.show_menu = false;
      $scope.show_notification = false;
      $scope.show_message = false;
  	}

  	$scope.click_notification = function(){
		  console.log("click_notification");
      $scope.show_menu = false;
      $scope.show_notification = !$scope.show_notification;
      $scope.show_message = false;
  	}

    $scope.notification_select = function(notify_obj){
      console.log("click_notification");
      $scope.notify_service.seen(notify_obj.id);
      //goto selected page
      var current_stateid = $state.params.id;
      var current_state_name = $state.current.name;


      switch(notify_obj.type){
        case "argument_all":
          var scroll_param = 'written_description_comment_all'; 
          if(current_state_name == 'article.written_description' && current_stateid == notify_obj.event_id){
            $location.hash(scroll_param);
            $anchorScroll();
          }else{
            var state_param =  {id:notify_obj.event_id, scrollTo:scroll_param}
            $state.go('article.written_description', state_param);
          }
          // need implementation if no page shift but scroll to the right place
          // as $stateChangeSuccess is not called in case no state is changed
        break;
        case "argument_each":
          var scroll_param = "scroll_anchor_" + notify_obj.argument_id; 
          if(current_state_name == 'article.written_description' && current_stateid == notify_obj.event_id){
            $location.hash(scroll_param);
            $anchorScroll();
          }else{
            var state_param =  {id:notify_obj.event_id, scrollTo:scroll_param};
            $state.go('article.written_description', state_param);
          }
        break;
        case "audio_all":

          var scroll_param = 'audio_transcript_comment_all'; 
          if(current_state_name == 'article.audio_transcript' && current_stateid == notify_obj.event_id){
            $location.hash(scroll_param);
            $anchorScroll();
          }else{
            var state_param =  {id:notify_obj.event_id, scrollTo:scroll_param}
            $state.go('article.audio_transcript', state_param);
          }
          
        break;
        case "audio_each":
          var scroll_param = "scroll_anchor_" + notify_obj.role; 
          if(current_state_name == 'article.audio_transcript' && current_stateid == notify_obj.event_id){
            $location.hash(scroll_param);
            $anchorScroll();
          }else{
            var state_param =  {id:notify_obj.event_id, scrollTo:scroll_param};
            $state.go('article.audio_transcript', state_param);
          }
        break;
      }

      $scope.show_menu = false;
      $scope.show_notification = false;
      $scope.show_message = false;
      $scope.notify_service.release_focused_status();
    }



  	$scope.click_message = function(){
		  console.log("click_message");	
      $scope.show_menu = false;
      $scope.show_notification = false;
      $scope.show_message = !$scope.show_message;
  	}


    $scope.webchat_notify_select = function(webchat_obj){

      console.log(webchat_obj);
      EventWebchatMessageService.initialize(webchat_obj.event_id);

      $scope.show_menu = false;
      $scope.show_notification = false;
      $scope.show_message = false;
      EventWebchatNotificationService.seen(webchat_obj.id);
      EventWebchatNotificationService.release_focused_status()



      var dvice_type = DeviceTypeService.get_type();

      if(dvice_type == "Mobile"){
        $scope.webchat_screentype = "Popup";

        var modalInstance = $uibModal.open({
        templateUrl: 'views/mobile_chat.html',
        controller: 'EventWebchatMobileCtrl',
            backdrop:"true",
            size:'lg'
        });

      }else{
        $scope.webchat_screentype = "ScreenBottom";
        $scope.show_webchat_PC_dialog = true;
      }



    }

    $scope.$on('close_ScreenBottom_chat_window', function(){
      $scope.show_webchat_PC_dialog = false;
    });



  	$scope.click_hamburger = function(){

  		console.log("click_hamburger");
      $scope.show_menu = !$scope.show_menu;
      $scope.show_notification = false;
      $scope.show_message = false;

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
