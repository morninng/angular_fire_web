'use strict';

angular.module('mixideaWebApp')
  .controller('EventListCtrl',['$scope',"$firebaseArray" function ($scope, $firebaseArray) {


    var root_ref = new Firebase("https://mixidea.firebaseio.com/");
    var event_ref = root_ref.child("event_related/event");

    var event_array = $firebaseArray(event_ref);
  	




  }]);
