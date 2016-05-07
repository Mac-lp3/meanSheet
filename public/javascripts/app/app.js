'use strict';

// Declare app level module which depends on views, and components
const meanApp = angular.module('meanApp', [
  'ngRoute',
  'meanControllers'
]);

meanApp.config(['$routeProvider', function($routeProvider) {

	// Is there a way for this to be env-dependent?
    $routeProvider.
      when('/login', {
        templateUrl: 'login/login-dev.html',
        controller: 'PhoneListCtrl'
      }).
      when('/index', {
        templateUrl: 'dashboard/dashboard.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/login/login-dev.html'
    });

}]);