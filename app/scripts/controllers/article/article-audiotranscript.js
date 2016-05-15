'use strict';

/**
 * @ngdoc function
 * @name mixideaWebApp.controller:ArticleAudiotranscriptCtrl
 * @description
 * # ArticleAudiotranscriptCtrl
 * Controller of the mixideaWebApp
 */
angular.module('mixideaWebApp')
  .controller('ArticleAudiotranscriptCtrl', ["$scope", "$stateParams",'MixideaSetting','$timeout', function ($scope ,$stateParams, MixideaSetting, $timeout) {

  	console.log('ArticleAudiotranscriptCtrl');
  	var article_identifier = $stateParams.id;
    var root_ref = new Firebase(MixideaSetting.firebase_url);
    var game_ref = root_ref.child("event_related/game/" + article_identifier)
    var audio_trnscript_ref = root_ref.child("event_related/audio_transcript/" + article_identifier);
    $scope.deb_style = "BP";
    $scope.game_motion = null;

    $scope.comment_obj = new Object();
    $scope.comment_obj["article_id"] = article_identifier;
    $scope.comment_obj["type"] = "audio_all";
    $scope.comment_obj["author_list"] = new Array();
    $scope.article_id = article_identifier;
    $scope.full_participant_array = new Array();


    var NA_role_array = [
    	{name:"PM" ,show_name: "Prime Minister", role_class: "left_side", comment_obj:{article_id:article_identifier,type: "audio_each",role:"PM"}},
    	{name:"LO" ,show_name: "Leader Opposition", role_class:"right_side", comment_obj:{article_id:article_identifier,type: "audio_each",role:"LO"} },
    	{name:"MG" ,show_name: "Member Government", role_class:"left_side", comment_obj:{article_id:article_identifier,type: "audio_each",role:"MG"} },
    	{name:"MO" ,show_name: "Member Opposition", role_class:"right_side", comment_obj:{article_id:article_identifier,type: "audio_each",role:"MO"} },
    	{name:"LOR" ,show_name: "Leader Opposition Reply", role_class:"right_side", comment_obj:{article_id:article_identifier,type: "audio_each",role:"LOR"} },
    	{name:"PMR" ,show_name: "Prime Minister Reply", role_class:"left_side", comment_obj:{article_id:article_identifier,type: "audio_each",role:"PMR"} }
    ];

    var Asian_role_array = [
        {name:"PM" ,show_name: "Prime Minister", role_class: "left_side", comment_obj:{article_id:article_identifier,type: "audio_each",role:"PM"}},
        {name:"LO" ,show_name: "Leader Opposition", role_class:"right_side", comment_obj:{article_id:article_identifier,type: "audio_each",role:"LO"} },
        {name:"DPM" ,show_name: "Depty Prime Minister", role_class: "left_side", comment_obj:{article_id:article_identifier,type: "audio_each",role:"DPM"}},
        {name:"DLO" ,show_name: "Depty Leader Opposition", role_class: "right_side", comment_obj:{article_id:article_identifier,type: "audio_each",role:"DLO"}},
        {name:"GW" ,show_name: "Govenment Whip", role_class: "left_side", comment_obj:{article_id:article_identifier,type: "audio_each",role:"GW"}},
        {name:"OW" ,show_name: "Opposition Whip", role_class: "right_side", comment_obj:{article_id:article_identifier,type: "audio_each",role:"OW"}},
        {name:"LOR" ,show_name: "Leader Opposition Reply", role_class:"right_side" , comment_obj:{article_id:article_identifier,type: "audio_each",role:"LOR"}},
        {name:"PMR" ,show_name: "Prime Minister Reply", role_class:"left_side" , comment_obj:{article_id:article_identifier,type: "audio_each",role:"PMR"}}
    ];

    var BP_role_array = [
        {name:"PM" ,show_name: "Prime Minister", role_class: "left_side" , comment_obj:{article_id:article_identifier,type: "audio_each",role:"PM"}},
        {name:"LO" ,show_name: "Leader Opposition", role_class:"right_side"  , comment_obj:{article_id:article_identifier,type: "audio_each",role:"LO"}},
        {name:"DPM" ,show_name: "Depty Prime Minister", role_class: "left_side" , comment_obj:{article_id:article_identifier,type: "audio_each",role:"DPM"}},
        {name:"DLO" ,show_name: "Depty Leader Opposition", role_class: "right_side" , comment_obj:{article_id:article_identifier,type: "audio_each",role:"DLO"}},
        {name:"MG" ,show_name: "Member Government", role_class:"left_side"  , comment_obj:{article_id:article_identifier,type: "audio_each",role:"MG"}},
        {name:"MO" ,show_name: "Member Opposition", role_class:"right_side"  , comment_obj:{article_id:article_identifier,type: "audio_each",role:"MO"}},
        {name:"GW" ,show_name: "Govenment Whip", role_class: "left_side"  , comment_obj:{article_id:article_identifier,type: "audio_each",role:"GW"}},
        {name:"OW" ,show_name: "Opposition Whip", role_class: "right_side"  , comment_obj:{article_id:article_identifier,type: "audio_each",role:"OW"}},
    ];

    game_ref.once("value").then(function(snapshot_game){

    	var obj = snapshot_game.val();
		$scope.game_motion = obj.motion;
		$scope.deb_style = obj.deb_style;

        var audio_trnscript_style_ref = audio_trnscript_ref.child($scope.deb_style);

    	return audio_trnscript_style_ref.once("value");
    }).then(function(snapshot_audio_transcript){
        
    	switch($scope.deb_style){
    		case "NA":
    			$scope.role_array = NA_role_array;
    		break;
    		case "Asian":
    			$scope.role_array = Asian_role_array;
    		break;
    		case "BP":
    			$scope.role_array = BP_role_array;
    		break;
    	}
    	$scope.audio_transcript_obj = snapshot_audio_transcript.val();

        // set the speaker information list as the author_list
        // 
        for(var role_key in $scope.audio_transcript_obj){
            console.log(role_key)
            var author_list = new Array();
            var audio_obj_eachrole = $scope.audio_transcript_obj[role_key];
            for(var key2 in audio_obj_eachrole){
                var speech_context_obj = audio_obj_eachrole[key2].spech_context;
                for(var key3 in speech_context_obj){
                    var each_context = speech_context_obj[key3];
                    var user_id = each_context.user;
                    author_list.push(user_id);
                }
            }
            console.log($scope.role_array[role_key]);

            for(var i=0; i< $scope.role_array.length; i++){
                if($scope.role_array[i].name == role_key){
                    $scope.role_array[i].comment_obj["author_list"]=author_list;
                }
            }
        }

    	$timeout(function(){});

    }, function(error){
    	console.log(error);
    });


//retrieve full 

    var full_participants_ref = root_ref.child("event_related/participants/" + article_identifier + "/full");
    full_participants_ref.once("value",function(snapshot){

      var participants_obj = snapshot.val();
      console.log(participants_obj);

      for(var key in participants_obj){
        $scope.full_participant_array.push(key);
        $scope.comment_obj["author_list"].push(key);
      }
      $timeout(function(){});
    });


  }]);
