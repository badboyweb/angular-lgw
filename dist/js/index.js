"use strict";angular.module("app",["ui.router"]),angular.module("app").config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("main",{url:"/main",templateUrl:"view/main.html",controller:"mainCtrl"}).state("position",{url:"/position/:id",templateUrl:"view/position.html",controller:"positionCtrl"}).state("company",{url:"/company/:id",templateUrl:"view/companyInfo.html",controller:"companyCtrl"}),e.otherwise("main")}]),angular.module("app").controller("companyCtrl",["$scope",function(){}]),angular.module("app").controller("mainCtrl",["$scope","$http",function(e,t){t.get("/data/positionList.json").success(function(t){e.list=t})}]),angular.module("app").controller("positionCtrl",["$scope",function(t){}]),angular.module("app").directive("appCompany",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/company.html"}}]),angular.module("app").directive("appCompanyDesc",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/companyDesc.html"}}]),angular.module("app").directive("appFoot",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/foot.html"}}]),angular.module("app").directive("appHead",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/head.html"}}]),angular.module("app").directive("appHeadBar",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/headBar.html",scope:{text:"="},link:function(t){t.back=function(){window.history.back()}}}}]),angular.module("app").directive("appLogin",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/login.html"}}]),angular.module("app").directive("appPositionClass",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/positionClass.html"}}]),angular.module("app").directive("appPositionInfo",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/positionInfo.html"}}]),angular.module("app").directive("appPositionList",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/positionList.html",scope:{data:"="}}}]);