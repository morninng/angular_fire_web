

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
				templateUrl: 'views/event/event_layout.html',
				controller: 'EventFilterCtrl'
			}
		}
	})
	.state('/event_layout.list', {
		url:'/list',
		views:{
			"event_main":{
			templateUrl: 'views/event/event_list.html',
			controller: 'EventListCtrl'
			},
			"event_right":{
			templateUrl: 'views/right_column_ad.html'
			}
		}
	})
	.state('/event_layout.calendar', {
		url:'/calendar',
		views:{
			"event_main":{
			templateUrl: 'views/event/event_calendar.html',
			controller: 'EventCalendarCtrl'
			},
			"event_right":{
			templateUrl: 'views/right_column_ad.html'
			}
		}
	});



}]);
'use strict';

/**
 * @ngdoc function
 * @name mixideaWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mixideaWebApp
 */
angular.module('mixideaWebApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

angular.module('mixideaWebApp')
  .controller('EventCalendarCtrl',['$scope', function ($scope) {

  	console.log("event calendar");
  	$scope.name = "calendar calendar"


  }]);

'use strict';

angular.module('mixideaWebApp')
  .controller('EventFilterCtrl',['$scope', function ($scope) {

  	console.log("event filter called");
  	$scope.name ="event filter yuta";

  }]);

'use strict';

angular.module('mixideaWebApp')
  .controller('EventListCtrl',['$scope', function ($scope) {


  	console.log("event list ");
  	$scope.name = "list list";
  	
  }]);
