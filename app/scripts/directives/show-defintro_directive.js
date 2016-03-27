'use strict';

/**
 * @ngdoc directive
 * @name mixideaWebApp.directive:showDefintroDirective
 * @description
 * # showDefintroDirective
 */

angular.module('mixideaWebApp')
  .directive('showDefintroDirective',['MixideaSetting','UtilService','$timeout', function (MixideaSetting, UtilService, $timeout) {
    return {
      templateUrl: 'views/directive/showDefintfo_directive.html',
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
        console.log(arg_id);
        scope.arg_id = arg_id;

        var root_ref = new Firebase(MixideaSetting.firebase_url);
        var defintro_content_path = "event_related/Article_Context/" + event_id + "/context/" 
        				+ arg_id + "/" + "content";
        var defintro_content_ref = root_ref.child(defintro_content_path);

        defintro_content_ref.once("value", function(snapshot){
	        scope.defintro_content = snapshot.val();
	        scope.defintro_div = UtilService.add_linebreak_html(scope.defintro_content);
         	$timeout(function(){});
        });

      }
    };
  }]);
