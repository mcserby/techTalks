'use strict';

var jumboClient = angular
  .module('jumboClient', [
	'ngAnimate',
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ui.router',
	'ngMaterial',
    'cgBusy',
    'ui.bootstrap',
	'ngStorage'
 ])

jumboClient.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
    $urlRouterProvider.otherwise('/hello');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('main', {
            url: '/main',
            templateUrl: '/views/main.html'
        })

        .state('main.hello', {
            url: '/hello',
            templateUrl: '/views/hello/hello.html'
        })

        .state('main.login', {
            url: '/login',
            templateUrl: '/views/authentication/login.html'
        })

        .state('main.signUp', {
            url: '/signUp',
            templateUrl: '/views/authentication/signUp.html'
        })

});
