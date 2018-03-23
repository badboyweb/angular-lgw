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