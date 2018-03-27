'use strict';
angular.module('app').controller('searchCtrl',['$scope','$http','dict',function ($scope,$http,dict) {
    $scope.name='';
    $scope.sheetList={};
    $scope.search = function () {
        $http.get('data/positionList.json?name='+$scope.name).success(function (resp) {
            $scope.positionList=resp;
        })
    };
    $scope.search();//默认执行
    $scope.tabList=[{
        id:'city',
        name:'城市'
    },{
        id:'salary',
        name:'薪水'
    },{
        id:'scale',
        name:'公司规模'
    }];
    var tabId='';
    $scope.tclick = function (id,name) {
       // console.log(dict);
        tabId = id;
        $scope.sheetList = dict[id];
        $scope.sheetVisible = true;
    };
    $scope.filterObj = {};
    $scope.sClick = function (id,name) {
       // console.log(id,name)
        if(id){
            angular.forEach($scope.tabList,function (item) {
               if(item.id===tabId){
                   item.name = name;
               }
            });
            $scope.filterObj[tabId+'Id'] = id;
        }else {
            delete $scope.filterObj[tabId+'Id'];
            angular.forEach($scope.tabList,function (item) {
                if(item.id===tabId){
                    switch (item.id){
                        case 'city':
                            item.name = '城市';
                            break;
                        case 'salary':
                            item.name = '工资';
                            break;
                        case 'scale':
                            item.name = '公司规模';
                            break;
                        default:
                    }
                }
            })

        }
    }
}]);