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

$scope.audio_transcript_obj = {
	PM: {sp_11111:{
			speech_context:{
				short_aaa:{
					type: "speech",
					user: "facebook:1520978701540732",
					context: [
						{audio_time: 1000, text:"pm1_abcde"},
						{audio_time: 2000, text:"pm1_fghij"},
						{audio_time: 5000, text:"pm1_klmn"}
					]
				},
				short_bbb:{
					type: "poi",
					user: "facebook:1520978701540732",
					context: [
						{audio_time: 7000, text:"pm2_OPQ"},
						{audio_time: 9000, text:"pm2_RST"},
						{audio_time: 15000, text:"pm2_UVW"}
					]
				},
				short_ccc:{
					type: "speech",
					user: "facebook:1520978701540732",
					context: [
						{audio_time: 20000, text:"pm1_xyz"},
						{audio_time: 25000, text:"pm1_123"},
						{audio_time: 30000, text:"pm1_456"}
					]
				}
			},
			audio:"https://s3-ap-northeast-1.amazonaws.com/mixideaspeech/yFLAmQp13d_LeaderOpposition_ad125a4b.mp3"
		},
		sp_2222:{
			speech_context:{
				short_aaa:{
					type: "speech",
					user: "facebook:1520978701540732",
					context: [
						{audio_time: 1000, text:"pm3_abcde"},
						{audio_time: 2000, text:"pm3_fghij"},
						{audio_time: 3000, text:"pm3_klmn"}
					]
				}
			},
			audio:"https://s3-ap-northeast-1.amazonaws.com/mixideaspeech/yFLAmQp13d_LeaderOpposition_ad125a4b.mp3"
		},
    },
	LO: {sp_11111:{
			speech_context:{
				short_aaa:{
					type: "speech",
					user: "facebook:1520978701540732",
					context: [
						{audio_time: 1000, text:"lo1_abcde"},
						{audio_time: 2000, text:"lo1_abcde"},
						{audio_time: 3000, text:"lo1_abcde"}
					]
				},
				short_bbb:{
					type: "poi",
					user: "facebook:1520978701540732",
					context: [
						{audio_time: 7000, text:"pm2_OPQ"},
						{audio_time: 9000, text:"pm2_RST"},
						{audio_time: 15000, text:"pm2_UVW"}
					]
				}
			},
			audio:"https://s3-ap-northeast-1.amazonaws.com/mixideaspeech/yFLAmQp13d_LeaderOpposition_ad125a4b.mp3"
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
 //   	var audio_transcript_obj = snapshot_audio_transcript.val();
    }, function(error){
    	console.log(error);
    });



  }]);
