
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
    'ui.router',
    'ui.bootstrap'
  ]);

angular.module('mixideaWebApp')
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('/eventsearch_layout_three_column', {
		url:"/event",
		views:{
			"RootView":{
				templateUrl: 'views/event/event_layout_three.html'
			}
		}
	})
	.state('/eventsearch_layout_three_column.list', {
		url:'/list',
		views:{
			"event_left":{
			templateUrl: 'views/event/event_filter.html',
			controller: 'EventFilterCtrl'
			},
			"event_main":{
			templateUrl: 'views/event/event_list.html',
			controller: 'EventListCtrl'
			},
			"event_right":{
			templateUrl: 'views/right_column_ad.html'
			}
		}
	})
	.state('/eventsearch_layout_two_column', {
		url:"/event",
		views:{
			"RootView":{
				templateUrl: 'views/event/event_layout_two.html'
			}
		}
	})
	.state('/eventsearch_layout_two_column.calendar', {
		url:'/calendar',
		views:{
			"event_left":{
			templateUrl: 'views/event/event_filter.html',
			controller: 'EventFilterCtrl'
			},
			"event_main":{
			templateUrl: 'views/event/event_calendar.html',
			controller: 'EventCalendarCtrl'
			}
		}
	})
	.state('/eventcontext_layout_two_column', {
		url:'/eventcontext',
		views:{
			"RootView":{
				templateUrl: 'views/event/eventcontext_layout.html'
			}
		}
	})
	.state('/eventcontext_layout_two_column.context', {
		url:'/:id',
		views:{
			"eventcontext_main":{
			templateUrl: 'views/event/event_context.html',
			controller: 'EventContextCtrl'
			},
			"eventcontext_right":{
			templateUrl: 'views/right_column_ad.html'
			}
		}
	});

}]);