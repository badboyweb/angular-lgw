'use strict';
angular.module('app').service('cache',['$cookies',function ($cookies) {
    this.put=function (key,value) {
        $cookies.put(key,value);
    };
    this.get=function (key) {
        return $cookies.get(key)
    };
    this.remove=function (key) {
        $cookies.remove(key);
    }
}]);
/*
angular.module('app').factory('cache',['$cookies',function ($cookies) {
var obj = {} //可以在内部申明一些私有属性，外部不可访问
    return{
        put:function (key,value) {
            $cookies.put(key,value);
        },
        get:function (key) {
            $cookies.get(key);
        },
        remove:function (key) {
            $cookies.remove(key);
        }
    }
}]);*/
