/**
 * Created by Shubham on 30-03-2017.
 */
var app = angular.module("app", ['ngRoute', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngAnimate', 'ngAria', 'ngPassword']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        // route for login page
        .when('/', {
            url:'/',
            templateUrl : '/static/login/login.html',
            controller  : 'mainCtrl'
        })
        //route for sign up
        .when('/register', {
            url:'/register',
            templateUrl : '/static/register/register.html',
            controller  : 'registerCtrl'
        })
        // route for the home page
        .when('/home', {
            url:'/home',
            templateUrl : '/static/dashboard/dashboard.html',
            controller  : 'DashboardCtrl'
        })
        // route for contact, policy, terms, about
        .when('/tabs',{
            url:'/tabs',
            templateUrl: '/static/footer/tabs.html',
            controller: 'tabCtrl'
        })
        .when('/chatPage',{
            url:'/chat',
            templateUrl:'/static/chat/chatPage.html',
            controller:'chatCtrl'
        });
    $locationProvider.html5Mode(true);
});

