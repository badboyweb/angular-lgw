"use strict";angular.module("app",["ui.router","ngCookies","validation"]),angular.module("app").controller("companyCtrl",["$scope","$state","$http",function(e,t,n){n.get("data/company.json?id="+t.params.id).success(function(t){e.comDesc=t,e.$broadcast("abc",{id:1})}),e.$on("cba",function(t,e){console.log(t,e)})}]),angular.module("app").controller("favoriteCtrl",["$scope","$http",function(e,t){t.get("data/myFavorite.json").success(function(t){e.list=t})}]),angular.module("app").controller("loginCtrl",["$scope","$http","$state","cache",function(t,e,n,o){t.submit=function(){e.post("data/login.json",t.user).success(function(t){o.put("id",t.id),o.put("name",t.name),o.put("image",t.image),n.go("main")})}}]),angular.module("app").controller("mainCtrl",["$scope","$http",function(e,t){t.get("data/positionList.json").success(function(t){e.list=t})}]),angular.module("app").controller("myCtrl",["$scope","cache","$state",function(t,e,n){e.get("name")&&(t.name=e.get("name"),t.image=e.get("image")),t.logout=function(){e.remove("id"),e.remove("name"),e.remove("image"),n.go("main")}}]),angular.module("app").controller("positionCtrl",["$q","$http","$scope","$state","cache","$log",function(t,n,o,e,a,i){var r;o.isLogin=!!a.get("name"),o.message=o.isLogin?"投个简历":"去登录",(r=t.defer(),n.get("data/position.json?id="+e.params.id).success(function(t){(o.position=t).posted&&(o.message="已投递"),r.resolve(t)}).error(function(t){r.reject(t)}),r.promise).then(function(t){var e;e=t.companyId,n.get("data/company.json?id="+e).success(function(t){o.company=t})}),o.go=function(){"已投递"!==o.message&&(o.isLogin?n.post("data/handle.json",{id:o.position.id}).success(function(t){i.info(t),o.message="已投递"}):e.go("login"))}}]),angular.module("app").controller("postCtrl",["$scope","$http",function(n,t){n.tabList=[{id:"all",name:"全部"},{id:"pass",name:"面试邀请"},{id:"fail",name:"不合适"}],t.get("data/myPost.json").success(function(t){n.list=t}),n.filterObj={},n.tClick=function(t,e){switch(t){case"all":delete n.filterObj.state;break;case"pass":n.filterObj.state="1";break;case"fail":n.filterObj.state="-1"}}}]),angular.module("app").controller("registerCtrl",["$scope","$http","$interval","$state",function(n,t,o,e){n.submit=function(){t.post("data/regist.json",n.user).success(function(t){e.go("login")})};var a=60;n.send=function(){t.get("data/code.json").success(function(t){if(1===t.state){a=60,n.time="60s";var e=o(function(){a<=0?(o.cancel(e),n.time=""):(a--,n.time=a+"s")},1e3)}})}}]),angular.module("app").controller("searchCtrl",["$scope","$http","dict",function(n,t,o){n.name="",n.sheetList={},n.search=function(){t.get("data/positionList.json?name="+n.name).success(function(t){n.positionList=t})},n.search(),n.tabList=[{id:"city",name:"城市"},{id:"salary",name:"薪水"},{id:"scale",name:"公司规模"}];var a="";n.tclick=function(t,e){a=t,n.sheetList=o[t],n.sheetVisible=!0},n.filterObj={},n.sClick=function(t,e){t?(angular.forEach(n.tabList,function(t){t.id===a&&(t.name=e)}),n.filterObj[a+"Id"]=t):(delete n.filterObj[a+"Id"],angular.forEach(n.tabList,function(t){if(t.id===a)switch(t.id){case"city":t.name="城市";break;case"salary":t.name="工资";break;case"scale":t.name="公司规模"}}))}}]),angular.module("app").filter("filterByObj",[function(){return function(t,o){var a=[];return angular.forEach(t,function(t){var e=!0;for(var n in o)t[n]!==o[n]&&(e=!1);e&&a.push(t)}),a}}]),angular.module("app").value("dict",{}).run(["$http","dict",function(t,e){t.get("data/city.json").success(function(t){e.city=t}),t.get("data/salary.json").success(function(t){e.salary=t}),t.get("data/scale.json").success(function(t){e.scale=t})}]),angular.module("app").config(["$provide",function(t){t.decorator("$http",["$delegate","$q",function(a,i){return a.post=function(t,e,n){var o=i.defer();return a.get(t).success(function(t){o.resolve(t)}).error(function(t){o.reject(t)}),{success:function(t){o.promise.then(t)},error:function(t){o.promise.then(null,t)}}},a}])}]),angular.module("app").config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("main",{url:"/main",templateUrl:"view/main.html",controller:"mainCtrl"}).state("position",{url:"/position/:id",templateUrl:"view/position.html",controller:"positionCtrl"}).state("company",{url:"/company/:id",templateUrl:"view/companyInfo.html",controller:"companyCtrl"}).state("search",{url:"/search",templateUrl:"view/search.html",controller:"searchCtrl"}).state("login",{url:"/login",templateUrl:"view/login.html",controller:"loginCtrl"}).state("register",{url:"/register",templateUrl:"view/register.html",controller:"registerCtrl"}).state("my",{url:"/my",templateUrl:"view/my.html",controller:"myCtrl"}).state("favorite",{url:"/favorite",templateUrl:"view/favorite.html",controller:"favoriteCtrl"}).state("post",{url:"/post",templateUrl:"view/post.html",controller:"postCtrl"}),e.otherwise("main")}]),angular.module("app").config(["$validationProvider",function(t){t.setExpression({phone:/^1[\d]{10}$/,password:function(t){return 5<(t+"").length},required:function(t){return!!t}}).setDefaultMsg({phone:{success:"",error:"必须是11位的手机号"},password:{success:"",error:"长度至少6位"},required:{success:"",error:"不能为空"}})}]),angular.module("app").directive("appSheet",[function(){return{restrict:"A",replace:!0,scope:{list:"=",visible:"=",select:"&"},templateUrl:"view/template/appSheet.html"}}]),angular.module("app").directive("appTab",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/appTab.html",scope:{list:"=",tabClick:"&"},link:function(e){e.click=function(t){e.selectedId=t.id,e.tabClick(t)}}}}]),angular.module("app").directive("appCompany",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/company.html",scope:{com:"="}}}]),angular.module("app").directive("appCompanyDesc",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/companyDesc.html",scope:{com:"="}}}]),angular.module("app").directive("appFoot",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/foot.html"}}]),angular.module("app").directive("appGoLogin",["cache",function(e){return{restrict:"A",replace:!0,templateUrl:"view/template/goLogin.html",link:function(t){t.name=e.get("name")||""}}}]),angular.module("app").directive("appHead",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/head.html"}}]),angular.module("app").directive("appHeadBar",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/headBar.html",scope:{text:"="},link:function(t){t.back=function(){window.history.back()}}}}]),angular.module("app").directive("appPositionClass",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/positionClass.html",scope:{com:"="},link:function(e){e.showPositionList=function(t){e.positionList=e.com.positionClass[t].positionList,e.isActive=t},e.$watch("com",function(t){t&&e.showPositionList(0)}),e.$on("abc",function(t,e){console.log(t,e)}),e.$emit("cba",{name:2})}}}]),angular.module("app").directive("appPositionInfo",["$http",function(e){return{restrict:"A",replace:!0,templateUrl:"view/template/positionInfo.html",scope:{isLogin:"=",pos:"="},link:function(t){t.favorite=function(){e.post("data/favorite.json",{id:t.pos.id,select:t.pos.select}).success(function(t){console.log(t)})}}}}]),angular.module("app").directive("appPositionList",["$http",function(n){return{restrict:"A",replace:!0,templateUrl:"view/template/positionList.html",scope:{data:"=",filterObj:"=",isFavorite:"="},link:function(t){t.select=function(e){n.post("data/favorite.json",{id:e.id,select:!e.select}).success(function(t){e.select=!e.select})}}}}]),angular.module("app").service("cache",["$cookies",function(n){this.put=function(t,e){n.put(t,e)},this.get=function(t){return n.get(t)},this.remove=function(t){n.remove(t)}}]);