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