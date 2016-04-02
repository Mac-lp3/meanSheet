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
  self.datePickerInput = '';

 	/* update variables on date change action */
 	self.dateChange = function () {

 		// build query param from new date
 		var parts = self.datePickerInput.split('-');

    dd = parts[2];
    mm = parts[1]-1; //January is 0!
    yyyy = parts[0];
  
    /* update readable date and get the new time sheet */
    self.readableDate = monthNames[mm] + ' ' + dd + ' ' + yyyy
    self.getTimeSheet(yyyy + '-' + mm + '-' + dd);
    self.datePickerInput = '';
 	};

 	self.getPreviousTimeSheet = function () {
 		
 		// get current date and subtract 7 days
 		var tempDate = new Date(self.currentTimeSheet.sundayDate);
 		tempDate.setDate(tempDate.getDate() - 7);

 		// build query string
 		var dd = tempDate.getDate();
    var mm = tempDate.getMonth()+1; //January is 0!
    var yyyy = tempDate.getFullYear();

    // get new time sheet and update readable date
    self.readableDate = monthNames[mm - 1] + ' ' + dd + ' ' + yyyy;
 		self.getTimeSheet(yyyy + '-' + mm + '-' + dd);
 	};

 	self.getNextTimeSheet = function () {
 		
 		// get current date and add 7 days
    var tempDate = new Date(self.currentTimeSheet.sundayDate);
 		tempDate.setDate(tempDate.getDate() + 7);

 		// build query string
    var dd = tempDate.getDate();
    var mm = tempDate.getMonth()+1; //January is 0!
    var yyyy = tempDate.getFullYear()

    // get new time sheet and update readable date
    self.readableDate = monthNames[mm - 1] + ' ' + dd + ' ' + yyyy;
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
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  self.readableDate = monthNames[mm - 1] + ' ' + dd + ' ' + yyyy;

  /* get today's time sheet */
  self.getTimeSheet(yyyy + '-' + mm + '-' + dd);
   
});

meanApp.controller('WorkItemModalController', function($http) {

  var self = this;
  self.queryString = '';
  self.taskList = [];
  self.projectList = [];

  self.searchWorkItems = function () {

    // dont bother for empty strings
    if (self.queryString) {

    }
  };

});