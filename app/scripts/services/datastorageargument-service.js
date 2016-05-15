'use strict';

/**
 * @ngdoc service
 * @name mixideaWebApp.DataStorageArgumentService
 * @description
 * # DataStorageArgumentService
 * Factory in the mixideaWebApp.
 */
angular.module('mixideaWebApp')
  .factory('DataStorageArgumentService',['MixideaSetting','$timeout',  function (MixideaSetting, $timeout) {
    // Service logic
    // ...

    var argument_data = new Object();
    argument_data.all_data = new Object();
    var root_ref = new Firebase(MixideaSetting.firebase_url);

    argument_data.add_by_oneargument = function(event_id, argument_id){

      var concat_id = event_id + "_" + argument_id;
      if(argument_data.all_data[concat_id]){
        return;
      }

      var argument_ref = root_ref.child("event_related/Article_Context/" + event_id + "/context/" + argument_id);
      argument_ref.on("value", function(snapshot) {
        var argument_obj = snapshot.val();

        if(argument_obj.title){
          argument_data.all_data[concat_id] = argument_obj.title.slice(0,30);
        }else if(argument_obj.context){
          argument_data.all_data[concat_id] = argument_obj.context.slice(0,30);
        }else{
          argument_data.all_data[concat_id] = " ";
        }
        $timeout(function() {});
      });
    };

    return argument_data;

  }]);
