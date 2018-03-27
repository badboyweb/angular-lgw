'use strict';
angular.module('app').directive('appPositionList',['$http',function ($http) {
    return{
        restrict:"A",
        replace:true,
        templateUrl:'view/template/positionList.html',
        scope:{
            data:'=',//暴露一个接口 与控制器的控制域共享
            filterObj:'=',
            isFavorite:'='
        },
        link:function ($scope) {
            $scope.select = function (item) {
                $http.post('data/favorite.json',{
                    id:item.id,
                    select:!item.select
                }).success(function (resp) {
                    item.select = !item.select;
                })
            }
        }
    }
}]);