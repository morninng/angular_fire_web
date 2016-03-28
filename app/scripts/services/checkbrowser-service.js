'use strict';

/**
 * @ngdoc service
 * @name mixideaWebApp.CheckBrowserService
 * @description
 * # CheckBrowserService
 * Factory in the mixideaWebApp.
 */
angular.module('mixideaWebApp')
  .factory('CheckBrowserService', function () {


    var message_obj = new Object();
    message_obj.alert = null;
    message_obj.type = null;
    message_obj.is_ok = false;

     if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) 
    {
        message_obj.type = 'Opera';
        message_obj.alert = "you may use <span class='browser_NG'>Opera</span> but you need to use "
          + "<span class='browser_OK'>Chrome</span> to join Mixidea Debate";
    }
    else if(navigator.userAgent.indexOf("Chrome") != -1 )
    {
        message_obj.type = 'Chrome';
        message_obj.alert = "";
        message_obj.is_ok =true;
    }
    else if(navigator.userAgent.indexOf("Safari") != -1)
    {
        message_obj.type = 'Safari';
        message_obj.alert = "you may use <span class='browser_NG'>Safari</span> but you need to use "
          + "<span class='browser_OK'>Chrome</span> to join Mixidea Debate";
    }
    else if(navigator.userAgent.indexOf("Firefox") != -1 ) 
    {
        message_obj.type = 'Firefox';
        message_obj.alert = "you may use <span class='browser_NG'>Firefox</span> but you need to use "
          + "<span class='browser_OK'>Chrome</span> to join Mixidea Debate";
    }
    else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
    {
        message_obj.type = 'Internet Explorer';
        message_obj.alert = "you may use <span class='browser_NG'>Internet Explorer</span> but you need to use "
          + "<span class='browser_OK'>Chrome</span> to join Mixidea Debate";
    }  
    else 
    {
        message_obj.type = 'unknown';
        message_obj.alert = "you need to use <span class='browser_OK'>Chrome</span> to join Mixidea Debate";
    }


    return message_obj;

  });
