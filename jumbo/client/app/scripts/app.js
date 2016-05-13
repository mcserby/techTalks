'use strict';

var promatonFrqClient = angular
  .module('promatonFrqClient', [
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

promatonFrqClient.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
    $urlRouterProvider.otherwise('/main');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('main', {
            url: '/main',
            templateUrl: '/views/main.html'
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
