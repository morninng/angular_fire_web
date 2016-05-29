'use strict';

/**
 * @ngdoc service
 * @name mixideaWebApp.EventUtil
 * @description
 * # EventUtil
 * Service in the mixideaWebApp.
 */
angular.module('mixideaWebApp')
  .service('EventUtil',['UserAuthService','EventParticipateService','MixideaSetting','$http', function (UserAuthService, EventParticipateService, MixideaSetting, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function



    var root_ref = new Firebase(MixideaSetting.firebase_url);


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



	this.set_google_calendar_info = function(input_date){

		var start_time = input_date;
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

		return href_str;

	}




////////////////////////////////////////
////////event web chat /////////////////
///////////////////////////////////////

  this.submit_chat =function(event_id, comment_context, event_date){


  	  var event_webchat_ref = root_ref.child("event_related/event_webchat/" + event_id);


      var chat_obj = {
        type: "comment",
        context: comment_context,
        user: UserAuthService.own_uid
      }


      event_webchat_ref.push(chat_obj, function(error) {
      	if(error){
        	console.log("Error:", error);
      	}else{
	        notify_to_API_Gateway_eventChat(event_id, comment_context, event_date);
      	}
      });

    }



  function notify_to_API_Gateway_eventChat(event_id, comment_context, event_date_val){

  		if(!EventParticipateService.event_id){
  			return;
  		}

        var auth_jwt = UserAuthService.create_jwt();
        var auth_jwt_str = JSON.stringify(auth_jwt);
        var full_participants_array = EventParticipateService.participant_audience.concat(EventParticipateService.participant_debater).concat(EventParticipateService.participant_aud_or_debater);
        var post_message = {full_participant: full_participants_array,
                           event_date: event_date_val,
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
