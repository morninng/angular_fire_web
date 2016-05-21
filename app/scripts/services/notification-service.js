'use strict';

/**
 * @ngdoc service
 * @name mixideaWebApp.NotificationService
 * @description
 * # NotificationService
 * Factory in the mixideaWebApp.
 */
angular.module('mixideaWebApp')
  .factory('NotificationService',['MixideaSetting','UserAuthService','DataStorageUserService','DataStorageArticleService','DataStorageArgumentService', function (MixideaSetting, UserAuthService, DataStorageUserService, DataStorageArticleService, DataStorageArgumentService) {


    var notify_service = new Object();
    notify_service.icon_img = "./images/earth.png";
    notify_service.notify_array = new Array();
    notify_service.active_num = 0;
    var user = UserAuthService;
    if(!user.own_uid){
      return notify_service;
    }

    var notify_obj = new Object();

    var root_ref = new Firebase(MixideaSetting.firebase_url);
    var own_notify_ref = root_ref.child("users/notify/" + user.own_uid);
    //notify_service.notify_array = $firebaseArray(own_notify_ref);


    own_notify_ref.on("child_added", function(snapshot) {

      notify_obj = snapshot.val();
      var key = snapshot.key();

      DataStorageUserService.add_by_oneuser_id(notify_obj.userid);
      //var obj = new Object();
      notify_obj.id = key; //used to edit the notify_obj by ng-click when it is seen

      DataStorageArticleService.add_by_onearticle_id(notify_obj.event_id);



      switch(notify_obj.type){
        case "argument_all":
          if(notify_obj.notify_type == "author"){
            notify_obj["message"]="put general comment to article";
          }else if(notify_obj.notify_type == "commentor"){
            notify_obj["message"]="also put general comment to article";
          }
        break;
        case "argument_each":
          if(notify_obj.notify_type == "author"){
            notify_obj["message"]="has commented to your argument";
          }else if(notify_obj.notify_type == "commentor"){
            notify_obj["message"]="also commeted to argument";
          }
          DataStorageArgumentService.add_by_oneargument( notify_obj["event_id"], notify_obj["argument_id"] );
        break;
        case "audio_all":
          if(notify_obj.notify_type == "author"){
            notify_obj["message"]="has commented to your round speech";
          }else if(notify_obj.notify_type == "commentor"){
            notify_obj["message"]="also put general comment to the speech";
          }
        break;
        case "audio_each":
          if(notify_obj.notify_type == "author"){
            notify_obj["message"]="has commented to your " + notify_obj.role + " speech of";
          }else if(notify_obj.notify_type == "commentor"){
            notify_obj["message"]="also commented to " + notify_obj.role + " speech of" ;
          }
        break;
      }

      if(!notify_obj.seen){
        notify_service.icon_img = "./images/earth_red.png";
        notify_service.active_num++;
      }
      notify_service.notify_array.unshift(notify_obj);
    });



    own_notify_ref.on("child_changed", function(snapshot) {
      var updated_notify_obj = snapshot.val();
      console.log(notify_service);
      for(var i=0; i< notify_service.notify_array.length; i++){
        if(notify_service.notify_array[i].event_id == updated_notify_obj.event_id && 
          notify_service.notify_array[i].type == updated_notify_obj.type && 
          notify_service.notify_array[i].role == updated_notify_obj.role && 
          notify_service.notify_array[i].argument_id == updated_notify_obj.argument_id ){
          notify_service.notify_array[i].seen = updated_notify_obj.seen;
        }
      }

    });


    own_notify_ref.on("child_removed", function(snapshot) {
      var removed_notify_obj = snapshot.val();
      for(var i=0; i< notify_service.notify_array.length; i++){
        if(notify_service.notify_array[i].event_id == removed_notify_obj.event_id && 
          notify_service.notify_array[i].type == removed_notify_obj.type && 
          notify_service.notify_array[i].role == removed_notify_obj.role && 
          notify_service.notify_array[i].argument_id == removed_notify_obj.argument_id ){
          notify_service.notify_array.splice(i,1);
        }
      }
    });



    notify_service.release_focused_status = function(){

      for(var i=0; i< notify_service.notify_array.length; i++){
        notify_service.notify_array[i].focus = false;
      }

    }


    notify_service.seen = function( notify_obj_id){

      notify_service.active_num = 0;
      notify_service.icon_img = "./images/earth.png";
      /*
      if(notify_service.active_num == 0){
        notify_service.icon_img = "./images/earth.png";
      }
      */
      var notification_obj_ref = root_ref.child("users/notify/" + user.own_uid + "/" + notify_obj_id + "/seen");
      notification_obj_ref.set(true, function(error) {
        if (error) {
          console.log("fail to set seen");
        } else {
          console.log("succeed to set seen");
        }
      });

    }

    // Public API here
    return notify_service;
  }]);
