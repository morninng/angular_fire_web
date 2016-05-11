'use strict';

/**
 * @ngdoc service
 * @name mixideaWebApp.NotificationService
 * @description
 * # NotificationService
 * Factory in the mixideaWebApp.
 */
angular.module('mixideaWebApp')
  .factory('NotificationService',['MixideaSetting','UserAuthService','DataStorageUserService','DataStorageArticleService', function (MixideaSetting, UserAuthService, DataStorageUserService, DataStorageArticleService) {
    // Service logic
    // ...

    var notify_service = new Object();
    notify_service.icon_img = "./images/earth.png";
    notify_service.notify_array = new Array();
    notify_service.active_num = 0;
    var user = UserAuthService;

    var notify_obj = new Object();


    var root_ref = new Firebase(MixideaSetting.firebase_url);
    var own_notify_ref = root_ref.child("users/notify/" + user.own_uid);
    //notify_service.notify_array = $firebaseArray(own_notify_ref);


    own_notify_ref.on("child_added", function(snapshot) {

      notify_obj = snapshot.val();
      var key = snapshot.key();

      DataStorageUserService.add_by_oneuser_id(notify_obj.userid);
      //var obj = new Object();
      notify_obj.id = key;

      switch(notify_obj.type){
        case "argument_all":
          notify_obj["message"]="has commented to your article"
          DataStorageArticleService.add_by_onearticle_id(notify_obj.event_id);
        break;
      }

      if(!notify_obj.seen){
        notify_service.icon_img = "./images/earth_red.png";
        notify_service.active_num++;
      }
      notify_service.notify_array.unshift(notify_obj);
    });

    own_notify_ref.on("child_changed", function(snapshot) {
      

    });

    notify_service.release_focused_status = function(){

      for(var i=0; i< notify_service.notify_array.length; i++){
        notify_service.notify_array[i].focus = false;
      }

    }


    notify_service.seen = function( notify_obj_id){

      notify_service.active_num--;
      if(notify_service.active_num == 0){
        notify_service.icon_img = "./images/earth.png";
      }
      var notification_obj_ref = root_ref.child("users/notify/" + user.own_uid + "/" + notify_obj_id + "/seen");
      notification_obj_ref.set(true);

    }

    // Public API here
    return notify_service;
  }]);
