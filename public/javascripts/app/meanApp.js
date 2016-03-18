var meanApp = angular.module('meanApp', []);

meanApp.controller('DashboardController', function($http) {

	const monthNames = [
  		"Jan", "Feb", "Mar",
  		"Apr", "May", "Jun", "Jul",
  		"Aug", "September", "Oct",
  		"Nov", "Dec"
	];
   
	var self = this;
   	self.currentTimeSheet = {};

    var internalDate = new Date();
	var dd = internalDate.getDate();
	var mm = internalDate.getMonth()+1; //January is 0!
	var yyyy = internalDate.getFullYear();
	self.readableDate = monthNames[mm - 1] + ' ' + dd + ' ' + yyyy

   	$http({
   		method : 'get',
   		url : '/timeSheets/' + yyyy + '-' + mm + '-' + dd
   	}).then(function success(response){
   		self.currentTimeSheet = response.data;
   	});

   	self.dateChange = function (dateInput) {

   		// build query param from new date
   		var parts = dateInput.split('-');

  		// new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  		internalDate = new Date(parts[0], parts[1]-1, parts[2]); 
		dd = parts[2];
		mm = parts[1]-1; //January is 0!
		yyyy = parts[0];

		self.readableDate = monthNames[mm - 1] + ' ' + dd + ' ' + yyyy

		// update time sheet
   		$http({
   			method : 'get',
   			url : '/timeSheets/' + yyyy + '-' + mm + '-' + dd
	   	}).then(function success(response){
	   		self.currentTimeSheet = response.data;
	   	});
   	};
   
});