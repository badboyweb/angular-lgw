'use strict';
angular.module('app').controller('registerCtrl',['$scope','$http','$interval','$state',function ($scope,$http,$interval,$state) {
    $scope.submit = function () {
        $http.post('data/regist.json',$scope.user).success(function (resp) {
            $state.go('login')
        })
    };
    var count = 60;
    $scope.send = function () {
        $http.get('data/code.json').success(function (resp) {
            if(1===resp.state){
                count = 60;//每次点击初始化为60
                $scope.time='60s';
                var interval = $interval(function () {
                    if (count<=0){
                        $interval.cancel(interval);
                        $scope.time='';
                    }else {
                        count--;
                        $scope.time=count+'s';
                    }
                },1000)
            }
        })
    }

}]);