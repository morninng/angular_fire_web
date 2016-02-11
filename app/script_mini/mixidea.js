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
    'ngTouch'
  ]);

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
