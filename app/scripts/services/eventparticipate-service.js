'use strict';

/**
 * @ngdoc service
 * @name mixideaWebApp.EventParticipateService
 * @description
 * # EventParticipateService
 * Factory in the mixideaWebApp.
 */

angular.module('mixideaWebApp')
  .factory('EventParticipateService',['UserAuthService','MixideaSetting','DataStorageUserService','$timeout', function (UserAuthService, MixideaSetting, DataStorageUserService, $timeout) {
    // Service logic
    var event_participant = new Object();
    var event_id = null;
    var style = null;
    var root_ref = new Firebase(MixideaSetting.firebase_url);
    event_participant.event_id = null;
    event_participant.available_audience = false;
    event_participant.available_debater = false;
    event_participant.available_aud_or_debater = false;
    event_participant.participant_audience = new Array();
    event_participant.participant_debater = new Array();
    event_participant.participant_aud_or_debater = new Array();
    var total_num = 0;

    var event_participant_ref = null;



    event_participant.initialize = function(in_event_id, in_style){
      if(in_event_id == event_id){
        return;
      }else if(event_id){
        this.finalize(event_id);
      }
      event_id= in_event_id;
      event_participant.event_id = in_event_id;
      style = in_style;
      start_listen()
    }


    function start_listen(){

      event_participant_ref = root_ref.child("event_related/participants/" + event_id + "/event_role");
      event_participant_ref.on("value", function(participant_snapshot){


      event_participant.available_audience = false;
      event_participant.available_debater = false;
      event_participant.available_aud_or_debater = false;
      total_num = 0;

        var participant_obj = participant_snapshot.val();
        retrieve_userinfo_all(participant_obj);

      },function(){
        alert("fail to load participant data");
      });

    }


//////////////////////////////////
// participant management
/////////////////////////////////



    function retrieve_userinfo_all(participant_obj){

      total_num = 0;
      var all_user_id_array = new Array();

      if(event_participant.participant_audience){
          event_participant.participant_audience.length=0;
      }
      var number_audience = 0;
      if(participant_obj){
        for(var key in participant_obj.audience){
          event_participant.participant_audience.push(key);
          all_user_id_array.push(key);
          total_num++;
          number_audience++;
        }
      }

      if(event_participant.participant_debater){
          event_participant.participant_debater.length=0;
      }
      var number_debater = 0;
      if(participant_obj){
        var user_id_array = new Array();
        for(var key in participant_obj.debater){
          event_participant.participant_debater.push(key);
          all_user_id_array.push(key);
          total_num++;
          number_debater++;
        }
      }

      if(event_participant.participant_aud_or_debater){
          event_participant.participant_aud_or_debater.length=0;
      }
      var number_aud_or_debater = 0;
      if(participant_obj){
        var aud_or_debater_user_id_array = new Array();
        for(var key in participant_obj.aud_or_debater){
          event_participant.participant_aud_or_debater.push(key)
          all_user_id_array.push(key);
          total_num++;
          number_aud_or_debater++;
        }
      }

      DataStorageUserService.add_by_array(all_user_id_array);

      //the end
      
      event_participant.available_audience = validate("audience", number_audience);
      event_participant.available_debater = validate("debater", number_debater);
      event_participant.available_aud_or_debater = validate("aud_or_debater", number_aud_or_debater);
   
      $timeout(function() {});
    }



    function validate(role_type, num){

      if(total_num>9){
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

  function register_user(role_type, succeed_regist_cb){

    var own_event_list_ref = root_ref.child("users/event_list/" + UserAuthService.own_uid + "/" + event_id);
    var event_participant_eventrole_ref = root_ref.child("event_related/participants/" + event_id + "/event_role/" + role_type + "/" + UserAuthService.own_uid);
    var full_participant_ref = root_ref.child("event_related/participants/" + event_id + "/full/" + UserAuthService.own_uid);


    own_event_list_ref.set("registered").then(function(o){

      return full_participant_ref.set(true);
    }).then(function(obj){

      return event_participant_eventrole_ref.set(true);
    }).then(function(){
      
      succeed_regist_cb();
    },function(){

      alert("error to save data")
    })
  }


  function un_register_user(role_type){


    var own_event_list_ref = root_ref.child("users/event_list/" + UserAuthService.own_uid + "/" + event_id);
    var event_participant_eventrole_ref = root_ref.child("event_related/participants/" + event_id + "/event_role/" + role_type + "/" + UserAuthService.own_uid);
    var full_participant_ref = root_ref.child("event_related/participants/" + event_id + "/full/" + UserAuthService.own_uid);

    
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

  function count_up_participants(role_type, succeed_regist_cb){

    if(!UserAuthService.own_uid){
      alert("you need to login to join the game");
      return;
    }

    var event_ref = root_ref.child("event_related/event/" + event_id);

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
        register_user(role_type, succeed_regist_cb);
      }
    });
  }


  function count_down_participants(role_type){

    var event_ref = root_ref.child("event_related/event/" + event_id);
    var participant_num_ref = event_ref.child("participants_num/" + role_type);
    participant_num_ref.transaction(function(current_num){
      var new_vlaue = current_num-1;
      return new_vlaue;
    });
  }


  event_participant.join = function(role, succeed_regist_cb){
    count_up_participants(role, succeed_regist_cb);
  }

  event_participant.cancel_participante = function(role){
    count_down_participants(role);
    un_register_user(role);
  }



    event_participant.finalize = function(in_event_id){
      event_participant.event_id = null;
      if(event_participant_ref){
        event_participant_ref.off();
      }

    }


    return event_participant;
  }]);
