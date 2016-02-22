'use strict';

angular.module('mixideaWebApp')
  .controller('EventContextCtrl',['$scope', '$stateParams','$timeout', 'UserAuthService', function ($scope, $stateParams,$timeout, UserAuthService) {

    console.log("event context controller called");

  	var event_id = $stateParams.id;
    var root_ref = new Firebase("https://mixidea.firebaseio.com/");
    $scope.user = UserAuthService;

//show basic event info

  	$scope.event_obj = new Object();
    var event_ref = root_ref.child("event_related/event/" + event_id);
    event_ref.once("value", function(snapshot){
    	
      $scope.event_obj = snapshot.val();

    },function(){
    	alert("fail to load event data");
    });

///participant management

    $scope.participant_audience = new Array();
    $scope.participant_debater = new Array();
    $scope.participant_aud_or_debater = new Array();
    $scope.available_audience = false;
    $scope.available_debater = false;
    $scope.available_aud_or_debater = false;
    $scope.already_joined = true;
    var own_role = null;


    var root_ref = new Firebase("https://mixidea.firebaseio.com/");
    var event_participant_ref = root_ref.child("event_related/participants/" + event_id + "/event_role");
    event_participant_ref.on("value", function(snapshot){

      $scope.available_audience = false;
      $scope.available_debater = false;
      $scope.available_aud_or_debater = false;
      $scope.already_joined = true;
      $scope.total_num = 0;

      var participant_obj = snapshot.val();
      retrieve_userinfo_all(participant_obj);

    },function(){
      alert("fail to load participant data");
    });

    function retrieve_userinfo_all(participant_obj){

      $scope.total_num = 0;
      var exist_own = false;

      if($scope.participant_audience){
          $scope.participant_audience.length=0;
      }
      var number_audience = 0;
      if(participant_obj){
        for(var key in participant_obj.audience){
          retrieve_userinfo(key, $scope.participant_audience);
          $scope.total_num++;
          number_audience++;
          if(key == $scope.user.own_uid){
            exist_own = true;
            own_role = "audience";
          }
        }
      }

      //the end
      $timeout(function() {
        $scope.available_audience = validate("audience", number_audience);
   
        if(!exist_own){
          $scope.already_joined = false;
        }
      });
    }


    function retrieve_userinfo(user_id, user_array){
      var user_ref =  root_ref.child("users/user_basic/" + user_id);
      user_ref.once("value", function(snapshot){
        $timeout(function() {
          var user_data = snapshot.val();
          var user_id = snapshot.key();
          user_data.id = user_id;
          user_array.push(user_data);
        });
      })
    }




  function validate(role_type, num){

    var style = $scope.event_obj.deb_style;
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


  function register_user(role_type){


    var event_participant_user_ref = root_ref.child("event_related/participants/" + event_id + "/event_role/" + role_type + "/" + $scope.user.own_uid);
    var full_participant_ref = root_ref.child("event_related/participants/" + event_id + "/full/" + $scope.user.own_uid);

    full_participant_ref.set(true).then(function(obj){

      return event_participant_user_ref.set(true);
    }).then(function(){
      
      alert("succeed to join");
    },function(){

      alert("error to save data")
    })
  }

  function un_register_user(role_type){

    var role_ref = event_ref.child("participant/" + role_type + "/member/" + $scope.user.own_uid);
    var participant_ref = root_ref.child("event_related/participants/" + event_id + "/" + $scope.user.own_uid);



    var event_participant_user_ref = root_ref.child("event_related/participants/" + event_id + "/event_role/" + role_type + "/" + $scope.user.own_uid);
    var full_participant_ref = root_ref.child("event_related/participants/" + event_id + "/full/" + $scope.user.own_uid);

    
    event_participant_user_ref.set(null).then(function(obj){

      return full_participant_ref.set(null);
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

}]);
