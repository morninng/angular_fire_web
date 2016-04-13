'use strict';

/**
 * @ngdoc function
 * @name mixideaWebApp.controller:MypageCtrl
 * @description
 * # MypageCtrl
 * Controller of the mixideaWebApp
 */
angular.module('mixideaWebApp')
  .controller('MypageCtrl',['$scope','UserAuthService','DataStorageEventService', function ($scope, UserAuthService, DataStorageEventService) {




    var user = UserAuthService
    if(!user.loggedIn){
      //popup after three seconds.
    }




  }]);
