'use strict';
angular.module('app').directive('appGoLogin',['cache',function (cache) {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/goLogin.html',
        link:function ($scope) {
            $scope.name= cache.get('name') || '';

        }
    }
}]);