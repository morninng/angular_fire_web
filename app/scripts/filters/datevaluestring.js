'use strict';

/**
 * @ngdoc filter
 * @name mixideaWebApp.filter:DateValueString
 * @function
 * @description
 * # DateValueString
 * Filter in the mixideaWebApp.
 */
angular.module('mixideaWebApp')
  .filter('DateValueString', function () {
    return function (input) {

	    var date = new Date(input);
	    var date_string = date.toString()


      return date_string;
    };
  });
