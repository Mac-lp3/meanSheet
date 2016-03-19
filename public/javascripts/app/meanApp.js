var meanApp = angular.module('meanApp', []);

meanApp.controller('DashboardController', function($http) {

	/* used to construct a readable date string */
	const monthNames = [
  		"Jan", "Feb", "Mar",
  		"Apr", "May", "Jun", "Jul",
  		"Aug", "September", "Oct",
  		"Nov", "Dec"
	];
   
	var self = this;
   	self.currentTimeSheet = {};

   	/* update variables on date change action */
   	self.dateChange = function (dateInput) {

   		// build query param from new date
   		var parts = dateInput.split('-');

  		// new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  		internalDate = new Date(parts[0], parts[1]-1, parts[2]); 
		dd = parts[2];
		mm = parts[1]-1; //January is 0!
		yyyy = parts[0];

		/* update readable date and get the new time sheet */
		self.readableDate = monthNames[mm - 1] + ' ' + dd + ' ' + yyyy
		self.getTimeSheet(yyyy + '-' + mm + '-' + dd);
   	};

   	/* helper method for the http call to time sheets */
   	self.getTimeSheet = function (dateString) {
		$http({
	   		method : 'get',
	   		url : '/timeSheets/' + dateString
	   	}).then(function success(response){
	   		self.currentTimeSheet = response.data;
	   	});
   	};

   	/* build initial date string */
    var internalDate = new Date();
	var dd = internalDate.getDate();
	var mm = internalDate.getMonth()+1; //January is 0!
	var yyyy = internalDate.getFullYear();
	self.readableDate = monthNames[mm - 1] + ' ' + dd + ' ' + yyyy;

	/* get today's time sheet */
   	self.getTimeSheet(yyyy + '-' + mm + '-' + dd);
   
});