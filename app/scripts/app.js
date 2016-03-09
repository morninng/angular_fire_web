
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
    'ui.bootstrap',
    'firebase'
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
		url:'/context/:id',
		views:{
			"eventcontext_main":{
			templateUrl: 'views/event/event_context.html',
			controller: 'EventContextCtrl'
			},
			"eventcontext_right":{
			templateUrl: 'views/right_column_ad.html'
			}
		}
	})
	.state('/article', {
		url:'/article/{id}',
		views:{
			"RootView":{
				templateUrl: 'views/article/article_layout.html',
				controller: 'ArticleLayoutCtrl'
			}
		}
	})
	.state('/article.audio_transcript', {
		url:'/audio_transcript',
		views:{
			"article_main":{
				templateUrl: 'views/article/audio_transcript.html',
				controller: 'ArticleAudiotranscriptCtrl'
			},
			"article_right":{
				templateUrl: 'views/right_column_ad.html'
			}
		}
	})
	.state('/article.written_description', {
		url:'/written_description',
		views:{
			"article_main":{
				templateUrl: 'views/article/written_description.html'
			},
			"article_right":{
				templateUrl: 'views/right_column_ad.html'
			}
		}
	})


	;

}]);