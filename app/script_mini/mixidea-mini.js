"use strict";angular.module("mixideaWebApp",["ngAnimate","ngCookies","ngResource","ngSanitize","ngTouch","ui.router","ui.bootstrap","firebase"]),angular.module("mixideaWebApp").config(["$stateProvider","$urlRouterProvider",function(a,b){a.state("/eventsearch_layout_three_column",{url:"/event",views:{RootView:{templateUrl:"views/event/event_layout_three.html"}}}).state("/eventsearch_layout_three_column.list",{url:"/list",views:{event_left:{templateUrl:"views/event/event_filter.html",controller:"EventFilterCtrl"},event_main:{templateUrl:"views/event/event_list.html",controller:"EventListCtrl"},event_right:{templateUrl:"views/right_column_ad.html"}}}).state("/eventsearch_layout_two_column",{url:"/event",views:{RootView:{templateUrl:"views/event/event_layout_two.html"}}}).state("/eventsearch_layout_two_column.calendar",{url:"/calendar",views:{event_left:{templateUrl:"views/event/event_filter.html",controller:"EventFilterCtrl"},event_main:{templateUrl:"views/event/event_calendar.html",controller:"EventCalendarCtrl"}}}).state("/eventcontext_layout_two_column",{url:"/eventcontext",views:{RootView:{templateUrl:"views/event/eventcontext_layout.html"}}}).state("/eventcontext_layout_two_column.context",{url:"/context/:id",views:{eventcontext_main:{templateUrl:"views/event/event_context.html",controller:"EventContextCtrl"},eventcontext_right:{templateUrl:"views/right_column_ad.html"}}})}]),angular.module("mixideaWebApp").controller("EventContextCtrl",["$scope","$stateParams","$timeout","UserAuthService","MixideaSetting",function(a,b,c,d,e){function f(b){a.total_num=0;var d=!1;a.participant_audience&&(a.participant_audience.length=0);var e=0;if(b)for(var f in b.audience)g(f,a.participant_audience),a.total_num++,e++,f==a.user.own_uid&&(d=!0,r="audience");a.participant_debater&&(a.participant_debater.length=0);var i=0;if(b)for(var f in b.debater)g(f,a.participant_debater),a.total_num++,i++,f==a.user.own_uid&&(d=!0,r="debater");a.participant_aud_or_debater&&(a.participant_aud_or_debater.length=0);var j=0;if(b)for(var f in b.aud_or_debater)g(f,a.participant_aud_or_debater),a.total_num++,j++,f==a.user.own_uid&&(d=!0,r="aud_or_debater");c(function(){a.available_audience=h("audience",e),a.available_debater=h("debater",i),a.available_aud_or_debater=h("aud_or_debater",j),d?m():(a.already_joined=!1,n())})}function g(a,b){var d=p.child("users/user_basic/"+a);d.once("value",function(a){c(function(){var c=a.val(),d=a.key();c.id=d,b.push(c)})})}function h(b,c){var d=a.event_obj.deb_style;if(a.total_num>9)return!1;switch(d){case"NA":switch(b){case"debater":if(6>c)return!0;break;case"audience":if(6>c)return!0;break;case"aud_or_debater":return!0}break;case"Asian":case"BP":switch(b){case"debater":if(8>c)return!0;break;case"audience":if(3>c)return!0;break;case"aud_or_debater":return!0}}return!1}function i(b){var c=p.child("event_related/participants/"+o+"/event_role/"+b+"/"+a.user.own_uid),d=p.child("event_related/participants/"+o+"/full/"+a.user.own_uid);d.set(!0).then(function(a){return c.set(!0)}).then(function(){alert("succeed to join")},function(){alert("error to save data")})}function j(b){var c=(q.child("participant/"+b+"/member/"+a.user.own_uid),p.child("event_related/participants/"+o+"/"+a.user.own_uid),p.child("event_related/participants/"+o+"/event_role/"+b+"/"+a.user.own_uid)),d=p.child("event_related/participants/"+o+"/full/"+a.user.own_uid);c.set(null).then(function(a){return d.set(null)}).then(function(){alert("succeed to cancel")},function(){alert("error to cancel")})}function k(b){if(!a.user.own_uid)return void alert("you need to login to join the game");var c=q.child("participants_num/"+b);c.transaction(function(a){var c=!0,d=a;if(a){if(c=h(b,a),!c)return}else{if(c=h(b,0),!c)return;d=0}return d+=1},function(a,c,d){console.log("transaction complete"),a?alert("transaction failed"+a):c?i(b):alert("other person may take a role and cannot login more")})}function l(a){var b=q.child("participants_num/"+a);b.transaction(function(a){var b=a-1;return b})}function m(){a.show_hangout=!0}function n(){a.show_hangout=!1}console.log("event context controller called");var o=b.id,p=new Firebase(e.firebase_url);a.user=d,a.event_obj=new Object;var q=p.child("event_related/event/"+o);q.once("value",function(b){a.event_obj=b.val()},function(){alert("fail to load event data")}),a.participant_audience=new Array,a.participant_debater=new Array,a.participant_aud_or_debater=new Array,a.available_audience=!1,a.available_debater=!1,a.available_aud_or_debater=!1,a.already_joined=!0;var r=null,p=new Firebase(e.firebase_url),s=p.child("event_related/participants/"+o+"/event_role");s.on("value",function(b){a.available_audience=!1,a.available_debater=!1,a.available_aud_or_debater=!1,a.already_joined=!0,a.total_num=0;var c=b.val();f(c)},function(){alert("fail to load participant data")}),a.join=function(a){k(a)},a.cancel_participante=function(a){l(a),j(a)},a.hangout_link_str=null,a.show_hangout=!1;var p=new Firebase(e.firebase_url),t=p.child("event_related/game_hangout_obj_list/"+o+"/main");t.once("value",function(b){var c=b.val(),d="?gid=",f=e.hangout_appid,g="&gd=",h=a.user.own_uid,i=o,j="main";a.hangout_link_str=c+d+f+g+h+"^"+i+"^"+j})}]),angular.module("mixideaWebApp").controller("HeaderUserCtrl",["$scope","UserAuthService","$uibModal",function(a,b,c){a.user=b,a.logout=function(){a.user.logout()},a.show_lgoin_form=function(){console.log("show login form is called");c.open({templateUrl:"views/login_form.html",controller:"LoginFormCtrl",backdrop:"static",size:"sm"})}}]),angular.module("mixideaWebApp").controller("LoginFormCtrl",["$scope","UserAuthService","$uibModalInstance","MixideaSetting",function(a,b,c,d){console.log("login form control is called"),a.fb_login_show=!0,a.fb_login_loading_show=!1,a.lang_type=null,a.user_introduction=null,a.user=b;var e=new Firebase(d.firebase_url);a.login_fb=function(){console.log("facebook login is clicked"),a.fb_login_show=!1,a.fb_login_loading_show=!0,a.user.login()},a.close_modal=function(){c.close()},a.click_introduction_input=function(){var b=a.user_introduction;if(!b)return void alert("input your self introduction");var c=a.user.own_uid,d=e.child("users/user_ext/"+c+"/profile/introduction");d.set(b)},a.click_language_select=function(){var b=a.lang_type;if(!b)return void alert("select one of the english types");var c=a.user.own_uid,d=e.child("users/user_ext/"+c+"/profile/lang_type");d.set(b)},a.$watch("user.regist_complete",function(){if(1==a.user.regist_complete){var b=document.getElementById("myCarousel"),d=angular.element(b),f=a.user.own_uid,g=e.child("users/user_ext/"+f+"/profile/lang_type"),h=e.child("users/user_ext/"+f+"/profile/introduction");g.on("value",function(a){var b=a.val();b?(console.log(b),h.on("value",function(a){var b=a.val();b?c.close():(d.carousel(2),d.carousel("pause"))})):(d.carousel(1),d.carousel("pause"),console.log(b))},function(){console.log(lang_type)})}})}]),angular.module("mixideaWebApp").controller("CreateEventCtrl",["$scope","$uibModalInstance","$firebaseArray","MixideaSetting",function(a,b,c,d){a.event_create_status="input",a.event_date=null,a.event_time=null,a.context=null,a.deb_style=null,a.exp_deb_skill=null,a.exp_lang_skil=null,a.event_time=null,a.date_time=null,a.motion=null,a.prerequisit=null,a.event_id=null,a.hangout_upload_object=null,a.retrieved_hangout_keylist=new Array;var e=new Firebase(d.firebase_url),f=e.child("hangout_url");f.equalTo(null).limitToFirst(5).once("value",function(c){var d=c.val(),e=null,f=new Array,g=0;for(var h in d)0==g?e=d[h].url:f.push(d[h].url),a.retrieved_hangout_keylist.push(h),g++;5!=g&&(alert("error: please inform it to administrator"),b.close()),a.hangout_upload_object={main:e,team_discussion:f}});a.click_cancel=function(){console.log("cancel button is clicked"),b.close()}}]),angular.module("mixideaWebApp").controller("CreateEventInputCtrl",["$scope","MixideaSetting",function(a,b){var c=new Date;a.minDate=c.setDate(c.getDate()-1);var d=new Date(2015,1,1,0,0);a.event_time=d,a.context_maxchar=350,a.context_minchar=20,a.show_time=!1,a.click_create=function(){return console.log("create button is clicked"),console.log(a.$parent.event_create_status),!a.event_date||!a.context||a.context.length>a.context_maxchar||a.context.length<a.context_minchar||!a.show_time?void alert("input data error"):(a.$parent.$parent.date_time=new Date,a.$parent.$parent.date_time.setYear(a.event_date.getFullYear()),a.$parent.$parent.date_time.setMonth(a.event_date.getMonth()),a.$parent.$parent.date_time.setDate(a.event_date.getDate()),a.$parent.$parent.date_time.setHours(a.event_time.getHours()),a.$parent.$parent.date_time.setMinutes(a.event_time.getMinutes()),a.$parent.$parent.event_date=a.event_date,a.$parent.$parent.context=a.context,a.$parent.$parent.deb_style=a.deb_style,a.$parent.$parent.exp_deb_skill=a.exp_deb_skill,a.$parent.$parent.exp_lang_skil=a.exp_lang_skil,a.$parent.$parent.event_time=a.event_time,a.$parent.$parent.motion=a.motion,a.$parent.$parent.prerequisit=a.prerequisit,void(a.$parent.$parent.event_create_status="confirm"))},a.time_changed=function(){a.show_time=!0}}]),angular.module("mixideaWebApp").controller("CreateEventConfirmCtrl",["$scope","UserAuthService","$timeout","MixideaSetting",function(a,b,c,d){function e(b){var e={deb_style:a.$parent.$parent.deb_style,motion:a.$parent.$parent.motion,game_status:"introduction",type:"debate"},f=new Firebase(d.firebase_url),g=f.child("event_related/game/"+b);g.set(e,function(d){d?console.log("error occured"):(console.log("succeed to save"),a.$parent.$parent.event_id=b,c(function(){a.$parent.$parent.event_create_status="saved"}))})}function f(a){for(var b=new Firebase(d.firebase_url),c=[{style:"NA",team:"Gov",type:"def_intro"},{style:"NA",team:"Gov",type:"arguments"},{style:"NA",team:"Gov",type:"arguments"},{style:"NA",team:"Opp",type:"arguments"},{style:"NA",team:"Opp",type:"arguments"},{style:"Asian",team:"Prop",type:"def_intro"},{style:"Asian",team:"Prop",type:"arguments"},{style:"Asian",team:"Prop",type:"arguments"},{style:"Asian",team:"Opp",type:"arguments"},{style:"Asian",team:"Opp",type:"arguments"},{style:"BP",team:"OG",type:"def_intro"},{style:"BP",team:"OG",type:"arguments"},{style:"BP",team:"OG",type:"arguments"},{style:"BP",team:"OO",type:"arguments"},{style:"BP",team:"OO",type:"arguments"},{style:"BP",team:"CG",type:"arguments"},{style:"BP",team:"CG",type:"arguments"},{style:"BP",team:"CO",type:"arguments"},{style:"BP",team:"CO",type:"arguments"}],e=b.child("event_related/Article_Context/"+a+"/identifier/"),f={dummy:!0},g=0;g<c.length;g++){var h=e.child(c[g].style+"/"+c[g].team+"/"+c[g].type);h.push(f)}}function g(b){var c=new Firebase(d.firebase_url),e=c.child("event_related/game_hangout_obj_list/"+b);e.set(a.$parent.$parent.hangout_upload_object,function(a){a?alert("error to save event hangout url"):console.log("succeed to save")});for(var f=0;f<a.retrieved_hangout_keylist.length;f++)h(a.retrieved_hangout_keylist[f])}function h(a){var b=new Firebase(d.firebase_url),c=b.child("hangout_url/"+a+"/status");c.set(!1)}a.click_save=function(){var c=a.$parent.$parent.date_time.getTime(),h=60*a.$parent.$parent.date_time.getUTCHours()+a.$parent.$parent.date_time.getUTCMinutes(),i={date_time:c,time:h,deb_style:a.$parent.$parent.deb_style,context:a.$parent.$parent.context,deb_skill:a.$parent.$parent.exp_deb_skill,lang_skil:a.$parent.$parent.exp_lang_skil,motion:a.$parent.$parent.motion,prerequisit:a.$parent.$parent.prerequisit,created_by:b.own_uid},j=new Firebase(d.firebase_url),k=j.child("event_related/event"),l=k.push(i,function(a){if(a)console.log("fail to save");else{var b=l.key();e(b),f(b),g(b)}})},a.go_back_edit=function(){a.$parent.$parent.event_create_status="input"}}]),angular.module("mixideaWebApp").controller("CreateEventCompleteCtrl",["$scope","$state",function(a,b){a.goto_event_window=function(){console.log(a.$parent.$parent.event_id);var c=a.$parent.$parent.event_id;b.go("/eventcontext_layout_two_column.context",{id:c}),a.$parent.$parent.click_cancel()}}]),angular.module("mixideaWebApp").controller("EventLayoutCtrl",["$scope","$uibModal",function(a,b){console.log("event layout"),a.open_create_event=function(){console.log("create event is clicked");b.open({templateUrl:"views/event/create_event.html",controller:"CreateEventCtrl",backdrop:"static",size:"lg"})}}]),angular.module("mixideaWebApp").controller("EventCalendarCtrl",["$scope",function(a){console.log("event calendar"),a.name="calendar calendar"}]),angular.module("mixideaWebApp").controller("EventFilterCtrl",["$scope",function(a){console.log("event filter called"),a.name="event filter yuta",a.date_range_show=!1,a.date_from=new Date,a.date_to=new Date,a.date_to.setMonth(a.date_to.getMonth()+13),a.format="yyyy/MM/dd",a.time_from=new Date,a.time_from.setHours(0),a.time_from.setMinutes(0),a.time_to=new Date,a.time_to.setHours(23),a.time_to.setMinutes(59),a.date_range_in=function(){a.date_range_show||(a.date_range_show=!0)},a.data_range_out=function(){a.date_range_show&&(a.date_range_show=!1)},a.time_range_in=function(){a.time_range_show||(a.time_range_show=!0)},a.time_range_out=function(){a.time_range_show&&(a.time_range_show=!1)},a.week_range_in=function(){a.week_range_show||(a.week_range_show=!0)},a.week_range_out=function(){a.week_range_show&&(a.week_range_show=!1)},a.week_change=function(){console.log("aaa");var b=a.weeks.filter(function(a){return a.checked});if(7!=b.length){a.week_filtered=!0,a.active_days.length=0;for(var c=0;c<b.length;c++)a.active_days.push(b[c].short_name)}}}]),angular.module("mixideaWebApp").controller("EventListCtrl",["$scope","EventSearchService",function(a,b){a.event_list=b.event_list}]),angular.module("mixideaWebApp").filter("DateValueString",function(){return function(a){var b=new Date(a),c=b.toString();return c}});