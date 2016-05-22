'use strict';

/**
 * @ngdoc service
 * @name mixideaWebApp.EventWebchatNotificationService
 * @description
 * # EventWebchatNotificationService
 * Factory in the mixideaWebApp.
 */
angular.module('mixideaWebApp')
  .factory('EventWebchatNotificationService',['MixideaSetting','UserAuthService' ,'$timeout','EventWebchatMessageService','DataStorageUserService','DataStorageEventService', function (MixideaSetting, UserAuthService, $timeout, EventWebchatMessageService, DataStorageUserService, DataStorageEventService) {
    // Service logic
    // ...

    var event_webchat_service = new Object();
    event_webchat_service.icon_img = "./images/message.png";
    event_webchat_service.icon_status = "default";

    event_webchat_service.open = false;
    event_webchat_service.webchat_array = new Array();
    event_webchat_service.active_num = 0;
    var user = UserAuthService;
    if(!user.own_uid){
      return event_webchat_service;
    }

    var root_ref = new Firebase(MixideaSetting.firebase_url);
    var own_webchat_ref = root_ref.child("users/event_webchat_notify/" + user.own_uid);


    own_webchat_ref.on("child_added", function(snapshot) {
      var webchat_obj = snapshot.val();
      webchat_obj.id = snapshot.key();
      DataStorageUserService.add_by_oneuser_id(webchat_obj.userid);
      DataStorageEventService.add_by_oneevent_id(webchat_obj.event_id);
      if(!webchat_obj.seen){

        if(EventWebchatMessageService.service_event_id == webchat_obj.event_id){
          update_state_seen(webchat_obj.id);
        }else if(event_webchat_service.icon_status == "default"){
          event_webchat_service.icon_img = "./images/message_red.png";
          event_webchat_service.icon_status = "active";
          $timeout(function() {});
        }
      }
      event_webchat_service.webchat_array.unshift(webchat_obj);
    });

    own_webchat_ref.on("child_changed", function(snapshot) {
      var updated_webchat_obj = snapshot.val();
      var updated_webchat_key = snapshot.key();

      for(var i=0; i< event_webchat_service.webchat_array.length;i++){
        if(updated_webchat_key == event_webchat_service.webchat_array[i].id){
          for(var key in updated_webchat_obj){
            event_webchat_service.webchat_array[i][key] = updated_webchat_obj[key];
          }
        }
      }
    });

    own_webchat_ref.on("child_removed", function(snapshot) {
      var removed_webchat_obj = snapshot.val();
      var removed_webchat_key = snapshot.key();

      for(var i=0; i< event_webchat_service.webchat_array.length;i++){
        if(removed_webchat_key == event_webchat_service.webchat_array[i].id){
          event_webchat_service.webchat_array.splice(i,1);
        }
      }
    });

/*
    function remove_same_event_object(obj_removed){
      for(var i=0; i< event_webchat_service.webchat_array.length;i++){
        if(obj_removed.event_id == event_webchat_service.webchat_array[i].event_id){
          event_webchat_service.webchat_array.splice(i,1);
        }
      }
    }
*/
    event_webchat_service.release_focused_status = function(){
      for(var i=0; i< event_webchat_service.webchat_array.length; i++){
        event_webchat_service.webchat_array[i].focus = false;
      }
    }

    event_webchat_service.seen = function(obj_key){
      event_webchat_service.icon_img = "./images/message.png";
      event_webchat_service.icon_status = "default"
      update_state_seen(obj_key)
    }

    function update_state_seen(obj_key){
      var seen_webchat_ref = root_ref.child("users/event_webchat_notify/" + user.own_uid + "/" + obj_key + "/seen");
      seen_webchat_ref.set(true, function(error) {
        if (error) {
          console.log("fail to set seen");
        } else {
          console.log("succeed to set seen");
        }
      });
    }


    // Public API here
    return event_webchat_service;
  }]);
