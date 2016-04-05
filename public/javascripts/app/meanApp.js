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
    self.currentDateUrlString = '';
    self.TASK_WORK_ITEM_TYPE = 'Task';
    self.PROJECT_WORK_ITEM_TYPE = 'Project';
    self.LEAVE_WORK_ITEM_TYPE = 'Leave';

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
        self.currentDateUrlString = dateString;
     		self.currentTimeSheet = response.data;
     	});
   	};

    self.addLineItem = function(workItemType, workItemCode){

      if (workItemType) {

        // check what type of work item this line item represents
        if (workItemType == self.TASK_WORK_ITEM_TYPE) {
          
          // make sure it's not already on the line item list.
          for (var i = 0; i < self.currentTimeSheet.lineItems.length; i++){
            if (self.currentTimeSheet.lineItems[i].code == workItemCode) {
              // already on time sheet.
            }
          }

          // if not, then get it from data store
          $http({
            method : 'post',
            url : '/timeSheets/' + self.currentDateUrlString + '/lineItems/' + workItemCode
          }).then(function success(response){
            self.currentTimeSheet = response.data;
          });  
          // add it to line items.
          // TODO remove it from modal...
        }

        if (workItemType == self.PROJECT_WORK_ITEM_TYPE) {

        }

        if (workItemType == self.LEAVE_WORK_ITEM_TYPE) {

        }
      }
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

    function initializeProjects() {
      $http({
          method : 'get',
          url : '/projects'
        }).then(function success(response){
          self.projectList = response.data;
        });
    }

    initializeProjects();

    function initializeTasks() {
      $http({
          method : 'get',
          url : '/tasks'
        }).then(function success(response){
          self.taskList = response.data;
        });
    }

    initializeTasks();

    self.searchWorkItems = function () {

      // dont bother for empty strings
      if (self.queryString) {
        
        // query tasks
        $http({
          method : 'get',
          url : '/tasks?q=' + self.queryString
        }).then(function success(response){
          self.taskList = response.data;
        });

        // query projects
        $http({
          method : 'get',
          url : '/projects?q=' + self.queryString
        }).then(function success(response){
          self.projectList = response.data;
        });
      };
    }
});