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