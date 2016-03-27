'use strict';

/**
 * @ngdoc directive
 * @name mixideaWebApp.directive:showArgumentDirective
 * @description
 * # showArgumentDirective
 */
angular.module('mixideaWebApp')
  .directive('showArgumentDirective',['MixideaSetting','$timeout','UtilService', function (MixideaSetting, $timeout, UtilService) {
    return {
      templateUrl: 'views/directive/showArgument_directive.html',
      restrict: 'E',
      replace: true,
      scope: {
      	argument_id_obj: '=argId'
      },
      link: function postLink(scope, element, attrs) {

        var arg_id = scope.argument_id_obj.arg_id;
        var event_id = scope.argument_id_obj.event_id;
        var deb_style = scope.argument_id_obj.deb_style;
        var team = scope.argument_id_obj.team;



        var root_ref = new Firebase(MixideaSetting.firebase_url);
        var argument_content_path = "event_related/Article_Context/" + event_id + "/context/" 
        				+ arg_id;
        var argument_content_ref = root_ref.child(argument_content_path);

        var title_ref = argument_content_ref.child("title");
        title_ref.once("value", function(snapshot){
          scope.title = snapshot.val();
          $timeout(function(){});
        }); 

        var content_ref = argument_content_ref.child("content");
        content_ref.once("value", function(snapshot){
          scope.content = snapshot.val();
          scope.content_div = UtilService.add_linebreak_html(scope.content);
          $timeout(function(){});
        }); 

        var refute_ref = argument_content_ref.child("refute");
        refute_ref.once("value", function(snapshot){
          
          scope.refute = snapshot.val();
          scope.refute_div = UtilService.add_linebreak_html(scope.refute);
          $timeout(function(){});
        }); 

      }
    };
  }]);
