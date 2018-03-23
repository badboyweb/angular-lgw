'use strict';
angular.module('app',['ui.router','ngCookies']);
'use strict';
angular.module('app').value('dict',{}).run(['$http','dict',function ($http,dict) {
    $http.get('data/city.json').success(function (resp) {
        dict.city=resp;
    });
    $http.get('data/salary.json').success(function (resp) {
        dict.salary=resp;
    });
    $http.get('data/scale.json').success(function (resp) {
        dict.scale=resp;
    })

}]);
'use strict';
angular.module('app').config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state('main',{
            url:'/main',
            templateUrl:'view/main.html',
            controller:'mainCtrl'
        }).state('position',{
            url:'/position/:id',
            templateUrl:'view/position.html',
            controller:'positionCtrl'
    }).state('company',{
            url:'/company/:id',
            templateUrl:'view/companyInfo.html',
            controller:'companyCtrl'
        }
    ).state('search',{
        url:'/search',
        templateUrl:'view/search.html',
        controller:'searchCtrl'
    });
    $urlRouterProvider.otherwise('main');
}]);
'use strict';

angular.module('app').controller('companyCtrl',['$scope','$state','$http',function ($scope,$state,$http) {
$http.get('data/company.json?id='+$state.params.id).success(function (resp) {
    $scope.comDesc=resp;
    $scope.$broadcast('abc',{id:1});//如果接受函数写在指令内，需要等指令初始化完成之后在广播，这里放在ajax请求里面就没问题。如果放在外面就监听不到。
});
    $scope.$on('cba',function (event,data) {//原理同上，广播是无状态传播，先做好接受准备，后面在广播
        console.log(event,data)
    })
}]);
'use strict';
angular.module("app").controller('mainCtrl',['$scope','$http',function ($scope,$http) {
    $http.get('data/positionList.json').success(
        function (resp) {
           //console.log(resp);
            $scope.list=resp
        }
    );
}]);
'use strict';
angular.module('app').controller('positionCtrl',["$q",'$http','$scope','$state',function ($q,$http,$scope,$state) {
    $scope.isLogin=false;
    function getPosition() {
        var def = $q.defer();//通过$q.defer()创建一个def延迟对象，在创建一个def实例时，也会创建出来一个派生的promise对象，使用def.promise就可以检索到派生的promise。
        $http.get('data/position.json?id='+$state.params.id).success(function (resp) {
            $scope.position=resp;
            def.resolve(resp);//任务被成功执行
        }).error(function (err) {
            def.reject(err)//任务未被执行
        });//高版本中没有success和error函数 可以用.then(function(resp){}).catch(function(err){})
        //或者.then(function(resp){},function(err){})
        return def.promise;//返回def实例的promise对象
    }
    function getCompany(id) {
        $http.get('data/company.json?id='+id).success(function (resp) {
            $scope.company=resp;
        })
    }
    getPosition().then(function (obj) {
        console.log(obj);//输出position.json的内容
        getCompany(obj.companyId);
    })//两个函数的同步执行，变成了异步执行

}]);
'use strict';
angular.module('app').controller('searchCtrl',['$scope','$http','dict',function ($scope,$http,dict) {
    $scope.name='';
    $scope.sheetList={};
    $scope.search = function () {
        $http.get('data/positionList.json?name='+$scope.name).success(function (resp) {
            $scope.positionList=resp;
        })
    };
    $scope.search();//默认执行
    $scope.tabList=[{
        id:'city',
        name:'城市'
    },{
        id:'salary',
        name:'薪水'
    },{
        id:'scale',
        name:'公司规模'
    }];
    var tabId='';
    $scope.tclick = function (id,name) {
       // console.log(dict);
        tabId = id;
        $scope.sheetList = dict[id];
        $scope.sheetVisible = true;
    };
    $scope.filterObj = {};
    $scope.sClick = function (id,name) {
       // console.log(id,name)
        if(id){
            angular.forEach($scope.tabList,function (item) {
               if(item.id===tabId){
                   item.name = name;
               }
            });
            $scope.filterObj[tabId+'Id'] = id;
        }else {
            delete $scope.filterObj[tabId+'Id'];
            angular.forEach($scope.tabList,function (item) {
                if(item.id===tabId){
                    switch (item.id){
                        case 'city':
                            item.name = '城市';
                            break;
                        case 'salary':
                            item.name = '工资';
                            break;
                        case 'scale':
                            item.name = '公司规模';
                            break;
                        default:
                    }
                }
            })

        }
    }
}]);
'use strict';

