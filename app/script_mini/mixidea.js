
'use strict';

/**
 * @ngdoc overview
 * @name mixideaWebApp
 * @description
 * # mixideaWebApp
 *
 * Main module of the application.
 */
angular
  .module('mixideaWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'firebase'
  ]);



angular.module('mixideaWebApp').run(function($rootScope, $location, $anchorScroll, $stateParams, $timeout) {

	$rootScope.$on('$stateChangeSuccess', function(newRoute, oldRoute) {

		$timeout(function(){
			$location.hash($stateParams.scrollTo);
			$anchorScroll.yOffset = 100;
			$anchorScroll();
		},1000);

	});
});


angular.module('mixideaWebApp')
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {


	$stateProvider
	.state('eventsearch_layout_three_column', {
		url:"/event",
		views:{
			"RootView":{
				templateUrl: 'views/event/event_layout_three.html'
			}
		}
	})
	.state('eventsearch_layout_three_column.list', {
		url:'/list',
		views:{
			"event_left":{
			templateUrl: 'views/event/event_filter.html',
			controller: 'EventFilterCtrl'
			},
			"event_main":{
			templateUrl: 'views/event/event_list.html',
			controller: 'EventListCtrl'
			},
			"event_right":{
			templateUrl: 'views/right_column_ad.html'
			}
		}
	})
	.state('eventsearch_layout_two_column', {
		url:"/event",
		views:{
			"RootView":{
				templateUrl: 'views/event/event_layout_two.html'
			}
		}
	})
	.state('eventsearch_layout_two_column.calendar', {
		url:'/calendar',
		views:{
			"event_left":{
			templateUrl: 'views/event/event_filter.html',
			controller: 'EventFilterCtrl'
			},
			"event_main":{
			templateUrl: 'views/event/event_calendar.html',
			controller: 'EventCalendarCtrl'
			}
		}
	})
	.state('eventcontext_layout_two_column', {
		url:'/eventcontext',
		views:{
			"RootView":{
				templateUrl: 'views/event/eventcontext_layout.html'
			}
		}
	})
	.state('eventcontext_layout_two_column.context', {
		url:'/context/:id',
		views:{
			"eventcontext_main":{
			templateUrl: 'views/event/event_context.html',
			controller: 'EventContextCtrl'
			},
			"eventcontext_right":{
			templateUrl: 'views/right_column_ad.html'
			}
		}
	})
	.state('article', {
		url:'/article/{id}',
		views:{
			"RootView":{
				templateUrl: 'views/article/article_layout.html',
				controller: 'ArticleLayoutCtrl'
			}
		}
	})
	.state('article.audio_transcript', {
		url:'/audio_transcript',
		views:{
			"article_main":{
				templateUrl: 'views/article/audio_transcript.html',
				controller: 'ArticleAudiotranscriptCtrl'
			}
		},
		params: {
			scrollTo: null
		}
	})
	.state('article.written_description', {
		url:'/written_description',
		views:{
			"article_main":{
				templateUrl: 'views/article/written_description.html',
				controller: 'ArticleWrittendescriptionCtrl'
			}
		},
		params: {
			scrollTo: null
		}
	})
	.state('mypage', {
		url:'/mypage',
		views:{
			"RootView":{
				templateUrl: 'views/mypage/mypage_layout.html',
			}
		}
	})

}]);

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
      $scope.$emit("close_ScreenBottom_chat_window");

    }

    $scope.click_title = function(){
      EventWebchatMessageService.goto_eventsite();

    }


    $scope.$on("$destroy", function handler() {
      console.log("event webchat controller destroyed");
      EventWebchatMessageService.finalize();
    });



  }]);

'use strict';

/**
 * @ngdoc function
 * @name mixideaWebApp.controller:HeaderUserCtrl
 * @description
 * # HeaderUserCtrl
 * Controller of the mixideaWebApp
 */
