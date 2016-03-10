'use strict';

/**
 * @ngdoc directive
 * @name mixideaWebApp.directive:oneAudTrans
 * @description
 * # oneAudTrans
 */
angular.module('mixideaWebApp')
  .directive('oneAudTrans',['$timeout', function ($timeout) {
    return {
      templateUrl: 'views/directive/oneAudTrans.html',
      restrict: 'E',
      replace: true,
      scope: {
      	audio_transcript_data: '=audtransData'
      },
      link: function postLink(scope, element, attrs) {
        console.log("oneAudTrans");
        console.log(scope.audio_transcript_data);
        var speech_context =  scope.audio_transcript_data.speech_context
        scope.short_context_array = new Array();
        

        var audio_file =scope.audio_transcript_data.audio;

        if(audio_file){
        	var audio_element = new Audio();
        	audio_element.controls = true;
        	audio_element.src=audio_file;
          audio_element.addEventListener("seeked", function(){ Audio_Time_update("seek")});
          audio_element.addEventListener("timeupdate", function(){ Audio_Time_update("time_update")});
          var audio_container_element = element[0].getElementsByClassName("audio_player")[0];
          audio_container_element.insertBefore(audio_element, null);

        }
        var prev_updated_time = 0;

        function Audio_Time_update(type){

          var current_time = audio_element.currentTime;
          console.log(current_time);

          if(type=="time_update"){
            var duration = current_time - prev_updated_time;
            console.log("duration " + duration);
            if(duration > 2.0){
              console.log("update view");
              update_view(current_time);
              prev_updated_time = current_time;
            }
          }else if (type=="seek"){
            update_view(current_time)
            prev_updated_time = current_time;  
          }

        }


        function update_view(current_time){
          scope.short_context_array.length=0;
          var already_switched = false;
          current_time = current_time*1000;
          $timeout(function() {
            for(var key in speech_context){
              var short_split_object = new Object();
              var short_split_context_array = new Array();
              for(var i=0; i< speech_context[key].context.length; i++){
                speech_context[key].context[i].style="normal";
                if( (current_time>0) && 
                    (!already_switched) &&  
                    (speech_context[key].context[i].audio_time > current_time)){
                  speech_context[key].context[i].style = "current_speech" ;
                  already_switched = true;
                }
                short_split_context_array.push(speech_context[key].context[i])
              }
              short_split_object.context = short_split_context_array;
              short_split_object.user = speech_context[key].user;
              short_split_object.type = speech_context[key].type;
              scope.short_context_array.push(short_split_object);
            }
          });
        }


        //construct initial view
        update_view(-1);


      }
    };
  }]);
