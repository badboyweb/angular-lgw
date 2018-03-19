'use strict';
angular.module('app').directive('appLogin',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/login.html'
    }
}]);