'use strict';

/**
 * @ngdoc function
 * @name mixideaWebApp.controller:EventLayoutCtrl
 * @description
 * # EventLayoutCtrl
 * Controller of the mixideaWebApp
 */
angular.module('mixideaWebApp')
  .controller('EventLayoutCtrl',["$scope","$uibModal", function ($scope, $uibModal) {

  	console.log("event layout");

  	$scope.open_create_event = function(){
  		console.log("create event is clicked");
  		var modalInstance = $uibModal.open({
			templateUrl: 'views/event/create_event.html',
			controller: 'CreateEventCtrl',
        	backdrop:"static",
        	size:'lg'
		});
  	}



  }]);
