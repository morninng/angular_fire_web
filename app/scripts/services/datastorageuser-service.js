'use strict';

/**
 * @ngdoc service
 * @name mixideaWebApp.DataStorageUserService
 * @description
 * # DataStorageUserService
 * Factory in the mixideaWebApp.
 */
angular.module('mixideaWebApp')
  .factory('DataStorageUserService',['MixideaSetting','$timeout', function (MixideaSetting, $timeout) {
    // Service logic
    
    var user_service = new Object();
    user_service.user_data = new Object();


    var root_ref = new Firebase(MixideaSetting.firebase_url);

    var count_user = 0;

    user_service.add_by_array = function(user_id_array){
      count_user = 0;
      for(var i=0; i<user_id_array.length; i++ ){
        one_user_add(user_id_array[i], user_id_array.length);
      }
      
    };

    user_service.add_by_oneuser_id = function(user_id){
      one_user_add(user_id, 1);
      
    };


    function one_user_add(user_id, all_user_num){
      
      if( user_service.user_data[user_id] ){
        count_user++;
        if(count_user == all_user_num){
          $timeout(function() {});
        }
        return;
      }

      var user_obj_ref = root_ref.child("users/user_basic/" + user_id);
      user_obj_ref.on("value", function(snapshot) {
        count_user++;
        var user_obj  = snapshot.val();
        var user_key = snapshot.key();
        user_service.user_data[user_key] = user_obj;
        if(count_user == all_user_num){
          $timeout(function() {});
        }
      });

    }

    // Public API here
    return user_service;
    
  }]);
