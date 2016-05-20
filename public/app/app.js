'use strict';

// Declare app level module which depends on views, and components
const meanApp = angular.module('meanApp', [
  'ngRoute',
  'LoginController',
  'DashboardController',
  'addWorkItemService'
]);

meanApp.config(['$routeProvider', function($routeProvider) {

    // Is there a way for this to be env-dependent?
    $routeProvider.
       otherwise({
         redirectTo: '/login'
    });

}]);