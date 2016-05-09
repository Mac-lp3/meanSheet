'use strict';

// Declare app level module which depends on views, and components
const meanApp = angular.module('meanApp', [
  'ngRoute',
  'meanControllers'
]);

meanApp.config(['$routeProvider', function($routeProvider) {

    // Is there a way for this to be env-dependent?
    $routeProvider.
      when('/index', {
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardController'
      }).
      otherwise({
        redirectTo: '/login/login-dev.html'
    });

}]);