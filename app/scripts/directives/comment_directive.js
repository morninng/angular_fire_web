'use strict';

/**
 * @ngdoc directive
 * @name mixideaWebApp.directive:commentDirective
 * @description
 * # commentDirective
 */
angular.module('mixideaWebApp')
  .directive('commentDirective',['$firebaseArray','UserDataStorageService','UserAuthService','MixideaSetting','$timeout','$uibModal', function ($firebaseArray, UserDataStorageService, UserAuthService, MixideaSetting, $timeout, $uibModal) {
    return {
      templateUrl: 'views/directive/comment_directive.html',
      restrict: 'E',
      replace: true,
      scope: {
      	comment_obj: '=commentObj'
      },
      link: function postLink(scope, element, attrs) {
      //  element.text('this is the commentDirective directive');


		console.log("comment obj");
		console.log(scope.comment_obj);
      	var article_id = scope.comment_obj.article_id;
      	var type = scope.comment_obj.type;


	    scope.comment_obj["article_id"] = article_id;
	    scope.comment_obj["type"] = "argument_each";


	    var root_ref = new Firebase(MixideaSetting.firebase_url);

	    switch(type){
	    	case "argument_all":
			    var comments_ref = root_ref.child("event_related/comment_web/" + article_id + "/argument_all/context");
			    var comments_num_ref = root_ref.child("event_related/comment_web/" + article_id + "/argument_all/num");
	    	break;
	    	case "argument_each":
      			var argument_id = scope.comment_obj.argument_id;
			    var comments_ref = root_ref.child("event_related/comment_web/" + article_id + "/argument_each/" + argument_id + "/context");
			    var comments_num_ref = root_ref.child("event_related/comment_web/" + article_id + "/argument_each/" + argument_id + "/num");
	    	break;
	    	case "audio_all":
			    var comments_ref = root_ref.child("event_related/comment_web/" + article_id + "/audio_all/context");
			    var comments_num_ref = root_ref.child("event_related/comment_web/" + article_id + "/audio_all/num");
	    	break;
	    	case "audio_each":
				var role = scope.comment_obj.role;
				var comments_ref = root_ref.child("event_related/comment_web/" + article_id + "/audio_each/" + role + "/context");
				var comments_num_ref = root_ref.child("event_related/comment_web/" + article_id + "/audio_each/" + role + "/num");

	    	break;
	    	default :
	    		return;
	    	break;
	    }

	    scope.userdata_storage = UserDataStorageService;
	    scope.user = UserAuthService;
	    scope.textarea_class = "textarea_default";

	    var first_focus = false;
	    scope.textarea_focus = function(){
	      if(first_focus){
	        return;
	      }
	      first_focus = true;
	      scope.writing_comment = false;


	      if(scope.user.loggedIn){
	        scope.textarea_class = "textarea_focus";
	        scope.writing_comment = true;
	      }else{
	        alert("you need to login to put a comment");
	        
	        var modalInstance = $uibModal.open({
	          templateUrl: 'views/login_form_simple.html',
	          controller: 'LoginFormSimpleCtrl',
	          backdrop:"static",
	          size:'sm'
	        })
	      }
	    }

	    

	    scope.comments_array = $firebaseArray(comments_ref);
	    scope.new_comment = new Object();
	    scope.new_comment.context = null;

	    scope.save_comment = function(){
	      if(!scope.user.own_uid){
	        return;
	      }
	      var comment_obj = {
	        context: scope.new_comment.context,
	        user: scope.user.own_uid
	      }
	      scope.comments_array.$add(comment_obj);

	      //comments_num_ref ++
	      comments_num_ref.transaction(function(current_value){
	        return (current_value || 0) +1;
	      });

	      // add user to commentor
	      var commentor_list_own_ref = root_ref.child("event_related/comment_web/" + article_id + "/commentor/" + scope.user.own_uid);
	      commentor_list_own_ref.set(true);

	      //reflesh data
	      scope.new_comment.context = null;
	      scope.writing_comment = false;
	      first_focus = false;
	      scope.textarea_class = "textarea_default";
	      $timeout(function(){});

	    }

      }
    };
  }]);
