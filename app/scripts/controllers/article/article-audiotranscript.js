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

var audio_transcript_obj = {
	PM: {sp_11111:{
			speech_context:{
				short_aaa:{
					type: "speech",
					user: "facebook:1520978701540732",
					context: [
						{audio_time: 1000, text:"abcde"},
						{audio_time: 2000, text:"abcde"},
						{audio_time: 3000, text:"abcde"}
					]
				},
				short_bbb:{
					type: "poi",
					user: "facebook:1520978701540732",
					context: [
						{audio_time: 4000, text:"abcde"},
						{audio_time: 5000, text:"abcde"},
						{audio_time: 6000, text:"abcde"}
					]
				}
			},
			audio:"aaa.mp3"
		},
		sp_2222:{
			speech_context:{
				short_aaa:{
					type: "speech",
					user: "facebook:1520978701540732",
					context: [
						{audio_time: 1000, text:"abcde"},
						{audio_time: 2000, text:"abcde"},
						{audio_time: 3000, text:"abcde"}
					]
				}
			},
			audio:"aaa.mp3"
		},
    },
	LO: {sp_11111:{
			speech_context:{
				short_aaa:{
					type: "speech",
					user: "facebook:1520978701540732",
					context: [
						{audio_time: 1000, text:"abcde"},
						{audio_time: 2000, text:"abcde"},
						{audio_time: 3000, text:"abcde"}
					]
				}
			},
			audio:"aaa.mp3"
		}
    }
}



    game_ref.once("value").then(function(snapshot_game){

    	var obj = snapshot_game.val();
    	$timeout(function() {
			$scope.game_motion = obj.motion;
			$scope.deb_style = obj.deb_style;
		});

    	return audio_trnscript_ref.once("value");
    }).then(function(snapshot_audio_transcript){
    	var audio_transcript_obj = snapshot_audio_transcript.val();
    }, function(error){
    	console.log(error);
    });



  }]);
