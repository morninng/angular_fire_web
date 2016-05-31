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
