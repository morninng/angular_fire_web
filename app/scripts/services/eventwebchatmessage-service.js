'use strict';

/**
 * @ngdoc service
 * @name mixideaWebApp.EventWebchatMessageService
 * @description
 * # EventWebchatMessageService
 * Factory in the mixideaWebApp.
 */

angular.module('mixideaWebApp')
  .factory('EventWebchatMessageService',['MixideaSetting','UserAuthService','$timeout','DataStorageUserService','$state','DataStorageEventService','$http', function (MixideaSetting, UserAuthService, $timeout, DataStorageUserService, $state, DataStorageEventService, $http) {


    var webchat_message_service = new Object();
    webchat_message_service.message_array = new Array();
    webchat_message_service.status_mainroom = new Array();
    webchat_message_service.status_teamdiscuss_room = new Object();

    var full_participant_array = new Array();
    var webchat_message_ref = null;
    var full_participant_ref = null;
    webchat_message_service.service_event_id = null;


    var root_ref = new Firebase(MixideaSetting.firebase_url);

    webchat_message_service.initialize = function(event_id){

      // in case it is already initialized service should be refleshed first
      if(webchat_message_service.service_event_id){
        finalsize_alldata();
      }

      //initialize with the new event_id;
      webchat_message_service.service_event_id = event_id;

      DataStorageEventService.add_by_oneevent_id(event_id);

      webchat_message_ref = root_ref.child("event_related/event_webchat/" + event_id);
      webchat_message_ref.on("child_added", function(snapshot, prevChildKey){
        var webchat_obj = snapshot.val();
        console.log(webchat_obj.context);

        var sender_id = webchat_obj.user;
        DataStorageUserService.add_by_oneuser_id(sender_id);
        if(sender_id == UserAuthService.own_uid){
          webchat_obj.position = "chat_msg_own";
        }else{
          webchat_obj.position = "chat_msg_other";
        }
        webchat_message_service.message_array.push(webchat_obj);
        $timeout(function() {
          var scroller = document.getElementsByClassName("msg_body")[0];
          scroller.scrollTop = scroller.scrollHeight;
        }, 0,true);
      });




      full_participant_ref = root_ref.child("event_related/participants/" + event_id + "/full");
      full_participant_ref.on("value", function(snapshot){

        full_participant_array.length=0;
        var full_participant_obj = snapshot.val();
        for(var key in full_participant_obj){
          full_participant_array.push(key);
        }

      },function(){
        console.log("fail to load participant data");
      });



    var participants_status_ref = root_ref.child("event_related/participants/" + event_id + "/status");

    participants_status_ref.on("value", function(snapshot){
      var participant_status = snapshot.val();

      //remove every data
      webchat_message_service.status_mainroom.length=0;
      for(var key in webchat_message_service.status_teamdiscuss_room){
        delete webchat_message_service.status_teamdiscuss_room[key];
      }

      // add data with the latest participant info
      if(participant_status){
        var mainroom_obj = participant_status.main;
        for(var key in mainroom_obj){
          webchat_message_service.status_mainroom.push(key);
        }

        var teamdiscuss_room_obj = participant_status.team_discussion;
        for(var key in teamdiscuss_room_obj){
          webchat_message_service.status_teamdiscuss_room[key] = teamdiscuss_room_obj[key]
        }
      }

      $timeout(function(){});


    },function(){
      console.log("error to get participant status");
    })


    }


    function retrieve_participants(){
      console.log("aaa");
    }


    webchat_message_service.send_message = function(message){

      var chat_obj = {
        type:"comment",
        context:message,
        user:UserAuthService.own_uid
      }
      webchat_message_ref.push(chat_obj);
      notify_to_API_Gateway_eventChat()
      console.log(message);
    }

  function notify_to_API_Gateway_eventChat(){

        var event_date_val = DataStorageEventService.all_data[webchat_message_service.service_event_id].date_time;


        var auth_jwt = UserAuthService.create_jwt();
        var auth_jwt_str = JSON.stringify(auth_jwt);
        var post_message = {full_participant: full_participant_array,
                           event_date: event_date_val,
                           event_id: webchat_message_service.service_event_id,
                           type:"comment"
                            };
        var api_gateway_webchat_url = MixideaSetting.ApiGateway_url + "/event-webchat-notification";

        $http({
          url: api_gateway_webchat_url,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': auth_jwt_str
          },
          data: post_message
        }).then(function successCallback(response){

          if(response.data.errorMessage){
            console.log(response.data.errorMessage);
          }else{
            console.log(response.data);
            console.log("success to send notification to user through lambda")
          }

        }, function errorCallback(response){
          console.log("fail to put comment on lambda")
          console.log(response);
        });
  }


    webchat_message_service.goto_eventsite = function(){
      var state_param =  {id:webchat_message_service.service_event_id};
      $state.go('eventcontext_layout_two_column.context', state_param);

    }


    webchat_message_service.finalize = function(){
      finalsize_alldata();
    }

    function finalsize_alldata(){
      webchat_message_service.message_array.length = 0;
      if(webchat_message_ref){
        webchat_message_ref.off("child_added");
      }
      webchat_message_ref = null;
      if(full_participant_ref){
        full_participant_ref.off("value");
      }
      full_participant_ref = null;
      webchat_message_service.service_event_id = null;
      full_participant_array.length=0;
    }


    // Public API here
    return webchat_message_service;

  }]);
