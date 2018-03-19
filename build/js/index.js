'use strict';
angular.module('app',['ui.router']);
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
    );
    $urlRouterProvider.otherwise('main');
}]);
'use strict';

angular.module('app').controller('companyCtrl',['$scope',function () {

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
angular.module('app').controller('positionCtrl',['$scope',function ($scope) {

}]);
'use strict';

angular.module('app').directive('appCompany',[function () {
  return{
      restrict:'A',
      replace:true,
      templateUrl:'view/template/company.html'
  }
}]);
'use strict';
angular.module('app').directive('appCompanyDesc',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/companyDesc.html'
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
      templateUrl:'view/template/positionClass.html'
  }
}]);
'use strict';
angular.module('app').directive('appPositionInfo',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/positionInfo.html'
    }
}]);
'use strict';
angular.module('app').directive('appPositionList',[function () {
    return{
        restrict:"A",
        replace:true,
        templateUrl:'view/template/positionList.html',
        scope:{
            data:'=' //暴露一个接口 与控制器的控制域共享
        }
    }
}]);