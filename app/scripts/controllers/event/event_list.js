'use strict';

angular.module('mixideaWebApp')
  .controller('EventListCtrl',['$scope','EventSearchService', function ($scope, EventSearchService) {


  	$scope.event_list =  EventSearchService.event_list;
  	




  }]);
