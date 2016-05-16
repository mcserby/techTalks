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
    $urlRouterProvider.otherwise('/main/hello');
    
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

       .state('main.administrate', {
            url: '/administrate',
            templateUrl: '/views/administrate/administrate.html'
        })

       .state('main.administrate.managedProjects', {
            url: '/managedProjects',
            templateUrl: '/views/administrate/managedProjects.html'
        })

        .state('main.administrate.newProject', {
            url: '/administrate/newProject',
            templateUrl: '/views/administrate/newProject.html'
        })

        .state('main.myProjects', {
            url: '/myProjects',
            templateUrl: '/views/project/myProjects.html'
        })

        .state('main.project', {
            url: '/project',
            templateUrl: '/views/project/project.html',
            params: {project: null}
        })

        .state('main.project.addTask', {
            url: '/addTask',
            templateUrl: '/views/project/addTask.html'
        })

});
