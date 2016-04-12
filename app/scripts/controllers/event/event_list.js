'use strict';

angular.module('mixideaWebApp')
  .controller('EventListCtrl',['$scope','DataStorageEventService', function ($scope, DataStorageEventService) {

  	$scope.event_data =  DataStorageEventService;

    var search_start_timing = new Date();
    var search_start_timing_value = search_start_timing.getTime();
    DataStorageEventService.load_all_futuredata(search_start_timing_value);

  }]);

