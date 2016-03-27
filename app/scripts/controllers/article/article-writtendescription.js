'use strict';

/**
 * @ngdoc function
 * @name mixideaWebApp.controller:ArticleWrittendescriptionCtrl
 * @description
 * # ArticleWrittendescriptionCtrl
 * Controller of the mixideaWebApp
 */
angular.module('mixideaWebApp')
  .controller('ArticleWrittendescriptionCtrl',['$scope','$timeout','MixideaSetting',"$stateParams","UserDataStorageService",  function ($scope, $timeout, MixideaSetting, $stateParams, UserDataStorageService) {

    $scope.userdata_storage = UserDataStorageService;

    $scope.argument_id_data = null;
    $scope.NA_Gov_def_intro = null;
    $scope.NA_Gov_arguments = [];
    $scope.NA_Opp_arguments = [];
    $scope.NA_Gov_debaters = [];
    $scope.NA_Opp_debaters = [];
    $scope.Asian_Prop_def_intro = null;
    $scope.Asian_Prop_arguments = [];
    $scope.Asian_Opp_arguments = [];
    $scope.Asian_Prop_debaters = [];
    $scope.Asian_Opp_debaters = [];
    $scope.BP_OG_def_intro = null;
    $scope.BP_OG_arguments = [];
    $scope.BP_OO_arguments = [];
    $scope.BP_CG_arguments = [];
    $scope.BP_CO_arguments = [];
    $scope.BP_OG_debaters = [];
    $scope.BP_OO_debaters = [];
    $scope.BP_CG_debaters = [];
    $scope.BP_CO_debaters = [];


    console.log('ArticleWrittendescriptionCtrl');
    var article_id = $stateParams.id;
    var event_id_val = article_id;
    var root_ref = new Firebase(MixideaSetting.firebase_url);
    var game_ref = root_ref.child("event_related/game/" + article_id);
    var written_description_ref = root_ref.child("event_related/Article_Context/" + article_id);
    var game_role_ref = root_ref.child("event_related/participants/" + article_id + "/game_role");
    $scope.deb_style = null;
    $scope.game_motion = null;



    game_ref.once("value").then(function(snapshot_game){

      var obj = snapshot_game.val();
      $scope.game_motion = obj.motion;
      $scope.deb_style = obj.deb_style;
      var written_description_identifier_ref = written_description_ref.child("identifier/" + $scope.deb_style);

    	return written_description_identifier_ref.once("value");
    }).then(function(snapshot_written_description){

      var argument_id_data = snapshot_written_description.val();

      switch($scope.deb_style){
      case "NA":

      break;
      case "Asian":

      break;
      case "BP":
      
        var def_intro_id = Object.keys(argument_id_data.OG.def_intro)[0];
        if(def_intro_id){
          var obj = {arg_id:def_intro_id,event_id:event_id_val,team:"OG",deb_style:"BP"};
          $scope.BP_OG_def_intro = obj;
        }

        $scope.BP_OG_arguments.length = 0;
        var arguments_array_bp_og= Object.keys(argument_id_data.OG.arguments);
        for(var i=0; i<arguments_array_bp_og.length; i++){
          var obj = {arg_id:arguments_array_bp_og[i],event_id:event_id_val,team:"OG",deb_style:"BP"};
          $scope.BP_OG_arguments.push(obj);
        }

        $scope.BP_OO_arguments.length = 0;
        var arguments_array_bp_oo= Object.keys(argument_id_data.OO.arguments);
        for(var i=0; i<arguments_array_bp_oo.length; i++){
          var obj = {arg_id:arguments_array_bp_oo[i],event_id:event_id_val,team:"OO",deb_style:"BP"};
          $scope.BP_OO_arguments.push(obj);
        }

        $scope.BP_CG_arguments.length = 0;
        var arguments_array_bp_cg= Object.keys(argument_id_data.CG.arguments);
        for(var i=0; i<arguments_array_bp_cg.length; i++){
          var obj = {arg_id:arguments_array_bp_cg[i],event_id:event_id_val,team:"CG",deb_style:"BP"};
          $scope.BP_CG_arguments.push(obj);
        }

        $scope.BP_CO_arguments.length = 0;
        var arguments_array_bp_co= Object.keys(argument_id_data.CO.arguments);
        for(var i=0; i<arguments_array_bp_co.length; i++){
          var obj = {arg_id:arguments_array_bp_co[i],event_id:event_id_val,team:"CO",deb_style:"BP"};
          $scope.BP_CO_arguments.push(obj);
        }


      break;
      }

    	$timeout(function(){});

      var game_role_style_ref =  game_role_ref.child($scope.deb_style);
       return game_role_style_ref.once("value");
    }).then(function(snapshot_game_role_obj){

      console.log(game_role_obj);
      var game_role_obj = snapshot_game_role_obj.val();


      switch($scope.deb_style){
      case "NA":

      break;
      case "Asian":

      break;
      case "BP":
        var role_team_array = [
          {name:"PM",team:"BP_OG_debaters"},
          {name:"LO",team:"BP_OO_debaters"},
          {name:"DPM",team:"BP_OG_debaters"},
          {name:"DLO",team:"BP_OO_debaters"},
          {name:"MG",team:"BP_CG_debaters"},
          {name:"MO",team:"BP_CO_debaters"},
          {name:"GW",team:"BP_CG_debaters"},
          {name:"OW",team:"BP_CO_debaters"}
        ];
        for(var i=0; i<role_team_array.length; i++ ){
          if(game_role_obj[role_team_array[i].name]){
            var index = $scope[role_team_array[i].team].indexOf(game_role_obj[role_team_array[i].name])
            if(index == -1){
              $scope[role_team_array[i].team].push(game_role_obj[role_team_array[i].name]);
            }
          }
        }
        console.log($scope.BP_OG_debaters);
        console.log($scope.BP_OO_debaters);
        console.log($scope.BP_CG_debaters);
        console.log($scope.BP_CO_debaters);


      break;
      }


    }, function(error){
    	console.log(error);
    });




  }]);
