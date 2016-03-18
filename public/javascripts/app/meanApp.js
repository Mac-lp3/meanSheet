var meanApp = angular.module('meanApp', []);

meanApp.controller('TimeSheetController', function($http) {
   
   var self = this;
   this.currentTimeSheet = {};

    var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

   $http({
   		method : 'get',
   		url : '/timeSheets/' + yyyy + '-' + mm + '-' + dd
   }).then(function success(response){
   		self.currentTimeSheet = response.data;
   });
   
});