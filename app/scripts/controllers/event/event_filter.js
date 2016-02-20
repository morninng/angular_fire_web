'use strict';

angular.module('mixideaWebApp')
  .controller('EventFilterCtrl',['$scope', function ($scope) {

  	console.log("event filter called");
  	$scope.name ="event filter yuta";


    $scope.date_range_show = false;
    $scope.date_from = new Date();
    $scope.date_to = new Date();
    $scope.date_to.setMonth( $scope.date_to.getMonth() + 13 );
    $scope.format = 'yyyy/MM/dd';


    $scope.time_from = new Date();
    $scope.time_from.setHours(0);
    $scope.time_from.setMinutes(0);
    $scope.time_to = new Date();
    $scope.time_to.setHours(23); 
    $scope.time_to.setMinutes(59); 

    $scope.date_range_in = function(){
      if(!$scope.date_range_show ){
        $scope.date_range_show = true;
      }
    }

    $scope.data_range_out = function(){
      if($scope.date_range_show ){
        $scope.date_range_show = false;
      }
    }

    $scope.time_range_in = function(){
      if(!$scope.time_range_show ){
        $scope.time_range_show = true;
      }
    }
    $scope.time_range_out = function(){
      if($scope.time_range_show ){
        $scope.time_range_show = false;
      }
    }

    $scope.week_range_in = function(){
      if(!$scope.week_range_show ){
        $scope.week_range_show = true;
      }
    }
    $scope.week_range_out = function(){
      if($scope.week_range_show ){
        $scope.week_range_show = false;
      }
    }

    $scope.week_change = function(){
      console.log("aaa");
      var selected_days = $scope.weeks.filter(function(value){return value.checked});
       
      if(selected_days.length !=7){
        $scope.week_filtered = true;
        $scope.active_days.length=0;
        for(var i=0; i< selected_days.length; i++){
          $scope.active_days.push(selected_days[i].short_name);
        }
      }

    }

  }]);
