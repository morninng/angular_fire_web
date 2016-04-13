'use strict';

/**
 * @ngdoc filter
 * @name mixideaWebApp.filter:DateMonthDate
 * @function
 * @description
 * # DateMonthDate
 * Filter in the mixideaWebApp.
 */
angular.module('mixideaWebApp')
  .filter('DateMonthDate', function () {
    return function (input) {


	    var date_object = new Date(input);
	    var year = date_object.getFullYear();
	    var month = date_object.getMonth();
	    var month_str = null;
	    switch(month){
			case 0:
				month_str = "Jan";
			break;
			case 1:
				month_str = "Feb";
			break;
			case 2:
				month_str = "Mar";
			break;
			case 3:
				month_str = "April";
			break;
			case 4:
				month_str = "May";
			break;
			case 5:
				month_str = "June";
			break;
			case 6:
				month_str = "July";
			break;
			case 7:
				month_str = "Aug";
			break;
			case 8:
				month_str = "Sep";
			break;
			case 9:
				month_str = "Oct";
			break;
			case 10:
				month_str = "Nov";
			break;
			case 11:
				month_str = "Dec";
			break;
	    }
	    var day = date_object.getDate();
	    var date_string = year

	    date_string = String(year) + '-' + month_str + '-' + String(day);

      return date_string;
    };





  });
