'use strict';

/**
 * @ngdoc directive
 * @name mixideaWebApp.directive:commentDirective
 * @description
 * # commentDirective
 */
angular.module('mixideaWebApp')
  .directive('commentDirective',['$firebaseArray','DataStorageUserService','UserAuthService','MixideaSetting','$timeout','$uibModal','$http', function ($firebaseArray, DataStorageUserService, UserAuthService, MixideaSetting, $timeout, $uibModal, $http) {
    return {
      templateUrl: 'views/directive/comment_directive.html',
      restrict: 'E',
      replace: true,
      scope: {
      	comment_obj: '=commentObj'
      },
      link: function postLink(scope, element, attrs ) {
      //  element.text('this is the commentDirective directive');


		//console.log("comment obj");
		//console.log(scope.comment_obj);
      	var article_id = scope.comment_obj.article_id;
      	var type = scope.comment_obj.type;


/*
	    scope.comment_obj["article_id"] = article_id;
	    scope.comment_obj["type"] = "argument_each";
*/
	    var post_message_format = {};


	    var root_ref = new Firebase(MixideaSetting.firebase_url);

	    switch(type){
	    	case "argument_all":
			    var comments_ref = root_ref.child("event_related/comment_web/" + article_id + "/argument_all/context");
	    	break;
	    	case "argument_each":
      			var argument_id = scope.comment_obj.argument_id;
			    var comments_ref = root_ref.child("event_related/comment_web/" + article_id + "/argument_each/" + argument_id + "/context");
	    	break;
	    	case "audio_all":
			    var comments_ref = root_ref.child("event_related/comment_web/" + article_id + "/audio_all/context");
	    	break;
	    	case "audio_each":
				var role = scope.comment_obj.role;
				var comments_ref = root_ref.child("event_related/comment_web/" + article_id + "/audio_each/" + role + "/context");
	    	break;
	    	default :
	    		return;
	    	break;
	    }

	    scope.userdata_storage = DataStorageUserService;
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
	    var commentor_all_ref = null;

	    scope.save_comment = function(){
	      if(!scope.user.own_uid){
	        return;
	      }
		  switch(type){
			case "argument_all":
			    var own_commentor_ref = root_ref.child("event_related/comment_web/" + article_id + "/argument_all/commentor/" + scope.user.own_uid);
			    commentor_all_ref = root_ref.child("event_related/comment_web/" + article_id + "/argument_all/commentor/");
			    var comments_each_num_ref = root_ref.child("event_related/comment_web/" + article_id + "/argument_all/num");
			    post_message_format = {type: "argument_all", event_id: article_id};

			break;
			case "argument_each":
			    var own_commentor_ref = root_ref.child("event_related/comment_web/" + article_id + "/argument_each/" + argument_id + "/commentor/"  + scope.user.own_uid);
			    commentor_all_ref = root_ref.child("event_related/comment_web/" + article_id + "/argument_each/" + argument_id + "/commentor/");
			    var comments_each_num_ref = root_ref.child("event_related/comment_web/" + article_id + "/argument_each/" + argument_id + "/num");
			    post_message_format = {type: "argument_each", event_id: article_id, argument_id: argument_id};

			break;
			case "audio_all":
			    var own_commentor_ref = root_ref.child("event_related/comment_web/" + article_id + "/audio_all/commentor/" + scope.user.own_uid);
			    commentor_all_ref = root_ref.child("event_related/comment_web/" + article_id + "/audio_all/commentor/");
			    var comments_each_num_ref = root_ref.child("event_related/comment_web/" + article_id + "/audio_all/num");
			    post_message_format = {type: "audio_all", event_id: article_id};

			break;
			case "audio_each":
				var own_commentor_ref = root_ref.child("event_related/comment_web/" + article_id + "/audio_each/" + role + "/commentor/"  + scope.user.own_uid);
				commentor_all_ref = root_ref.child("event_related/comment_web/" + article_id + "/audio_each/" + role + "/commentor/");
				var comments_each_num_ref = root_ref.child("event_related/comment_web/" + article_id + "/audio_each/" + role + "/num");
			    post_message_format = {type: "audio_each", event_id: article_id, role: role};

			break;
		  }

	      var comment_object = {
	        context: scope.new_comment.context,
	        user: scope.user.own_uid,

	      }
	      scope.comments_array.$add(comment_object);

	      //comments_num_ref ++

		  var comments_all_num_ref = root_ref.child("event_related/comment_web/" + article_id + "/number_all/");
	      comments_all_num_ref.transaction(function(current_value){
	        return (current_value || 0) +1;
	      });
	      comments_each_num_ref.transaction(function(current_value){
	        return (current_value || 0) +1;
	      });

	      // add user to commentor
	      var all_commentor_list_own_ref = root_ref.child("event_related/comment_web/" + article_id + "/commentor/" + scope.user.own_uid);
	      all_commentor_list_own_ref.set(true);
	      own_commentor_ref.set(true);


	      notify_to_API_Gateway();

	      //reflesh data
	      scope.new_comment.context = null;
	      scope.writing_comment = false;
	      first_focus = false;
	      scope.textarea_class = "textarea_default";
	      $timeout(function(){});


	    }

	    //send comment info to API gateway
	    function notify_to_API_Gateway(){

	      var auth_jwt = scope.user.create_jwt();
	      var auth_jwt_str = JSON.stringify(auth_jwt);
	      var post_message = post_message_format;
	      post_message["comment"] = scope.new_comment.context;
	      post_message["author_list"] = scope.comment_obj.author_list;


	      commentor_all_ref.once("value", function(snapshot){
				var commentor_obj = snapshot.val();
				var commentor_list = new Array();
				for(var key in commentor_obj){
					commentor_list.push(key);
				}
				post_message["commentor_list"] = commentor_list;

				$http({
					url: 'https://jqiokf5mp9.execute-api.us-east-1.amazonaws.com/1/comment',
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': auth_jwt_str
					},
					data: post_message
				}).then(function successCallback(response){
					console.log("success to put comment on lambda")
					console.log(response);
				}, function errorCallback(response){
					console.log("fail to put comment on lambda")
					console.log(response);
				});

	      });
	    }
      }
    };
  }]);
