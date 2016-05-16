'use strict';
angular.module('jumboClient').service('User', ['Config', '$q', '$http', '$localStorage', function(Config, $q, $http, $localStorage) {

	var loggedInUser = null;
	// functions that will execute when user is changed
	var userChangedSubscribers = [];

	this.subscribeForUserChange = function(subscriber){
		userChangedSubscribers.push(subscriber);
	}

	function setUser(user){
		loggedInUser = user;
		console.log('user is:');
		console.log(loggedInUser);
		userChangedSubscribers.forEach(function(subscriber){
			subscriber();
		});
	}

	function me(username){
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: 'http://localhost:3000/me',
			data: {
				username: username
			}
		}).then(function successCallback(response) {
			setUser(response.data.user);
			deferred.resolve('success');
		}, 
		function errorCallback(error) {
			console.log(error);
			Config.removeToken();
			delete $localStorage.username;
			deferred.reject(error);
		});
		return deferred.promise;
	}

	function init(){
		console.log($localStorage.username);
		if($localStorage.username){
			me($localStorage.username).then(function(success){
				// very good.
			},
			function(error){
				console.log(error);
			});
		}
	}

	init();

	function user(username, password){
		this.username = username;
		this.password = password;
	}
	
	this.new = function(){
		return new user('', '');
	}

	function handleUserChange(responseData){
		if(responseData.token){
			Config.setToken(responseData.token);
		}
		setUser(responseData.user);
		$localStorage.username = loggedInUser.username;
	}

	this.login = function(username, password){

		var deferred = $q.defer();
		var passwordHash = password;
		$http({
			method: 'POST',
			url: 'http://localhost:3000/authenticate',
			data: {
				username: username,
				password: passwordHash
				}
		}).then(function successCallback(response) {
			handleUserChange(response.data);
			deferred.resolve('success');
		}, 
		function errorCallback(error) {
			console.log(error);
			deferred.reject(error);
		});

		return deferred.promise;
	}

	this.me = me;

	this.logout = function(){
		loggedInUser = null;
		var token = Config.getToken();
		$http({
			method: 'POST',
			url: 'http://localhost:3000/logout',
		}).then(function successCallback(response) {
			Config.removeToken();
			delete $localStorage.username;
			console.log('user is logged out');
		}, 
		function errorCallback(error) {
			// still cleanup
			Config.removeToken();
			delete $localStorage.username;
			console.log('could not logout user')
			console.log(error);
		});
	}

	this.signUp = function(user){
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: 'http://localhost:3000/signIn',
			data: user
		}).then(function successCallback(response) {
			handleUserChange(response.data);
			deferred.resolve('success');
		}, 
		function errorCallback(error) {
			console.log(error);
			deferred.reject(error);
		});
		return deferred.promise;
	}

	this.search = function(searchString){
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: 'http://localhost:3000/users',
			params: {matchingTemplate: searchString}
		}).then(function successCallback(response) {
			deferred.resolve(response.data.users);
		},
		function errorCallback(error) {
			console.log(error);
			deferred.reject(error);
		});
		return deferred.promise;
	}

	this.getUsername = function(){
		return loggedInUser.username;
	}

	this.get = function(){
		return loggedInUser;
	}

	this.getId = function(){
		if(loggedInUser !== null){
			return loggedInUser._id;
		} else {
			return -1;
		}
	}

	this.isLoggedIn = function(){
		return loggedInUser !== null;
	}

	this.isManager = function(){
		if(!this.isLoggedIn()){
			return false;
		}
		return loggedInUser.roles.filter(function(r){return r == 'manager';}).length !== 0;
	}

}]);