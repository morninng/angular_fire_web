'use strict';

/**
 * @ngdoc service
 * @name mixideaWebApp.TitleFlash
 * @description
 * # TitleFlash
 * Service in the mixideaWebApp.
 */
angular.module('mixideaWebApp')
  .service('TitleFlash',['$window','$document','$interval', function ($window, $document, $interval) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var isBlurred = false;
    var title_timer = null;

	$window.onblur=function() {
		console.log("blured");
		isBlurred = true;
	}

	$window.onfocus=function() {
		isBlurred = false;
		console.log("focused");
		$interval.cancel(title_timer);
		document.title="Mixidea";
	}

    this.trigger_flash = function(){

    	if(isBlurred){
    		console.log("set interval is called");
			title_timer = $interval(function() {
				document.title = document.title == "message receive" ? "Mixidea" : "message receive";
			}, 600);
		}
		
    }


  }]);