angular.module('app').directive('appSheet',[function () {
    return{
        restrict:'A',
        replace:true,
        scope:{
          list:'=',
          visible:'=',
          select:'&'
        },
        templateUrl:'view/template/appSheet.html'
    }
}]);
'use strict';

angular.module('app').directive('appTab',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/appTab.html',
        scope:{
            list:'=',
            tabClick:'&'
        },
        link:function ($scope) {
            $scope.click= function (tab) {
                $scope.selectedId = tab.id;
                $scope.tabClick(tab);
            }
            
        }
    }
}]);
'use strict';

angular.module('app').directive('appCompany',[function () {
  return{
      restrict:'A',
      replace:true,
      templateUrl:'view/template/company.html',
      scope:{
          com:'='
      }
  }
}]);
'use strict';
angular.module('app').directive('appCompanyDesc',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/companyDesc.html',
        scope:{
            com:"="
        }
    }
}]);
'use strict';
angular.module('app').directive('appFoot',[function () {
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/foot.html'
    }
}]);
'use strict';
angular.module('app').directive('appHead',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/head.html'
    }
}]);
'use strict';
angular.module('app').directive('appHeadBar',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/headBar.html',
        scope:{
            text:'='
        },
        link:function (scope) {
            scope.back=function () {
                window.history.back();
            }
        }
    }
}]);
'use strict';
angular.module('app').directive('appLogin',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/login.html'
    }
}]);
'use strict';

angular.module('app').directive('appPositionClass',[function () {
  return{
      restrict:'A',
      replace:true,
      templateUrl:'view/template/positionClass.html',
      scope:{
          com:'='
      },
      link:function ($scope) {
          $scope.showPositionList = function (idx) {
              $scope.positionList = $scope.com.positionClass[idx].positionList;
              $scope.isActive = idx;
              //Cannot read property 'positionClass' of undefined 由于先加载了指令，而com还没有传过来，改进如下：
          };
          $scope.$watch('com',function (newVal) {
              //给com属性添加监听事件 会影响性能
              if(newVal) $scope.showPositionList(0);
          });
          $scope.$on('abc',function (event,data) {
              console.log(event,data);
          });
          $scope.$emit('cba',{name:2});
          //$scope.$digest() 用于在指令中用原生JS操作DOm对象时，数据绑定失效，进行重新数据绑定
      }
  }
}]);
'use strict';
angular.module('app').directive('appPositionInfo',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/positionInfo.html',
        scope:{
            isLogin:'=',
            pos:'='
        }
    }
}]);
'use strict';
angular.module('app').directive('appPositionList',[function () {
    return{
        restrict:"A",
        replace:true,
        templateUrl:'view/template/positionList.html',
        scope:{
            data:'=',//暴露一个接口 与控制器的控制域共享
            filterObj:'='
        }
    }
}]);
'use strict';
angular.module('app').filter('filterByObj',[function () {
    return function (list,obj) {
        var result = [];
        angular.forEach(list,function (item) {
            var isEqual = true;
            for (var e in obj){
                if(item[e] !== obj[e]){
                    isEqual = false;
                }
            }
            if (isEqual){
                result.push(item);
            }
        });
        return result;
    }
}]);
'use strict';
/*angular.module('app').service('cache',['$cookies',function ($cookies) {
    this.put=function (key,value) {
        $cookies.put(key,value);
    };
    this.get=function (key) {
        return $cookies.get(key)
    };
    this.remove=function (key) {
        $cookies.remove(key);
    }
}]);*/
/*
angular.module('app').factory('cache',['$cookies',function ($cookies) {
var obj = {} //可以在内部申明一些私有属性，外部不可访问
    return{
        put:function (key,value) {
            $cookies.put(key,value);
        },
        get:function (key) {
            $cookies.get(key);
        },
        remove:function (key) {
            $cookies.remove(key);
        }
    }
}]);*/