angular.module('mixideaWebApp')
  .controller('HeaderUserCtrl',['$scope','UserAuthService','$uibModal' ,'$state','NotificationService','DataStorageUserService','DataStorageArticleService','DataStorageArgumentService','$location','$anchorScroll','EventWebchatNotificationService','EventWebchatMessageService','DeviceTypeService','DataStorageEventService','$timeout', function ($scope, UserAuthService, $uibModal, $state, NotificationService, DataStorageUserService, DataStorageArticleService, DataStorageArgumentService, $location, $anchorScroll, EventWebchatNotificationService, EventWebchatMessageService, DeviceTypeService, DataStorageEventService, $timeout) {

  	$scope.user = UserAuthService;
    $scope.user_data_store = DataStorageUserService;
    $scope.article_data_store = DataStorageArticleService;
    $scope.argument_data_store = DataStorageArgumentService;
    $scope.event_data_store = DataStorageEventService;


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



	$scope.show_lgoin_form = function(){
		console.log("show login form is called");
		var modalInstance = $uibModal.open({
			templateUrl: 'views/login_form.html',
			controller: 'LoginFormCtrl',
			backdrop:"static",
			size:'sm'
		})
	}


	$scope.show_lgoin_form = function(){
		console.log("show login form is called");
		var modalInstance = $uibModal.open({
			templateUrl: 'views/login_form_simple.html',
			controller: 'LoginFormSimpleCtrl',
			backdrop:"static",
			size:'sm'
		})
	}


/*
  var main_context_element = document.getElementById("main_context");
  main_context_element.addEventListener("click", function(){
    console.log("main context is clicked");
    if($scope.show_menu || $scope.show_notification || $scope.show_message){
      $scope.show_menu = false;
      $scope.show_notification = false;
      $scope.show_message = false;
      $timeout(function(){}); 
    }
  })
*/

  $scope.under_loading = false;


  }]);

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
			location.reload(true);
		}
  	})


  }]);

'use strict';

/**
 * @ngdoc function
 * @name mixideaWebApp.controller:LoginFormCtrl
 * @description
 * # LoginFormCtrl
 * Controller of the mixideaWebApp
 */
