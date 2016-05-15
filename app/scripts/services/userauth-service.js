'use strict';

/**
 * @ngdoc service
 * @name mixideaWebApp.UserAuthService
 * @description
 * # UserAuthService
 * Factory in the mixideaWebApp.
 */
angular.module('mixideaWebApp')
  .factory('UserAuthService',['$timeout','MixideaSetting', function ($timeout, MixideaSetting) {

  console.log("UserAuthService called");

  var user = {
    loggedIn: false,
    first_name: null,
    last_name: null,
    profile_pict: null,
    lang_type: null,
    regist_complete:false,
    own_uid: null,
    api_securekey : null
  };
  var own_user_ref = null;
  var own_user_basic_ref = null;
  var user_ext_profile_ref = null;


  var root_ref = new Firebase(MixideaSetting.firebase_url);


//when user is loged in, multiple listener start,
//every listener is registered 

  var regist_listener_for_registered_user = function(){
    //profile info retrieval and set listener
    own_user_basic_ref = root_ref.child("users/user_basic/" + user.own_uid);
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

    $timeout(function() {
      user.first_name = value.first_name;
      user.last_name = value.last_name;
      user.profile_pict = value.profile_pict;
    });

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


  // secure key info can be written by user only but cannot read it.
  //secure key info can be read only by apigateway server

  var generate_random_string = function(){

    var c = "abcdefghijklmnopqrstuvwxyz0123456789";
    var cl = c.length;
    var random = "";
    for(var i=0; i<20; i++){
      random += c[Math.floor(Math.random()*cl)];
    }
    return random;
  }

  var register_api_securekey = function(){

    var api_securekey = generate_random_string();

    var user_apisecurekey_ref = root_ref.child("users/apisecurekey/" + user.own_uid);
    user_apisecurekey_ref.set(api_securekey, function(error){
      if(error){
        console.log(error);
      }else{
        console.log("succeed to save");
        //set_mac_value(api_securekey);
        //trial_read_fortest();
      }
    });

    user_apisecurekey_ref.on("value",function(snapshot){
      var api_securekey = snapshot.val();
      console.log("secure key is updated : " + api_securekey);
      set_mac_value(api_securekey);

    },function(error){
      console.log("secure key cannot read" + error);
    });

  }

  var set_mac_value = function(secure_key){

      console.log("apiscurekey : " + secure_key);
      var hash = CryptoJS.HmacSHA256(user.own_uid, secure_key);
      var hashHex = CryptoJS.enc.Hex.stringify(hash);
      user.mac = hashHex;
      console.log("mac value is " + user.mac);

  }






  user.create_jwt = function(){



    var jwt = {
      user_id: user.own_uid,
      mac:user.mac
    }
    console.log(jwt);
    return jwt;
  }


  root_ref.onAuth(function(auth_obj){
    if(auth_obj){
      user.loggedIn = true;
      user.own_uid = auth_obj.uid;
      regist_listener_for_registered_user();
      register_api_securekey();
    }else{
      user.loggedIn = false;
      user.own_uid = null;
      un_regist_listener();
    }
  });


  return user;


}]);
