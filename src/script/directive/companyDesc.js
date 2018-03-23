'use strict';
angular.module('app').directive('appCompanyDesc',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/companyDesc.html',
        scope:{
            com:"="
        }
    }
}]);