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
      	argument_id_obj: '=argId',
        author_list: '=authorList'
      },
      link: function postLink(scope, element, attrs) {

        var arg_id = scope.argument_id_obj.arg_id;
        var event_id = scope.argument_id_obj.event_id;
        var deb_style = scope.argument_id_obj.deb_style;
        var team = scope.argument_id_obj.team;
        scope.title = null;
        scope.content = null;
        scope.content_div = null;
        scope.refute = null;
        scope.refute_div = null;
        scope.show_all = false;
        scope.comment_obj = new Object();

        console.log(scope.author_list);

        scope.comment_obj["article_id"] = event_id;
        scope.comment_obj["argument_id"] = arg_id;
        scope.comment_obj["type"] = "argument_each";
        scope.comment_obj["author_list"] = scope.author_list;
        scope.notification_anchor = "scroll_anchor_" + arg_id


        var root_ref = new Firebase(MixideaSetting.firebase_url);
        var argument_content_path = "event_related/Article_Context/" + event_id + "/context/" 
        				+ arg_id;
        var argument_content_ref = root_ref.child(argument_content_path);


        argument_content_ref.once("value", function(snapshot){
          var argument_content = snapshot.val();
          if(!argument_content){
            scope.show_all = false;
            //$timeout(function(){});
            return;
          }
          scope.title = argument_content.title;
          scope.content = argument_content.content;
          scope.content_div = UtilService.add_linebreak_html(scope.content);
          scope.refute = argument_content.refute;
          scope.refute_div = UtilService.add_linebreak_html(scope.refute);
          if(scope.title || scope.content || scope.refute){
            scope.show_all = true;
            $timeout(function(){});
          }

        });

      }
    };
  }]);
