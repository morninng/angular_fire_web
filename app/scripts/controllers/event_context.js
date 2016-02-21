'use strict';

angular.module('mixideaWebApp')
  .controller('EventContextCtrl',['$scope', '$stateParams','$timeout', 'UserAuthService', function ($scope, $stateParams,$timeout, UserAuthService) {

    console.log("event context controller called");

  	var event_id = $stateParams.id;
    var user = UserAuthService;
  	$scope.event_obj = new Object();

    var root_ref = new Firebase("https://mixidea.firebaseio.com/");
    var event_ref = root_ref.child("event_related/event/" + event_id);
    event_ref.on("value", function(snapshot){
    	$timeout(function() {

    		$scope.event_obj = snapshot.val();
        $scope.total_num = 0;
        if($scope.event_obj.participant.debater){
          $scope.total_num = $scope.total_num  + $scope.event_obj.participant.debater.num;
        }
        if($scope.event_obj.participant.audience){
          $scope.total_num = $scope.total_num  + $scope.event_obj.participant.audience.num;
        }
        if($scope.event_obj.participant.aud_or_debater){
          $scope.total_num = $scope.total_num  + $scope.event_obj.participant.aud_or_debater.num;
        }
        console.log("current participants: " + $scope.total_num)

	    });
    },function(){
    	alert("fail to load data");
    });


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
            if(num<4){
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

    var role_ref = event_ref.child("participant/" + role_type + "/member/" + user.own_uid);
    var participant_ref = root_ref.child("event_related/participants/" + event_id + "/" + user.own_uid);

    participant_ref.set(true).then(function(obj){

      return role_ref.set(true);
    }).then(function(){
      
      alert("succeed to join");
    },function(){

      alert("error to save data")
    })
  }

  function countup_participants(role_type){

    if(!user.own_uid){
      alert("you need to login to join the game");
      return;
    }

    var participant_num_ref = event_ref.child("participant/" + role_type);
    participant_num_ref.transaction(function(current_obj){

      var valid = true;
      var new_obj = current_obj;

      if(current_obj){
        valid = validate(role_type, current_obj.num);
        if(!valid){
          return;        
        }
      }else{
        valid = validate(role_type, 0);
        if(!valid){
          return;        
        }
        new_obj = {num:0};
      }
      new_obj.num++;

      return new_obj;

    }, function(error, committed, snapshot){
      console.log("transaction complete");
      if(error){
        alert('transaction failed' + error);
      }else if(!committed){
        alert("other person may take a role and cannot login more");
      }else{
        register_user("role_type");
      }
    });
  }

	$scope.join_as_debater = function(){
    countup_participants("debater");

	}

	$scope.join_as_audience = function(){
    countup_participants("audience");

	}

	$scope.join_as_AudOrDebater = function(){
    countup_participants("aud_or_debater");

	}

}]);
