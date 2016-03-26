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
  	var article_id = $stateParams.id;
    var root_ref = new Firebase(MixideaSetting.firebase_url);
    var game_ref = root_ref.child("event_related/game/" + article_id)
    var audio_trnscript_ref = root_ref.child("event_related/audio_transcript/" + article_id);
    $scope.deb_style = "BP";
    $scope.game_motion = null;

    var NA_role_array = [
    	{name:"PM" ,show_name: "Prime Minister", role_class: "left_side"},
    	{name:"LO" ,show_name: "Leader Opposition", role_class:"right_side" },
    	{name:"MG" ,show_name: "Member Government", role_class:"left_side" },
    	{name:"MO" ,show_name: "Member Opposition", role_class:"right_side" },
    	{name:"LOR" ,show_name: "Leader Opposition Reply", role_class:"right_side" },
    	{name:"PMR" ,show_name: "Prime Minister Reply", role_class:"left_side" }
    ];

    var Asian_role_array = [
        {name:"PM" ,show_name: "Prime Minister", role_class: "left_side"},
        {name:"LO" ,show_name: "Leader Opposition", role_class:"right_side" },
        {name:"DPM" ,show_name: "Depty Prime Minister", role_class: "left_side"},
        {name:"DLO" ,show_name: "Depty Leader Opposition", role_class: "right_side"},
        {name:"GW" ,show_name: "Govenment Whip", role_class: "left_side"},
        {name:"OW" ,show_name: "Opposition Whip", role_class: "right_side"},
        {name:"LOR" ,show_name: "Leader Opposition Reply", role_class:"right_side" },
        {name:"PMR" ,show_name: "Prime Minister Reply", role_class:"left_side" }
    ];

    var BP_role_array = [
        {name:"PM" ,show_name: "Prime Minister", role_class: "left_side"},
        {name:"LO" ,show_name: "Leader Opposition", role_class:"right_side" },
        {name:"DPM" ,show_name: "Depty Prime Minister", role_class: "left_side"},
        {name:"DLO" ,show_name: "Depty Leader Opposition", role_class: "right_side"},
        {name:"MG" ,show_name: "Member Government", role_class:"left_side" },
        {name:"MO" ,show_name: "Member Opposition", role_class:"right_side" },
        {name:"GW" ,show_name: "Govenment Whip", role_class: "left_side"},
        {name:"OW" ,show_name: "Opposition Whip", role_class: "right_side"},
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
    	$timeout(function(){});

    }, function(error){
    	console.log(error);
    });



  }]);
