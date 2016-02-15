

'use strict';

/**
 * @ngdoc overview
 * @name mixideaWebApp
 * @description
 * # mixideaWebApp
 *
 * Main module of the application.
 */
angular
  .module('mixideaWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ]);



angular.module('mixideaWebApp')
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {



	$stateProvider
	.state('/event_layout', {

		url:"/event",
		views:{
			"RootView":{
				templateUrl: 'views/event_layout.html',
				controller: 'EventFilterCtrl'
			}
		}
	})
	.state('/event_layout.list', {
		url:'/list',
		views:{
			"event_main":{
			templateUrl: 'views/event_list.html',
			controller: 'EventListCtrl'
			},
			"event_right":{
			templateUrl: 'views/right_column_ad.html'
			}
		}
	});

}]);