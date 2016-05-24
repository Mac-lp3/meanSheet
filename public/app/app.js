'use strict';

// Declare app level module which depends on views, and components
const meanApp = angular.module('meanApp', [
  'ngRoute',
  'DevLoginController',
  'DashboardController',
  'addWorkItemService'
]);

meanApp.run(function($rootScope) {
	
    $rootScope.TASK_WORK_ITEM_TYPE = 'Task';
    $rootScope.PROJECT_WORK_ITEM_TYPE = 'Project';
    $rootScope.LEAVE_WORK_ITEM_TYPE = 'Leave';

    $rootScope.URL_MAPPINGS = {
    	'Task' : 'tasks',
    	'Project' : 'projects',
    	'Leave' : 'leave'
    };

});

meanApp.config(['$routeProvider', function($routeProvider) {

    // Is there a way for this to be env-dependent?
    $routeProvider.
       otherwise({
         redirectTo: '/login'
    });

}]);