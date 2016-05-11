'use strict';

/**
 * @ngdoc service
 * @name mixideaWebApp.DataStorageArticleService
 * @description
 * # DataStorageArticleService
 * Factory in the mixideaWebApp.
 */
angular.module('mixideaWebApp')
  .factory('DataStorageArticleService',['MixideaSetting','$timeout', function (MixideaSetting, $timeout) {
    // Service logic


    var article_data = {
      all_data: {},
      counter:0
    }

    var root_ref = new Firebase(MixideaSetting.firebase_url);
    var article_ref = root_ref.child("event_related/article");



    var count_article = 0;

    article_data.add_by_array = function(article_id_array){
      count_article = 0;

      for(var i=0; i< article_id_array.length; i++){
        one_article_add(article_id_array[i], article_id_array.length)
      }
    }


    article_data.add_by_onearticle_id = function(article_id){
      count_article = 0;
      one_article_add(article_id, 1);
    };


    function one_article_add(article_id, all_article_num){
      
      if( article_data.all_data[article_id] ){
        count_article++;
        if(count_article == all_article_num){
          article_data.counter++;
          $timeout(function() {});
        }
        return;
      }

      var article_obj_ref = root_ref.child("event_related/game/" + article_id);
      article_obj_ref.on("value", function(snapshot) {
        count_article++;
        var article_obj  = snapshot.val();
        var article_key = snapshot.key();
        article_data.all_data[article_key] = article_obj;
        if(count_article == all_article_num){
          article_data.counter++;
          $timeout(function() {});
        }
      });

    }

    return article_data;




  }]);
