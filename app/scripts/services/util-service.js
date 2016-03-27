'use strict';

/**
 * @ngdoc service
 * @name mixideaWebApp.UtilService
 * @description
 * # UtilService
 * Service in the mixideaWebApp.
 */
angular.module('mixideaWebApp')
  .service('UtilService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function


    this.add_linebreak_html = function(context){
      if(!context){
        return null;
      }
      var converted_context = context.split("<").join("&lt;");
      converted_context = converted_context.split(">").join("&gt;");
      converted_context = converted_context.split("\n").join("<br>");

      return converted_context;
    }

    
  });
