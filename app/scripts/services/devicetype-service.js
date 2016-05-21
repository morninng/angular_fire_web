'use strict';

/**
 * @ngdoc service
 * @name mixideaWebApp.DeviceTypeService
 * @description
 * # DeviceTypeService
 * Factory in the mixideaWebApp.
 */
angular.module('mixideaWebApp')
  .factory('DeviceTypeService', function () {

    var device_type = new Object();
    var type = null;

    device_type.get_type = function(){
      if(type){
        return type;
      }


      var _ua = (function(u){
        return {
          Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1) 
            || u.indexOf("ipad") != -1
            || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
            || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
            || u.indexOf("kindle") != -1
            || u.indexOf("silk") != -1
            || u.indexOf("playbook") != -1,
          Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
            || u.indexOf("iphone") != -1
            || u.indexOf("ipod") != -1
            || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
            || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
            || u.indexOf("blackberry") != -1
        }
      })(window.navigator.userAgent.toLowerCase());

      if(_ua.Mobile){
        type = "Mobile";
      }else if(_ua.Tablet){
        type="Tablet"
      }else{
        type="PC";
      }

      return type;

    }



    return device_type;
  });
