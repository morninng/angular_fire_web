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
      all_event: {},
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
          event_data.all_event[loaded_list[i].$id] = loaded_list[i];
          event_data.future_event_idlist.push(loaded_list[i].$id);
        }
      })
      
    }


    event_data.reflesh_data = function(){

    }

    event_data.filter_by_weekday = function(day_array){

    }

    event_data.filter_by_timerange = function(time_from, time_to){

    }


    return event_data;

  }]);
