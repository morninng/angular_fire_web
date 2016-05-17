'use strict';

angular.module('mixideaWebApp')
  .controller('EventContextCtrl',['$scope', '$stateParams', '$timeout', 'UserAuthService','MixideaSetting','DataStorageUserService','CheckBrowserService','$firebaseArray','$http', function ($scope, $stateParams,$timeout, UserAuthService, MixideaSetting, DataStorageUserService, CheckBrowserService, $firebaseArray, $http) {

    console.log("event context controller called");

  	var event_id = $stateParams.id;
    var root_ref = new Firebase(MixideaSetting.firebase_url);
    $scope.user = UserAuthService;
    $scope.user_service = DataStorageUserService

    $scope.check_browser = CheckBrowserService;
//////////////////////////////////
//show basic event info
/////////////////////////////////

  	$scope.event_obj = new Object();
    var event_ref = root_ref.child("event_related/event/" + event_id);
    event_ref.once("value", function(event_snapshot){
    	
      $scope.event_obj = event_snapshot.val();
      set_google_calendar_info();

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
    var game_ref = root_ref.child("event_related/game/" + event_id);

    $scope.game_obj = new Object();
    game_ref.once("value", function(game_snapshot){
      $scope.game_obj = game_snapshot.val();

      event_participant_ref.on("value", function(participant_snapshot){

        $scope.available_audience = false;
        $scope.available_debater = false;
        $scope.available_aud_or_debater = false;
        $scope.total_num = 0;

        var participant_obj = participant_snapshot.val();
        retrieve_userinfo_all(participant_obj);

      },function(){
        alert("fail to load participant data");
      });

    })



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

    var style = $scope.game_obj.deb_style;
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

    var own_event_list_ref = root_ref.child("users/event_list/" + $scope.user.own_uid + "/" + event_id);
    var event_participant_eventrole_ref = root_ref.child("event_related/participants/" + event_id + "/event_role/" + role_type + "/" + $scope.user.own_uid);
    var full_participant_ref = root_ref.child("event_related/participants/" + event_id + "/full/" + $scope.user.own_uid);


    own_event_list_ref.set("registered").then(function(o){

      return full_participant_ref.set(true);
    }).then(function(obj){

      return event_participant_eventrole_ref.set(true);
    }).then(function(){
      
      alert("succeed to join");
    },function(){

      alert("error to save data")
    })
  }

  function un_register_user(role_type){




    var own_event_list_ref = root_ref.child("users/event_list/" + $scope.user.own_uid + "/" + event_id);
    var event_participant_eventrole_ref = root_ref.child("event_related/participants/" + event_id + "/event_role/" + role_type + "/" + $scope.user.own_uid);
    var full_participant_ref = root_ref.child("event_related/participants/" + event_id + "/full/" + $scope.user.own_uid);

    
    event_participant_eventrole_ref.set(null).then(function(obj){

      return full_participant_ref.set(null);
    }).then(function(){
      
      return own_event_list_ref.set("cancelled");
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

////////////////////////////////////////
////////calendar info /////////////////
///////////////////////////////////////

function pad(n){return n<10 ? '0'+n : n};
function convert_datestyle(input_date){

  var d = new Date(input_date);
var year = pad(d.getUTCFullYear());
var month = pad(d.getUTCMonth() + 1);
var date = pad(d.getUTCDate());
var hour = pad(d.getUTCHours());
var minute = pad(d.getUTCMinutes());
var second = pad(d.getUTCSeconds());


  var date_string = String(year)
                  + String(month)
                  + String(date)
                  + 'T'
                  + String(hour)
                  + String(minute)
                  + String(second) + 'Z';
  return date_string;

}

  function set_google_calendar_info(){

  var start_time = $scope.event_obj.date_time;
  var start_time_str = convert_datestyle(start_time);
  var finish_time = start_time +  (2* 60 * 60 * 1000);
  var finish_time_str = convert_datestyle(finish_time);


  //var cal_domain = "https://calendar.google.com/calendar/gp?";
  var cal_domain = "https://www.google.com/calendar/render?";
  var cal_action = "action=TEMPLATE&";
  var cal_text = "text=Mixidea + Online + Debate&";
  var cal_dates = "dates=20131206T050000Z/20131208T060000Z";
  var cal_dates = "dates=" + start_time_str + "/" + finish_time_str;
  var cal_location = "&location=From your Home Computer&";
  var cal_sprop = "sprop=name:Name&";
  var cal_sprop2 = "sprop=website:EventWebite&";
  var cal_detail = ""
  var cal_sf = "sf=true&";
  var cal_output = "output=xml";


  var current_url = location.href;
  var detail = "You need to prepare following items" + 
    "\n - Google Chrome browser" + 
    "\n - headset with microphone" + 
    "\n - Desktop , Laptop, Netbook or tablet. Mobile phone is not available" + 
    "\n - Basic Pearliamenatary debate skill" +
    "\n\n" +
    "\n you can go to event page from here" + 
    "\n " + current_url;
  var detail_encrypt = encodeURIComponent(detail);
  cal_detail = "details=" + detail_encrypt + "&";
  var href_str = cal_domain + cal_action + cal_text + cal_dates + cal_location + cal_sprop + cal_sprop2 + cal_detail + cal_sf + cal_output;

  $scope.calendar_link = href_str;


}



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

      var chat_obj = {
        type:"comment",
        context:$scope.chat_context.comment,
        user:$scope.user.own_uid
      }


      $scope.event_webchat_array.$add(chat_obj).then(function(ref) {
        console.log(ref.key());
        $scope.chat_context.comment = null;
        notify_to_API_Gateway_eventChat();
      }).catch(function(error) {
        console.log("Error:", error);
      });;
    }
  }



  function notify_to_API_Gateway_eventChat(){


        var auth_jwt = $scope.user.create_jwt();
        var auth_jwt_str = JSON.stringify(auth_jwt);
        var full_participants_array = $scope.participant_audience.concat($scope.participant_debater).concat($scope.participant_aud_or_debater);
        var post_message = {full_participant: full_participants_array,
                           event_date: $scope.event_obj.date_time,
                           event_id: event_id,
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


}]);
