'use strict';

/**
 * @ngdoc service
 * @name mixideaWebApp.DataStorageEventService
 * @description
 * # DataStorageEventService
 * Factory in the mixideaWebApp.
 */
angular.module('mixideaWebApp')
  .factory('DataStorageEventService',["$firebaseArray","$timeout",'MixideaSetting', function ($firebaseArray,$timeout,MixideaSetting) {



    var event_data = {
      all_data: {},
      future_event_idlist:[],
      own_event_idlist:[]
    }

    var root_ref = new Firebase(MixideaSetting.firebase_url);
    var event_ref = root_ref.child("event_related/event");


    event_data.load_all_futuredata = function(search_start_timing){

      var query = event_ref.orderByChild("date_time").startAt(search_start_timing);
      var list = $firebaseArray(query);

      list.$loaded().then(function(loaded_list){
        event_data.future_event_idlist.length = 0;
        console.log(loaded_list);
        for(var i=0; i< loaded_list.length; i++){
          event_data.all_data[loaded_list[i].$id] = loaded_list[i];
          event_data.future_event_idlist.push(loaded_list[i].$id);
        }
      })
      
    }

    var count_event = 0;

    event_data.add_by_array = function(event_id_array){
      count_event = 0;

      for(var i=0; i< event_id_array.length; i++){
        one_event_add(event_id_array[i], event_id_array.length)
      }
    }


    function one_event_add(event_id, all_event_num){
      
      if( event_data.all_data[event_id] ){
        count_event++;
        if(count_event == all_event_num){
          $timeout(function() {});
        }
        return;
      }

      var event_obj_ref = root_ref.child("event_related/event/" + event_id);
      event_obj_ref.on("value", function(snapshot) {
        count_event++;
        var event_obj  = snapshot.val();
        var event_key = snapshot.key();
        event_data.all_data[event_key] = event_obj;
        if(count_event == all_event_num){
          $timeout(function() {});
        }
      });

    }


/*
    event_data.reflesh_data = function(){

    }

    event_data.filter_by_weekday = function(day_array){

    }

    event_data.filter_by_timerange = function(time_from, time_to){

    }
*/

    return event_data;

  }]);
