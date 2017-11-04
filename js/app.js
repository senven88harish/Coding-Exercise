/**
 * Created by venkateshkumar on 4/21/17.
 */
var codingExApp = angular.module('codingExApp', ['ngRoute']);

codingExApp.config(function($locationProvider, $routeProvider) {
    $routeProvider
        .when(
        '/task1',{
            templateUrl:'templates/task1.html',
            controller:'Task1Ctrl',
            activetab:'task1'
        })
        .when('/task2',{
            templateUrl:'templates/task2.html',
            controller:'Task2Ctrl',
            activetab:'task2'
        }).
        otherwise({redirectTo: '/task1', activetab:'task1'});
    $locationProvider.html5Mode(true);
}).run(function ($rootScope, $route) {
    $rootScope.$route = $route;
});