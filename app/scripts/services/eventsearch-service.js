'use strict';

/**
 * @ngdoc service
 * @name mixideaWebApp.EventSearchService
 * @description
 * # EventSearchService
 * Factory in the mixideaWebApp.
 */
angular.module('mixideaWebApp')
  .factory('EventSearchService',["$firebaseArray","$timeout", function ($firebaseArray,$timeout) {

    var event_search = {
      event_list: []
    }
    var all_event_list = [];

    var root_ref = new Firebase("https://mixidea.firebaseio.com/");
    var event_ref = root_ref.child("event_related/event");


    var load_data = function(){
      var search_start_timing = new Date();
      var search_start_timing_value = search_start_timing.getTime();

      var query = event_ref.orderByChild("date_time").startAt(search_start_timing_value);
      all_event_list = $firebaseArray(query);
      all_event_list.$loaded().then(function(){

        event_search.event_list.length=0;
        for(var i=0; i< all_event_list.length; i++){
          event_search.event_list.push(all_event_list[i]);
        }
      })
    }


    event_search.reflesh_data = function(){

    }

    event_search.filter_by_weekday = function(day_array){

    }

    event_search.filter_by_timerange = function(time_from, time_to){

    }

    load_data();

    return event_search;

  }]);
