'use strict';

angular.module('DevLoginController', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login/login-dev.html',
    controller: 'DevLoginController',
    controllerAs: "loginCtrl"
  });
}])

.controller('DevLoginController', ['$http', function($http) {

    const self = this;
    self.emailAddress = '';
    self.password = '';

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

        $http({
            method : 'POST',
            url : '/login',
            data : {
                emailAddress : self.emailAddress,
                password : self.password
            }
        }).then(function (response){
          // TODO 
        });
    };
}])