'use strict';

angular.module('DevLoginController', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login/login-dev.html',
    controller: 'DevLoginController',
    controllerAs: "loginCtrl"
  });
}])

.controller('DevLoginController', ['$http', '$location', function($http, $location) {

    const self = this;
    self.emailAddress = '';
    self.password = '';
    self.errorMessage = '';

    self.submit = function () {

        if (self.emailAddress === 'TimeLoggingUser@mean.edu'){
            self.password = 'slippyfist';
        }
        if (self.emailAddress === 'TimeApprovingUser@mean.edu'){
            self.password = '311insidejob';
        }
        if (self.emailAddress === 'TimeAnalyzingUser@mean.edu'){
            self.password = 'badtouch';
        }

        $http({

            method : 'post',
            url : '/auth',
            data : {
                emailAddress : self.emailAddress,
                password : self.password
            }

        }).then(function success(response){

          // forward the user to the dashboard
          $location.path('/dashboard');

        }, function error(response){

            // TODO
            self.errorMessage = 'you done goofed';

        });
    };
}])