angular.module('mixideaWebApp')
  .controller('LoginFormCtrl',['$scope', 'UserAuthService','$uibModalInstance', 'MixideaSetting', function ($scope, UserAuthService, $uibModalInstance, MixideaSetting) {

  	console.log("login form control is called");
  	$scope.fb_login_show = true;
  	$scope.fb_login_loading_show = false;
  	$scope.lang_type = null;
  	$scope.user_introduction = null;
  	$scope.user = UserAuthService;


	var root_ref = new Firebase(MixideaSetting.firebase_url);

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

'use strict';

/**
 * @ngdoc function
 * @name mixideaWebApp.controller:CreateEventCtrl
 * @description
 * # CreateEventCtrl
 * Controller of the mixideaWebApp
 */

angular.module('mixideaWebApp')
  .controller('CreateEventCtrl',["$scope", "$uibModalInstance","$firebaseArray",'MixideaSetting', function ($scope, $uibModalInstance, $firebaseArray, MixideaSetting) {


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
    $scope.hangout_upload_object = null;
    $scope.retrieved_hangout_keylist = new Array();


    var root_ref = new Firebase(MixideaSetting.firebase_url);
    var hangout_list_ref = root_ref.child("hangout_url");
    var hangout_query = hangout_list_ref.equalTo(null).limitToFirst(5).once("value", function(query_snapshot){
      var hangout_retrieved_object = query_snapshot.val();
      var main_url = null;
      var teamdiscussion_url_array = new Array();
      var i=0;
      for( var key in hangout_retrieved_object){
        if(i==0){
          main_url = hangout_retrieved_object[key].url;
        }else{
          teamdiscussion_url_array.push(hangout_retrieved_object[key].url);
        }
        $scope.retrieved_hangout_keylist.push(key);
        i++;
      }
      if(i !=5){
        alert("error: please inform it to administrator");
        $uibModalInstance.close();
      }

      $scope.hangout_upload_object = {
        main: main_url,
        team_discussion:teamdiscussion_url_array
      }
    });

  	$scope.click_cancel = function(){
  		console.log("cancel button is clicked");
      $uibModalInstance.close();
	  }

}]);


angular.module('mixideaWebApp')
  .controller('CreateEventInputCtrl',["$scope",'MixideaSetting', function ($scope,MixideaSetting) {

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
  .controller('CreateEventConfirmCtrl',["$scope", "UserAuthService","$timeout",'MixideaSetting', function ($scope, UserAuthService,$timeout, MixideaSetting) {

    $scope.click_save = function(){

      var event_date = $scope.$parent.$parent.date_time.getTime();
      var event_time = $scope.$parent.$parent.date_time.getUTCHours() * 60 + 
      						$scope.$parent.$parent.date_time.getUTCMinutes();

      var event_obj = {
      	"date_time": event_date,
      	"time":event_time,
      	"context": $scope.$parent.$parent.context,
      	"deb_skill": $scope.$parent.$parent.exp_deb_skill,
      	"lang_skil": $scope.$parent.$parent.exp_lang_skil,
      	"prerequisit": $scope.$parent.$parent.prerequisit,
      	"created_by": UserAuthService.own_uid
      }

      var root_ref = new Firebase(MixideaSetting.firebase_url);
      var event_ref = root_ref.child("event_related/event");
      var event_obj_ref = event_ref.push(event_obj, function(error){
      	if(error){
      		console.log("fail to save");
      	}else {
      		var event_id = event_obj_ref.key();
          save_game_data(event_id);
          save_arguments_data(event_id);
          save_hangout_data(event_id);
      	}
      });
      return;
    }

    function save_game_data(event_id){

      var event_date = $scope.$parent.$parent.date_time.getTime();

      var game_obj = {
        "deb_style": $scope.$parent.$parent.deb_style,
        "motion":$scope.$parent.$parent.motion,
        "game_status": "introduction",
        "type": "debate",
        "date_time":event_date
      }

      var root_ref = new Firebase(MixideaSetting.firebase_url);
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
      });
    }


    function save_arguments_data(event_id){


      var root_ref = new Firebase(MixideaSetting.firebase_url);
      var argument_arr = [
        {style:"NA",team:"Gov",type:"def_intro"},
        {style:"NA",team:"Gov",type:"arguments"},
        {style:"NA",team:"Gov",type:"arguments"},
        {style:"NA",team:"Opp",type:"arguments"},
        {style:"NA",team:"Opp",type:"arguments"},
        {style:"Asian",team:"Prop",type:"def_intro"},
        {style:"Asian",team:"Prop",type:"arguments"},
        {style:"Asian",team:"Prop",type:"arguments"},
        {style:"Asian",team:"Opp",type:"arguments"},
        {style:"Asian",team:"Opp",type:"arguments"},
        {style:"BP",team:"OG",type:"def_intro"},
        {style:"BP",team:"OG",type:"arguments"},
        {style:"BP",team:"OG",type:"arguments"},
        {style:"BP",team:"OO",type:"arguments"},
        {style:"BP",team:"OO",type:"arguments"},
        {style:"BP",team:"CG",type:"arguments"},
        {style:"BP",team:"CG",type:"arguments"},
        {style:"BP",team:"CO",type:"arguments"},
        {style:"BP",team:"CO",type:"arguments"},
      ];
      var arguments_ref = root_ref.child("event_related/Article_Context/" + event_id + "/identifier/");
      var dummy_content = {dummy:true};

      for(var i=0; i< argument_arr.length; i++){
        var argument_content_ref = arguments_ref.child(argument_arr[i].style + "/" + argument_arr[i].team + "/"+ argument_arr[i].type );
        argument_content_ref.push(dummy_content);
      }
    }

    function save_hangout_data(event_id){

      var root_ref = new Firebase(MixideaSetting.firebase_url);
      var hangout_ref = root_ref.child("event_related/game_hangout_obj_list/" + event_id);
      hangout_ref.set($scope.$parent.$parent.hangout_upload_object, function(error){
        if(error){
          alert("error to save event hangout url");
        } else {
          console.log("succeed to save");
        }
      });

      for(var i=0; i< $scope.retrieved_hangout_keylist.length; i++){
        disable_hangout_url($scope.retrieved_hangout_keylist[i]);
      }

    }

    function disable_hangout_url(key){

      var root_ref = new Firebase(MixideaSetting.firebase_url);
      var hangout_status_ref = root_ref.child("hangout_url/" + key + "/status");
      hangout_status_ref.set(false);

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
      $state.go("eventcontext_layout_two_column.context", {id:event_id});
      $scope.$parent.$parent.click_cancel();
      return;
    }

}]);



'use strict';

/**
 * @ngdoc function
 * @name mixideaWebApp.controller:EventLayoutCtrl
 * @description
 * # EventLayoutCtrl
 * Controller of the mixideaWebApp
 */
angular.module('mixideaWebApp')
  .controller('EventLayoutCtrl',["$scope","$uibModal", function ($scope, $uibModal) {

  	console.log("event layout");

  	$scope.open_create_event = function(){
  		console.log("create event is clicked");
  		var modalInstance = $uibModal.open({
			templateUrl: 'views/event/create_event.html',
			controller: 'CreateEventCtrl',
        	backdrop:"static",
        	size:'lg'
		});
  	}



  }]);

'use strict';

angular.module('mixideaWebApp')
  .controller('EventCalendarCtrl',['$scope', function ($scope) {

  	console.log("event calendar");
  	$scope.name = "calendar calendar"


  }]);

'use strict';

angular.module('mixideaWebApp')
  .controller('EventContextCtrl',['$scope', '$stateParams',  'UserAuthService','MixideaSetting','DataStorageUserService','CheckBrowserService','$firebaseArray','$uibModal','EventParticipateService','EventUtil', function ($scope, $stateParams, UserAuthService, MixideaSetting, DataStorageUserService, CheckBrowserService, $firebaseArray, $uibModal, EventParticipateService, EventUtil) {

    console.log("event context controller called");

  	var event_id = $stateParams.id;
    var root_ref = new Firebase(MixideaSetting.firebase_url);
    $scope.user = UserAuthService;
    $scope.user_service = DataStorageUserService

    $scope.check_browser = CheckBrowserService;
    $scope.event_participant = EventParticipateService;


//////////////////////////////////
//show basic event info
/////////////////////////////////

  	$scope.event_obj = new Object();
    var event_ref = root_ref.child("event_related/event/" + event_id);
    event_ref.once("value", function(event_snapshot){
    	
      $scope.event_obj = event_snapshot.val();
      $scope.calendar_link = EventUtil.set_google_calendar_info($scope.event_obj.date_time);

    },function(){
    	alert("fail to load event data");
    });

/////////////////////////////
/// event join ////////////
////////////////////////////


  $scope.join_event = function(){
    console.log("join event is called");

    if(!$scope.user.own_uid){
      alert("you need to login to join the game");
      var modalInstance = $uibModal.open({
        templateUrl: 'views/login_form_simple.html',
        controller: 'LoginFormSimpleCtrl',
        backdrop:"static",
        size:'sm'
      })
      return;
    }


    var modalInstance = $uibModal.open({
      templateUrl: 'views/event/join_event.html',
      controller: 'JoinEventCtrl',
      backdrop:"static",
      size:'md',
      resolve: {
        params: function(){
          return {
            event_date: $scope.event_obj.date_time,
            event_id: event_id
          }
        }
      }
    })
  }


//////////////////////////////////
// participant management
/////////////////////////////////


    $scope.participant_audience = new Array();
    $scope.participant_debater = new Array();
    $scope.participant_aud_or_debater = new Array();
    $scope.available_audience = false;
    $scope.available_debater = false;
    $scope.available_aud_or_debater = false;


    var root_ref = new Firebase(MixideaSetting.firebase_url);
    var event_participant_ref = root_ref.child("event_related/participants/" + event_id + "/event_role");
    var game_ref = root_ref.child("event_related/game/" + event_id);

    $scope.game_obj = new Object();
    game_ref.once("value", function(game_snapshot){

      $scope.game_obj = game_snapshot.val();
      EventParticipateService.initialize( event_id, $scope.game_obj.deb_style);

    })




  $scope.cancel_participante = function(role){
    EventParticipateService.cancel_participante(role);

  }


//////////////////////////////////
// hangout button show and hide management
/////////////////////////////////

  $scope.hangout_link_str = null;
  $scope.show_hangout = false;


  var root_ref = new Firebase(MixideaSetting.firebase_url);
  var hangout_ref = root_ref.child("event_related/game_hangout_obj_list/" + event_id + "/main");
  hangout_ref.once("value", function(snapshot){
    var hangout_url = snapshot.val();

    var hangout_gid = "?gid=";
    var hangout_appid = MixideaSetting.hangout_appid;
    var hangout_query_key = "&gd=";
    var first_query_value = $scope.user.own_uid;;
    var second_query_value = event_id;
    var third_query_value = "main";
    $scope.hangout_link_str= hangout_url + hangout_gid + 
            hangout_appid + hangout_query_key 
         + first_query_value + "^" + second_query_value + "^" + third_query_value;

    $scope.hangout_link_str_pre_uid = hangout_url + hangout_gid + hangout_appid + hangout_query_key;
    $scope.hangout_link_str_post_uid = "^" + second_query_value + "^" + third_query_value;


  });






////////////////////////////////////////
////////event web chat /////////////////
///////////////////////////////////////

  $scope.chat_context = new Object();

  var event_webchat_ref = root_ref.child("event_related/event_webchat/" + event_id);
  $scope.event_webchat_array = $firebaseArray(event_webchat_ref);


  $scope.event_webchat_array.$loaded()
  .then(function(data) {

    console.log(data);

  })
  .catch(function(error) {
    console.log("Error:", error);

  });


  $scope.submit_chat =function(){

    if($scope.chat_context.comment){
      EventUtil.submit_chat(event_id, $scope.chat_context.comment, $scope.event_obj.date_time)
    }
    $scope.chat_context.comment = null;
  }


  $scope.$on("$destroy", function handler() {
        // destruction code here

        EventParticipateService.finalize();

    });



}]);

'use strict';

angular.module('mixideaWebApp')
  .controller('EventFilterCtrl',['$scope', function ($scope) {

  	console.log("event filter called");
  	$scope.name ="event filter yuta";


    $scope.date_range_show = false;
    $scope.date_from = new Date();
    $scope.date_to = new Date();
    $scope.date_to.setMonth( $scope.date_to.getMonth() + 13 );
    $scope.format = 'yyyy/MM/dd';


    $scope.time_from = new Date();
    $scope.time_from.setHours(0);
    $scope.time_from.setMinutes(0);
    $scope.time_to = new Date();
    $scope.time_to.setHours(23); 
    $scope.time_to.setMinutes(59); 

    $scope.date_range_in = function(){
      if(!$scope.date_range_show ){
        $scope.date_range_show = true;
      }
    }

    $scope.data_range_out = function(){
      if($scope.date_range_show ){
        $scope.date_range_show = false;
      }
    }

    $scope.time_range_in = function(){
      if(!$scope.time_range_show ){
        $scope.time_range_show = true;
      }
    }
    $scope.time_range_out = function(){
      if($scope.time_range_show ){
        $scope.time_range_show = false;
      }
    }

    $scope.week_range_in = function(){
      if(!$scope.week_range_show ){
        $scope.week_range_show = true;
      }
    }
    $scope.week_range_out = function(){
      if($scope.week_range_show ){
        $scope.week_range_show = false;
      }
    }

    $scope.week_change = function(){
      console.log("aaa");
      var selected_days = $scope.weeks.filter(function(value){return value.checked});
       
      if(selected_days.length !=7){
        $scope.week_filtered = true;
        $scope.active_days.length=0;
        for(var i=0; i< selected_days.length; i++){
          $scope.active_days.push(selected_days[i].short_name);
        }
      }

    }

  }]);

'use strict';

angular.module('mixideaWebApp')
  .controller('EventListCtrl',['$scope','DataStorageEventService', function ($scope, DataStorageEventService) {

  	$scope.event_data =  DataStorageEventService;

    var search_start_timing = new Date();
    var search_start_timing_value = search_start_timing.getTime();
    DataStorageEventService.load_all_futuredata(search_start_timing_value);

  }]);


'use strict';

/**
 * @ngdoc filter
 * @name mixideaWebApp.filter:DateMonthDate
 * @function
 * @description
 * # DateMonthDate
 * Filter in the mixideaWebApp.
 */
angular.module('mixideaWebApp')
  .filter('DateMonthDate', function () {
    return function (input) {


	    var date_object = new Date(input);
	    var year = date_object.getFullYear();
	    var month = date_object.getMonth();
	    var month_str = null;
	    switch(month){
			case 0:
				month_str = "Jan";
			break;
			case 1:
				month_str = "Feb";
			break;
			case 2:
				month_str = "Mar";
			break;
			case 3:
				month_str = "April";
			break;
			case 4:
				month_str = "May";
			break;
			case 5:
				month_str = "June";
			break;
			case 6:
				month_str = "July";
			break;
			case 7:
				month_str = "Aug";
			break;
			case 8:
				month_str = "Sep";
			break;
			case 9:
				month_str = "Oct";
			break;
			case 10:
				month_str = "Nov";
			break;
			case 11:
				month_str = "Dec";
			break;
	    }
	    var day = date_object.getDate();
	    var date_string = year

	    date_string = String(year) + '-' + month_str + '-' + String(day);

      return date_string;
    };





  });

'use strict';

/**
 * @ngdoc filter
 * @name mixideaWebApp.filter:DateValueString
 * @function
 * @description
 * # DateValueString
 * Filter in the mixideaWebApp.
 */
angular.module('mixideaWebApp')
  .filter('DateValueString', function () {
    return function (input) {

	    var date = new Date(input);
	    var date_string = date.toString()


      return date_string;
    };
  });
