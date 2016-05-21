"use strict";angular.module("mixideaWebApp",["ngAnimate","ngCookies","ngResource","ngSanitize","ngTouch","ui.router","ui.bootstrap","firebase"]),angular.module("mixideaWebApp").run(function(a,b,c,d,e){a.$on("$stateChangeSuccess",function(a,f){e(function(){b.hash(d.scrollTo),c()},1e3)})}),angular.module("mixideaWebApp").config(["$stateProvider","$urlRouterProvider",function(a,b){a.state("eventsearch_layout_three_column",{url:"/event",views:{RootView:{templateUrl:"views/event/event_layout_three.html"}}}).state("eventsearch_layout_three_column.list",{url:"/list",views:{event_left:{templateUrl:"views/event/event_filter.html",controller:"EventFilterCtrl"},event_main:{templateUrl:"views/event/event_list.html",controller:"EventListCtrl"},event_right:{templateUrl:"views/right_column_ad.html"}}}).state("eventsearch_layout_two_column",{url:"/event",views:{RootView:{templateUrl:"views/event/event_layout_two.html"}}}).state("eventsearch_layout_two_column.calendar",{url:"/calendar",views:{event_left:{templateUrl:"views/event/event_filter.html",controller:"EventFilterCtrl"},event_main:{templateUrl:"views/event/event_calendar.html",controller:"EventCalendarCtrl"}}}).state("eventcontext_layout_two_column",{url:"/eventcontext",views:{RootView:{templateUrl:"views/event/eventcontext_layout.html"}}}).state("eventcontext_layout_two_column.context",{url:"/context/:id",views:{eventcontext_main:{templateUrl:"views/event/event_context.html",controller:"EventContextCtrl"},eventcontext_right:{templateUrl:"views/right_column_ad.html"}}}).state("article",{url:"/article/{id}",views:{RootView:{templateUrl:"views/article/article_layout.html",controller:"ArticleLayoutCtrl"}}}).state("article.audio_transcript",{url:"/audio_transcript",views:{article_main:{templateUrl:"views/article/audio_transcript.html",controller:"ArticleAudiotranscriptCtrl"}},params:{scrollTo:null}}).state("article.written_description",{url:"/written_description",views:{article_main:{templateUrl:"views/article/written_description.html",controller:"ArticleWrittendescriptionCtrl"}},params:{scrollTo:null}}).state("mypage",{url:"/mypage",views:{RootView:{templateUrl:"views/mypage/mypage_layout.html"}}})}]),angular.module("mixideaWebApp").controller("EventWebchatMobileCtrl",["$scope","EventWebchatMessageService","DataStorageUserService","$timeout","$uibModalInstance",function(a,b,c,d,e){a.webchat_message=b,a.chat_text_input=new Object,a.user_service=c,a.chat_keyup=function(c){if(console.log(c.which),13==c.which){var d=a.chat_text_input.message;b.send_message(d),a.chat_text_input.message=null}},a.close_window=function(){b.finalize(),e.close("done")},a.click_title=function(){b.goto_eventsite()}}]),angular.module("mixideaWebApp").controller("EventWebchatPcCtrl",["$scope","EventWebchatMessageService","DataStorageUserService","$timeout",function(a,b,c,d){a.webchat_message=b,a.chat_text_input=new Object,a.user_service=c,a.chat_keyup=function(c){if(console.log(c.which),13==c.which){var d=a.chat_text_input.message;b.send_message(d),a.chat_text_input.message=null}},a.close_window=function(){b.finalize();var c=a.$parent.webchat_screentype;console.log(c),"ScreenBottom"==c&&a.$emit("close_ScreenBottom_chat_window")},a.click_title=function(){b.goto_eventsite()}}]),angular.module("mixideaWebApp").controller("HeaderUserCtrl",["$scope","UserAuthService","$uibModal","$state","NotificationService","DataStorageUserService","DataStorageArticleService","DataStorageArgumentService","$location","$anchorScroll","EventWebchatNotificationService","EventWebchatMessageService","DeviceTypeService",function(a,b,c,d,e,f,g,h,i,j,k,l,m){a.user=b,a.user_data_store=f,a.article_data_store=g,a.argument_data_store=h,a.show_menu=!1,a.show_notification=!1,a.show_message=!1,a.show_webchat_PC_dialog=!1,a.webchat_screentype=null,a.menu_list=new Array,a.notify_service=e,a.event_webchat_notify_service=k,a.logout=function(){a.user.logout(),console.log("logout"),a.show_menu=!1,a.show_notification=!1,a.show_message=!1},a.menu_click=function(b){switch(console.log("menu_click"+b),b){case"link_eventlist":a.link_eventlist();break;case"link_articlelist":a.link_articlelist();break;case"link_mypage":a.link_mypage();break;case"logout":a.logout()}},a.link_articlelist=function(){console.log("link_articlelist"),a.show_menu=!1,a.show_notification=!1,a.show_message=!1},a.link_eventlist=function(){console.log("link_eventlist"),d.go("eventsearch_layout_three_column.list"),a.show_menu=!1,a.show_notification=!1,a.show_message=!1},a.link_mypage=function(){console.log("link_mypage"),d.go("mypage"),a.show_menu=!1,a.show_notification=!1,a.show_message=!1},a.click_notification=function(){console.log("click_notification"),a.show_menu=!1,a.show_notification=!a.show_notification,a.show_message=!1},a.notification_select=function(b){console.log("click_notification"),a.notify_service.seen(b.id);var c=d.params.id,e=d.current.name;switch(b.type){case"argument_all":var f="written_description_comment_all";if("article.written_description"==e&&c==b.event_id)i.hash(f),j();else{var g={id:b.event_id,scrollTo:f};d.go("article.written_description",g)}break;case"argument_each":var f="scroll_anchor_"+b.argument_id;if("article.written_description"==e&&c==b.event_id)i.hash(f),j();else{var g={id:b.event_id,scrollTo:f};d.go("article.written_description",g)}break;case"audio_all":var f="audio_transcript_comment_all";if("article.audio_transcript"==e&&c==b.event_id)i.hash(f),j();else{var g={id:b.event_id,scrollTo:f};d.go("article.audio_transcript",g)}break;case"audio_each":var f="scroll_anchor_"+b.role;if("article.audio_transcript"==e&&c==b.event_id)i.hash(f),j();else{var g={id:b.event_id,scrollTo:f};d.go("article.audio_transcript",g)}}a.show_menu=!1,a.show_notification=!1,a.show_message=!1,a.notify_service.release_focused_status()},a.click_message=function(){console.log("click_message"),a.show_menu=!1,a.show_notification=!1,a.show_message=!a.show_message},a.webchat_notify_select=function(b){console.log(b),l.initialize(b.event_id),a.show_menu=!1,a.show_notification=!1,a.show_message=!1,k.seen(b.id),k.release_focused_status();var d=m.get_type();if("Mobile"==d){a.webchat_screentype="Popup";c.open({templateUrl:"views/mobile_chat.html",controller:"EventWebchatMobileCtrl",backdrop:"true",size:"lg"})}else a.webchat_screentype="ScreenBottom",a.show_webchat_PC_dialog=!0},a.$on("close_ScreenBottom_chat_window",function(){a.show_webchat_PC_dialog=!1}),a.click_hamburger=function(){console.log("click_hamburger"),a.show_menu=!a.show_menu,a.show_notification=!1,a.show_message=!1;var b=document.documentElement.clientWidth;800>b?a.menu_list=[{name:"Event List",func_param:"link_eventlist"},{name:"Article List",func_param:"link_articlelist"},{name:"My Page",func_param:"link_mypage"},{name:"Logout",func_param:"logout"}]:a.menu_list=[{name:"Logout",func_param:"logout"}]},a.show_lgoin_form=function(){console.log("show login form is called");c.open({templateUrl:"views/login_form_simple.html",controller:"LoginFormSimpleCtrl",backdrop:"static",size:"sm"})}}]),angular.module("mixideaWebApp").controller("LoginFormSimpleCtrl",["$scope","UserAuthService","$uibModalInstance",function(a,b,c){a.fb_login_show=!0,a.fb_login_loading_show=!1,a.user=b,a.login_fb=function(){console.log("facebook login is clicked"),a.fb_login_show=!1,a.fb_login_loading_show=!0,a.user.login()},a.close_modal=function(){c.close(),a.fb_login_show=!0,a.fb_login_loading_show=!1},a.$watch("user.regist_complete",function(){1==a.user.regist_complete&&(a.fb_login_show=!0,a.fb_login_loading_show=!1,c.close(),location.reload(!0))})}]),angular.module("mixideaWebApp").controller("LoginFormCtrl",["$scope","UserAuthService","$uibModalInstance","MixideaSetting",function(a,b,c,d){console.log("login form control is called"),a.fb_login_show=!0,a.fb_login_loading_show=!1,a.lang_type=null,a.user_introduction=null,a.user=b;var e=new Firebase(d.firebase_url);a.login_fb=function(){console.log("facebook login is clicked"),a.fb_login_show=!1,a.fb_login_loading_show=!0,a.user.login()},a.close_modal=function(){c.close()},a.click_introduction_input=function(){var b=a.user_introduction;if(!b)return void alert("input your self introduction");var c=a.user.own_uid,d=e.child("users/user_ext/"+c+"/profile/introduction");d.set(b)},a.click_language_select=function(){var b=a.lang_type;if(!b)return void alert("select one of the english types");var c=a.user.own_uid,d=e.child("users/user_ext/"+c+"/profile/lang_type");d.set(b)},a.$watch("user.regist_complete",function(){if(1==a.user.regist_complete){var b=document.getElementById("myCarousel"),d=angular.element(b),f=a.user.own_uid,g=e.child("users/user_ext/"+f+"/profile/lang_type"),h=e.child("users/user_ext/"+f+"/profile/introduction");g.on("value",function(a){var b=a.val();b?(console.log(b),h.on("value",function(a){var b=a.val();b?c.close():(d.carousel(2),d.carousel("pause"))})):(d.carousel(1),d.carousel("pause"),console.log(b))},function(){console.log(lang_type)})}})}]),angular.module("mixideaWebApp").controller("CreateEventCtrl",["$scope","$uibModalInstance","$firebaseArray","MixideaSetting",function(a,b,c,d){a.event_create_status="input",a.event_date=null,a.event_time=null,a.context=null,a.deb_style=null,a.exp_deb_skill=null,a.exp_lang_skil=null,a.event_time=null,a.date_time=null,a.motion=null,a.prerequisit=null,a.event_id=null,a.hangout_upload_object=null,a.retrieved_hangout_keylist=new Array;var e=new Firebase(d.firebase_url),f=e.child("hangout_url");f.equalTo(null).limitToFirst(5).once("value",function(c){var d=c.val(),e=null,f=new Array,g=0;for(var h in d)0==g?e=d[h].url:f.push(d[h].url),a.retrieved_hangout_keylist.push(h),g++;5!=g&&(alert("error: please inform it to administrator"),b.close()),a.hangout_upload_object={main:e,team_discussion:f}});a.click_cancel=function(){console.log("cancel button is clicked"),b.close()}}]),angular.module("mixideaWebApp").controller("CreateEventInputCtrl",["$scope","MixideaSetting",function(a,b){var c=new Date;a.minDate=c.setDate(c.getDate()-1);var d=new Date(2015,1,1,0,0);a.event_time=d,a.context_maxchar=350,a.context_minchar=20,a.show_time=!1,a.click_create=function(){return console.log("create button is clicked"),console.log(a.$parent.event_create_status),!a.event_date||!a.context||a.context.length>a.context_maxchar||a.context.length<a.context_minchar||!a.show_time?void alert("input data error"):(a.$parent.$parent.date_time=new Date,a.$parent.$parent.date_time.setYear(a.event_date.getFullYear()),a.$parent.$parent.date_time.setMonth(a.event_date.getMonth()),a.$parent.$parent.date_time.setDate(a.event_date.getDate()),a.$parent.$parent.date_time.setHours(a.event_time.getHours()),a.$parent.$parent.date_time.setMinutes(a.event_time.getMinutes()),a.$parent.$parent.event_date=a.event_date,a.$parent.$parent.context=a.context,a.$parent.$parent.deb_style=a.deb_style,a.$parent.$parent.exp_deb_skill=a.exp_deb_skill,a.$parent.$parent.exp_lang_skil=a.exp_lang_skil,a.$parent.$parent.event_time=a.event_time,a.$parent.$parent.motion=a.motion,a.$parent.$parent.prerequisit=a.prerequisit,void(a.$parent.$parent.event_create_status="confirm"))},a.time_changed=function(){a.show_time=!0}}]),angular.module("mixideaWebApp").controller("CreateEventConfirmCtrl",["$scope","UserAuthService","$timeout","MixideaSetting",function(a,b,c,d){function e(b){var e=a.$parent.$parent.date_time.getTime(),f={deb_style:a.$parent.$parent.deb_style,motion:a.$parent.$parent.motion,game_status:"introduction",type:"debate",date_time:e},g=new Firebase(d.firebase_url),h=g.child("event_related/game/"+b);h.set(f,function(d){d?console.log("error occured"):(console.log("succeed to save"),a.$parent.$parent.event_id=b,c(function(){a.$parent.$parent.event_create_status="saved"}))})}function f(a){for(var b=new Firebase(d.firebase_url),c=[{style:"NA",team:"Gov",type:"def_intro"},{style:"NA",team:"Gov",type:"arguments"},{style:"NA",team:"Gov",type:"arguments"},{style:"NA",team:"Opp",type:"arguments"},{style:"NA",team:"Opp",type:"arguments"},{style:"Asian",team:"Prop",type:"def_intro"},{style:"Asian",team:"Prop",type:"arguments"},{style:"Asian",team:"Prop",type:"arguments"},{style:"Asian",team:"Opp",type:"arguments"},{style:"Asian",team:"Opp",type:"arguments"},{style:"BP",team:"OG",type:"def_intro"},{style:"BP",team:"OG",type:"arguments"},{style:"BP",team:"OG",type:"arguments"},{style:"BP",team:"OO",type:"arguments"},{style:"BP",team:"OO",type:"arguments"},{style:"BP",team:"CG",type:"arguments"},{style:"BP",team:"CG",type:"arguments"},{style:"BP",team:"CO",type:"arguments"},{style:"BP",team:"CO",type:"arguments"}],e=b.child("event_related/Article_Context/"+a+"/identifier/"),f={dummy:!0},g=0;g<c.length;g++){var h=e.child(c[g].style+"/"+c[g].team+"/"+c[g].type);h.push(f)}}function g(b){var c=new Firebase(d.firebase_url),e=c.child("event_related/game_hangout_obj_list/"+b);e.set(a.$parent.$parent.hangout_upload_object,function(a){a?alert("error to save event hangout url"):console.log("succeed to save")});for(var f=0;f<a.retrieved_hangout_keylist.length;f++)h(a.retrieved_hangout_keylist[f])}function h(a){var b=new Firebase(d.firebase_url),c=b.child("hangout_url/"+a+"/status");c.set(!1)}a.click_save=function(){var c=a.$parent.$parent.date_time.getTime(),h=60*a.$parent.$parent.date_time.getUTCHours()+a.$parent.$parent.date_time.getUTCMinutes(),i={date_time:c,time:h,context:a.$parent.$parent.context,deb_skill:a.$parent.$parent.exp_deb_skill,lang_skil:a.$parent.$parent.exp_lang_skil,prerequisit:a.$parent.$parent.prerequisit,created_by:b.own_uid},j=new Firebase(d.firebase_url),k=j.child("event_related/event"),l=k.push(i,function(a){if(a)console.log("fail to save");else{var b=l.key();e(b),f(b),g(b)}})},a.go_back_edit=function(){a.$parent.$parent.event_create_status="input"}}]),angular.module("mixideaWebApp").controller("CreateEventCompleteCtrl",["$scope","$state",function(a,b){a.goto_event_window=function(){console.log(a.$parent.$parent.event_id);var c=a.$parent.$parent.event_id;b.go("eventcontext_layout_two_column.context",{id:c}),a.$parent.$parent.click_cancel()}}]),angular.module("mixideaWebApp").controller("EventLayoutCtrl",["$scope","$uibModal",function(a,b){console.log("event layout"),a.open_create_event=function(){console.log("create event is clicked");b.open({templateUrl:"views/event/create_event.html",controller:"CreateEventCtrl",backdrop:"static",size:"lg"})}}]),angular.module("mixideaWebApp").controller("EventCalendarCtrl",["$scope",function(a){console.log("event calendar"),a.name="calendar calendar"}]),angular.module("mixideaWebApp").controller("EventContextCtrl",["$scope","$stateParams","$timeout","UserAuthService","MixideaSetting","DataStorageUserService","CheckBrowserService","$firebaseArray","$http",function(a,b,c,d,e,f,g,h,i){function j(b){a.total_num=0,a.participant_audience&&(a.participant_audience.length=0);var d=new Array,e=0;if(b)for(var f in b.audience)a.participant_audience.push(f),d.push(f),a.total_num++,e++;a.participant_debater&&(a.participant_debater.length=0);var g=0;if(b){new Array;for(var f in b.debater)a.participant_debater.push(f),d.push(f),a.total_num++,g++}a.participant_aud_or_debater&&(a.participant_aud_or_debater.length=0);var h=0;if(b){new Array;for(var f in b.aud_or_debater)a.participant_aud_or_debater.push(f),d.push(f),a.total_num++,h++}a.user_service.add_by_array(d),c(function(){a.available_audience=k("audience",e),a.available_debater=k("debater",g),a.available_aud_or_debater=k("aud_or_debater",h)})}function k(b,c){var d=a.game_obj.deb_style;if(a.total_num>9)return!1;switch(d){case"NA":switch(b){case"debater":if(6>c)return!0;break;case"audience":if(6>c)return!0;break;case"aud_or_debater":return!0}break;case"Asian":case"BP":switch(b){case"debater":if(8>c)return!0;break;case"audience":if(3>c)return!0;break;case"aud_or_debater":return!0}}return!1}function l(b){var c=u.child("users/event_list/"+a.user.own_uid+"/"+t),d=u.child("event_related/participants/"+t+"/event_role/"+b+"/"+a.user.own_uid),e=u.child("event_related/participants/"+t+"/full/"+a.user.own_uid);c.set("registered").then(function(a){return e.set(!0)}).then(function(a){return d.set(!0)}).then(function(){alert("succeed to join")},function(){alert("error to save data")})}function m(b){var c=u.child("users/event_list/"+a.user.own_uid+"/"+t),d=u.child("event_related/participants/"+t+"/event_role/"+b+"/"+a.user.own_uid),e=u.child("event_related/participants/"+t+"/full/"+a.user.own_uid);d.set(null).then(function(a){return e.set(null)}).then(function(){return c.set("cancelled")}).then(function(){alert("succeed to cancel")},function(){alert("error to cancel")})}function n(b){if(!a.user.own_uid)return void alert("you need to login to join the game");var c=v.child("participants_num/"+b);c.transaction(function(a){var c=!0,d=a;if(a){if(c=k(b,a),!c)return}else{if(c=k(b,0),!c)return;d=0}return d+=1},function(a,c,d){console.log("transaction complete"),a?alert("transaction failed"+a):c?l(b):alert("other person may take a role and cannot login more")})}function o(a){var b=v.child("participants_num/"+a);b.transaction(function(a){var b=a-1;return b})}function p(a){return 10>a?"0"+a:a}function q(a){var b=new Date(a),c=p(b.getUTCFullYear()),d=p(b.getUTCMonth()+1),e=p(b.getUTCDate()),f=p(b.getUTCHours()),g=p(b.getUTCMinutes()),h=p(b.getUTCSeconds()),i=String(c)+String(d)+String(e)+"T"+String(f)+String(g)+String(h)+"Z";return i}function r(){var b=a.event_obj.date_time,c=q(b),d=b+72e5,e=q(d),f="https://www.google.com/calendar/render?",g="action=TEMPLATE&",h="text=Mixidea + Online + Debate&",i="dates=20131206T050000Z/20131208T060000Z",i="dates="+c+"/"+e,j="&location=From your Home Computer&",k="sprop=name:Name&",l="sprop=website:EventWebite&",m="",n="sf=true&",o="output=xml",p=location.href,r="You need to prepare following items\n - Google Chrome browser\n - headset with microphone\n - Desktop , Laptop, Netbook or tablet. Mobile phone is not available\n - Basic Pearliamenatary debate skill\n\n\n you can go to event page from here\n "+p,s=encodeURIComponent(r);m="details="+s+"&";var t=f+g+h+i+j+k+l+m+n+o;a.calendar_link=t}function s(){var b=a.user.create_jwt(),c=JSON.stringify(b),d=a.participant_audience.concat(a.participant_debater).concat(a.participant_aud_or_debater),f={full_participant:d,event_date:a.event_obj.date_time,event_id:t,type:"comment"},g=e.ApiGateway_url+"/event-webchat-notification";i({url:g,method:"POST",headers:{"Content-Type":"application/json",Authorization:c},data:f}).then(function(a){a.data.errorMessage?console.log(a.data.errorMessage):(console.log(a.data),console.log("success to send notification to user through lambda"))},function(a){console.log("fail to put comment on lambda"),console.log(a)})}console.log("event context controller called");var t=b.id,u=new Firebase(e.firebase_url);a.user=d,a.user_service=f,a.check_browser=g,a.event_obj=new Object;var v=u.child("event_related/event/"+t);v.once("value",function(b){a.event_obj=b.val(),r()},function(){alert("fail to load event data")}),a.participant_audience=new Array,a.participant_debater=new Array,a.participant_aud_or_debater=new Array,a.available_audience=!1,a.available_debater=!1,a.available_aud_or_debater=!1;var u=new Firebase(e.firebase_url),w=u.child("event_related/participants/"+t+"/event_role"),x=u.child("event_related/game/"+t);a.game_obj=new Object,x.once("value",function(b){a.game_obj=b.val(),w.on("value",function(b){a.available_audience=!1,a.available_debater=!1,a.available_aud_or_debater=!1,a.total_num=0;var c=b.val();j(c)},function(){alert("fail to load participant data")})}),a.join=function(a){n(a)},a.cancel_participante=function(a){o(a),m(a)},a.hangout_link_str=null,a.show_hangout=!1;var u=new Firebase(e.firebase_url),y=u.child("event_related/game_hangout_obj_list/"+t+"/main");y.once("value",function(b){var c=b.val(),d="?gid=",f=e.hangout_appid,g="&gd=",h=a.user.own_uid,i=t,j="main";a.hangout_link_str=c+d+f+g+h+"^"+i+"^"+j,a.hangout_link_str_pre_uid=c+d+f+g,a.hangout_link_str_post_uid="^"+i+"^"+j}),a.chat_context=new Object;var z=u.child("event_related/event_webchat/"+t);a.event_webchat_array=h(z),a.event_webchat_array.$loaded().then(function(a){console.log(a)})["catch"](function(a){console.log("Error:",a)}),a.submit_chat=function(){if(a.chat_context.comment){var b={type:"comment",context:a.chat_context.comment,user:a.user.own_uid};a.event_webchat_array.$add(b).then(function(b){console.log(b.key()),a.chat_context.comment=null,s()})["catch"](function(a){console.log("Error:",a)})}}}]),angular.module("mixideaWebApp").controller("EventFilterCtrl",["$scope",function(a){console.log("event filter called"),a.name="event filter yuta",a.date_range_show=!1,a.date_from=new Date,a.date_to=new Date,a.date_to.setMonth(a.date_to.getMonth()+13),a.format="yyyy/MM/dd",a.time_from=new Date,a.time_from.setHours(0),a.time_from.setMinutes(0),a.time_to=new Date,a.time_to.setHours(23),a.time_to.setMinutes(59),a.date_range_in=function(){a.date_range_show||(a.date_range_show=!0)},a.data_range_out=function(){a.date_range_show&&(a.date_range_show=!1)},a.time_range_in=function(){a.time_range_show||(a.time_range_show=!0)},a.time_range_out=function(){a.time_range_show&&(a.time_range_show=!1)},a.week_range_in=function(){a.week_range_show||(a.week_range_show=!0)},a.week_range_out=function(){a.week_range_show&&(a.week_range_show=!1)},a.week_change=function(){console.log("aaa");var b=a.weeks.filter(function(a){return a.checked});if(7!=b.length){a.week_filtered=!0,a.active_days.length=0;for(var c=0;c<b.length;c++)a.active_days.push(b[c].short_name)}}}]),angular.module("mixideaWebApp").controller("EventListCtrl",["$scope","DataStorageEventService",function(a,b){a.event_data=b;var c=new Date,d=c.getTime();b.load_all_futuredata(d)}]),angular.module("mixideaWebApp").filter("DateMonthDate",function(){return function(a){var b=new Date(a),c=b.getFullYear(),d=b.getMonth(),e=null;switch(d){case 0:e="Jan";break;case 1:e="Feb";break;case 2:e="Mar";break;case 3:e="April";break;case 4:e="May";break;case 5:e="June";break;case 6:e="July";break;case 7:e="Aug";break;case 8:e="Sep";break;case 9:e="Oct";break;case 10:e="Nov";break;case 11:e="Dec"}var f=b.getDate(),g=c;return g=String(c)+"-"+e+"-"+String(f)}}),angular.module("mixideaWebApp").filter("DateValueString",function(){return function(a){var b=new Date(a),c=b.toString();return c}});