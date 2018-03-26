'use strict';
angular.module('app').directive('appPositionInfo',['$http',function ($http) {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/positionInfo.html',
        scope:{
            isLogin:'=',
            pos:'='
        },
        link:function ($scope) {
            $scope.favorite =function () {
                $http.post('data/favorite.json',{
                    id:$scope.pos.id,
                    select:$scope.pos.select
                }).success(function (resp) {
                    console.log(resp);
                })
            }
        }
    }
}]);