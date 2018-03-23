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