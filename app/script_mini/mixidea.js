
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
/*
			,
			"article_right":{
				templateUrl: 'views/right_column_ad.html'
			}
*/

		}
	})
	.state('article.written_description', {
		url:'/written_description',
		views:{
			"article_main":{
				templateUrl: 'views/article/written_description.html',
				controller: 'ArticleWrittendescriptionCtrl'
			},
			/*
			"article_right":{
				templateUrl: 'views/right_column_ad.html'
			}
			*/
		}
	});

}]);
'use strict';

angular.module('mixideaWebApp')
  .controller('EventContextCtrl',['$scope', '$stateParams', '$timeout', 'UserAuthService','MixideaSetting','UserDataStorageService', function ($scope, $stateParams,$timeout, UserAuthService, MixideaSetting, UserDataStorageService) {

    console.log("event context controller called");

  	var event_id = $stateParams.id;
    var root_ref = new Firebase(MixideaSetting.firebase_url);
    $scope.user = UserAuthService;
    $scope.user_service = UserDataStorageService

//////////////////////////////////
//show basic event info
/////////////////////////////////

  	$scope.event_obj = new Object();
    var event_ref = root_ref.child("event_related/event/" + event_id);
    event_ref.once("value", function(snapshot){
    	
      $scope.event_obj = snapshot.val();

    },function(){
    	alert("fail to load event data");
    });


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
    event_participant_ref.on("value", function(snapshot){

      $scope.available_audience = false;
      $scope.available_debater = false;
      $scope.available_aud_or_debater = false;
      $scope.total_num = 0;

      var participant_obj = snapshot.val();
      retrieve_userinfo_all(participant_obj);

    },function(){
      alert("fail to load participant data");
    });

    function retrieve_userinfo_all(participant_obj){

      $scope.total_num = 0;

      if($scope.participant_audience){
          $scope.participant_audience.length=0;
      }
      var all_user_id_array = new Array();
      var number_audience = 0;
      if(participant_obj){
        for(var key in participant_obj.audience){
          $scope.participant_audience.push(key);
          all_user_id_array.push(key);
          $scope.total_num++;
          number_audience++;
        }
      }

      if($scope.participant_debater){
          $scope.participant_debater.length=0;
      }
      var number_debater = 0;
      if(participant_obj){
        var user_id_array = new Array();
        for(var key in participant_obj.debater){
          $scope.participant_debater.push(key);
          all_user_id_array.push(key);
          $scope.total_num++;
          number_debater++;
        }
      }

      if($scope.participant_aud_or_debater){
          $scope.participant_aud_or_debater.length=0;
      }
      var number_aud_or_debater = 0;
      if(participant_obj){
        var aud_or_debater_user_id_array = new Array();
        for(var key in participant_obj.aud_or_debater){
          $scope.participant_aud_or_debater.push(key)
          all_user_id_array.push(key);
          $scope.total_num++;
          number_aud_or_debater++;
        }
      }

      $scope.user_service.add_by_array(all_user_id_array);

      //the end
      $timeout(function() {
        $scope.available_audience = validate("audience", number_audience);
        $scope.available_debater = validate("debater", number_debater);
        $scope.available_aud_or_debater = validate("aud_or_debater", number_aud_or_debater);
   
      });
    }




  function validate(role_type, num){

    var style = $scope.event_obj.deb_style;
    if($scope.total_num>9){
      return false
    }

    switch (style){
      case "NA":
        switch (role_type){
          case "debater":
            if(num<6 ){
              return true;
            }
          break;
          case "audience":
            if(num<6){
              return true;
            }
          break;
          case "aud_or_debater":
            return true;
          break;
        }
      break;
      case "Asian":
      case "BP":
        switch (role_type){
          case "debater":
            if(num<8 ){
              return true;
            }
          break;
          case "audience":
            if(num<3){
              return true;
            }
          break;
          case "aud_or_debater":
            return true;
          break;
        }
      break;
    }
    return false;

  }
//////////////////////////////////
// user join and cancel management
/////////////////////////////////

  function register_user(role_type){


    var event_participant_user_ref = root_ref.child("event_related/participants/" + event_id + "/event_role/" + role_type + "/" + $scope.user.own_uid);
    var full_participant_ref = root_ref.child("event_related/participants/" + event_id + "/full/" + $scope.user.own_uid);

    full_participant_ref.set(true).then(function(obj){

      return event_participant_user_ref.set(true);
    }).then(function(){
      
      alert("succeed to join");
    },function(){

      alert("error to save data")
    })
  }

  function un_register_user(role_type){

    var role_ref = event_ref.child("participant/" + role_type + "/member/" + $scope.user.own_uid);
    var participant_ref = root_ref.child("event_related/participants/" + event_id + "/" + $scope.user.own_uid);



    var event_participant_user_ref = root_ref.child("event_related/participants/" + event_id + "/event_role/" + role_type + "/" + $scope.user.own_uid);
    var full_participant_ref = root_ref.child("event_related/participants/" + event_id + "/full/" + $scope.user.own_uid);

    
    event_participant_user_ref.set(null).then(function(obj){

      return full_participant_ref.set(null);
    }).then(function(){
      
      alert("succeed to cancel");
    },function(){

      alert("error to cancel");
    })
  }

  function count_up_participants(role_type){

    if(!$scope.user.own_uid){
      alert("you need to login to join the game");
      return;
    }

    var participant_num_ref = event_ref.child("participants_num/" + role_type);
    participant_num_ref.transaction(function(current_num){

      var valid = true;
      var new_num = current_num;

      if(current_num){
        valid = validate(role_type, current_num);
        if(!valid){
          return;        
        }
      }else{
        valid = validate(role_type, 0);
        if(!valid){
          return;        
        }
        new_num = 0;
      }
      new_num = new_num + 1;

      return new_num;

    }, function(error, committed, snapshot){
      console.log("transaction complete");
      if(error){
        alert('transaction failed' + error);
      }else if(!committed){
        alert("other person may take a role and cannot login more");
      }else{
        register_user(role_type);
      }
    });
  }


  function count_down_participants(role_type){
    var participant_num_ref = event_ref.child("participants_num/" + role_type);
    participant_num_ref.transaction(function(current_num){
      var new_vlaue = current_num-1;
      return new_vlaue;
    });
  }


	$scope.join = function(role){
    count_up_participants(role);
	}


  $scope.cancel_participante = function(role){
    count_down_participants(role);
    un_register_user(role);
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
  .controller('HeaderUserCtrl',['$scope','UserAuthService','$uibModal' , function ($scope, UserAuthService, $uibModal) {

  	$scope.user = UserAuthService;

  	$scope.logout = function(){
		$scope.user.logout();
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
      	"deb_style": $scope.$parent.$parent.deb_style,
      	"context": $scope.$parent.$parent.context,
      	"deb_skill": $scope.$parent.$parent.exp_deb_skill,
      	"lang_skil": $scope.$parent.$parent.exp_lang_skil,
      	"motion": $scope.$parent.$parent.motion,
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

      var game_obj = {
        "deb_style": $scope.$parent.$parent.deb_style,
        "motion":$scope.$parent.$parent.motion,
        "game_status": "introduction",
        "type": "debate",
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
  .controller('EventListCtrl',['$scope','EventSearchService', function ($scope, EventSearchService) {


  	$scope.event_list =  EventSearchService.event_list;
  	




  }]);

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
