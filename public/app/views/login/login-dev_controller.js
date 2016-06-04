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

        if (self.emailAddress === 'timeLogging@mean.com'){
            self.password = 'timeLoggingPassword';
        }
        if (self.emailAddress === 'timeApproving@mean.com'){
            self.password = 'timeApprovingPassword';
        }
        if (self.emailAddress === 'timeAnalyzing@mean.com'){
            self.password = 'timeAnalyzingPassword';
        }
        if (self.emailAddress === 'slipster@lol.gov'){
            self.password = 'slippyfist';
        }
        if (self.emailAddress === 'dollaz@IDK.gov'){
            self.password = '311insidejob';
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