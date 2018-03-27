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