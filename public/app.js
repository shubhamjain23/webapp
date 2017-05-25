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
            controller  : 'mainCtrl'/*,
            resolve:{
                isLoggedIn: ['Service','$location',function(Service,$location){
                    return Service.isLoggedIn().then(function(response){
                        if(response==true)
                        $location.path('/home');
                    });
                }]
            }*/
        })
        //route for sign up
        .when('/register', {
            url:'/register',
            templateUrl : '/static/register/register.html',
            controller  : 'registerCtrl'/*,
            resolve:{
                isLoggedIn: ['Service','$location',function(Service,$location){
                    return Service.isLoggedIn().then(function(response){
                        if(response==true)
                            $location.path('/home');
                    });
                }]
            }*/
        })
        // route for the home page
        .when('/home', {
            url:'/home',
            templateUrl : '/static/dashboard/dashboard.html',
            controller  : 'DashboardCtrl'/*,
            resolve:{
                isLoggedIn: ['Service','$location',function(Service,$location){
                    return Service.isLoggedIn().then(function(response){
                        if(response==false)
                            $location.path('/');
                    });
                }]
            }*/
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
            controller:'chatCtrl'/*,
            resolve:{
                isLoggedIn: ['Service','$location',function(Service,$location){
                    return Service.isLoggedIn().then(function(response){
                        if(response==false)
                            $location.path('/');
                    });
                }]
            }*/
        });
    //$locationProvider.html5mode(true);
});

