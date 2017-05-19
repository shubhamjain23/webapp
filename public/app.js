/**
 * Created by Shubham on 30-03-2017.
 */
var app = angular.module("app", ['ngRoute', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngAnimate', 'ngAria', 'ngPassword']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        // route for login page
        .when('/', {
            url:'/',
            templateUrl : '/static/login.html',
            controller  : 'mainCtrl'
        })
        //route for sign up
        .when('/register', {
            url:'/register',
            templateUrl : '/static/register.html',
            controller  : 'registerCtrl'
        })
        // route for the home page
        .when('/home', {
            url:'/home',
            templateUrl : '/static/dashboard.html',
            controller  : 'DashboardCtrl'
        })
        // route for contact, policy, terms, about
        .when('/tabs',{
            url:'/tabs',
            templateUrl: '/static/tabs.html',
            controller: 'tabCtrl'
        })
        .when('/chatPage',{
            url:'/chat',
            templateUrl:'/static/chatPage.html',
            controller:'chatCtrl'
        });
    $locationProvider.html5Mode(true);
});
app.directive('disallowSpaces', function() {
    return {
        restrict: 'A',

        link: function($scope, $element) {
            $element.bind('input', function() {
                $(this).val($(this).val().replace(/ /g, ''));
            });
        }
    };
});
app.directive('disallowUppercase', function() {
    return {
        restrict: 'A',

        link: function($scope, $element) {
            $element.bind('input', function() {
                $(this).val($(this).val().toLowerCase());
            });
        }
    };
});
app.factory('socket', ['$rootScope', function($rootScope) {
    var socket = io.connect('http://localhost:8787/chatPage');

    return {
        on: function(eventName, callback){
            socket.on(eventName, callback);
        },
        emit: function(eventName, data) {
            socket.emit(eventName, data);
        }
    };
}]);