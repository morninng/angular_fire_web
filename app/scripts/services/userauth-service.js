'use strict';

/**
 * @ngdoc service
 * @name mixideaWebApp.UserAuthService
 * @description
 * # UserAuthService
 * Factory in the mixideaWebApp.
 */
angular.module('mixideaWebApp')
  .factory('UserAuthService',['$timeout', function ($timeout) {

  console.log("UserAuthService called");

  var user = {
    loggedIn: false,
    first_name: null,
    last_name: null,
    profile_pict: null,
    lang_type: null,
    regist_complete:false
  };
  var own_user_ref = null;
  var own_user_basic_ref = null;
  var user_ext_profile_ref = null;


  var root_ref = new Firebase("https://mixidea.firebaseio.com/");


//when user is loged in, multiple listener start,
//every listener is registered 

  var regist_listener_for_registered_user = function(){
    //profile info retrieval and set listener
    own_user_basic_ref = root_ref.child("users/user_basic/" + self.own_uid);
    own_user_basic_ref.on("value", 
      retrieve_user_info, 
      show_error_log
    );

    //notification info retrieval and set listener
     // -> it should be other service but control from here

    //event related chat info retrieval and set listener
     // -> it should be other service but control from here
  }

  var un_regist_listener = function(){
    if(own_user_ref){
      own_user_ref.off("value", retrieve_user_info)
    }
  }

  var retrieve_user_info = function(snapshot){
    var value = snapshot.val();
    user.first_name = value.first_name;
    user.last_name = value.last_name;
    user.profile_pict = value.profile_pict;
  }



  user.login = function() {

    root_ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        var uid = authData.uid;
        var facebook_obj = authData.facebook.cachedUserProfile;
        own_user_basic_ref = root_ref.child("users/user_basic/" + uid);
        user_ext_profile_ref = root_ref.child("users/user_ext/" + uid + "/profile");

        var user_basic_obj = new Object();
        user_basic_obj["profile_pict"] = facebook_obj.picture.data.url;
        user_basic_obj["first_name"] = facebook_obj.last_name;
        user_basic_obj["last_name"] = facebook_obj.first_name;

        var user_profile_obj = new Object();
        user_profile_obj = {
          gender: {
            context:facebook_obj.gender
          }
        }
        own_user_basic_ref.set(user_basic_obj).then(function(){
          return user_ext_profile_ref.update(user_profile_obj);
        }).then(function(){
          $timeout(function() {
            user.regist_complete = true;
          });
          console.log("succeed to save");
        }, function(error){
          alert("fail to register user data");
        });
      }
    },
    {scope: "email,public_profile"}
    )
  }

  user.logout = function() {
    root_ref.unauth();
    user.regist_complete = false;
  }



  var show_error_log = function(error_obj){
    console.log(error_obj);
  }

  root_ref.onAuth(function(auth_obj){
    if(auth_obj){
      user.loggedIn = true;
      user.own_uid = auth_obj.uid;
      regist_listener_for_registered_user();
    }else{
      user.loggedIn = false;
      user.own_uid = null;
      un_regist_listener();
    }
  });


  return user;


}]);
