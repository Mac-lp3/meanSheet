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

        // make sure it's not already on the line item list.
        var skip = false;
        for (var i = 0; i < self.currentTimeSheet.lineItems.length; i++){
          if (self.currentTimeSheet.lineItems[i].code == workItemCode) {
            var skip = true;
            break;
          }
        }

        // if it is not, then get it from data store
        if (!skip) {

          // construct the form to post
          var theData = {};

          // need to check what type of work item this code is for represents
          if (workItemType == self.TASK_WORK_ITEM_TYPE) {
            theData = {'workItemType' : self.TASK_WORK_ITEM_TYPE, 'workItemCode' : workItemCode};
          }

          if (workItemType == self.PROJECT_WORK_ITEM_TYPE) {
            theData = {'workItemType' : self.PROJECT_WORK_ITEM_TYPE, 'workItemCode' : workItemCode};
          }

          if (workItemType == self.LEAVE_WORK_ITEM_TYPE) {
            theData = {'workItemType' : self.LEAVE_WORK_ITEM_TYPE, 'workItemCode' : workItemCode};
          }

          // go get it
          $http({
            method : 'post',
            url : '/timeSheets/' + self.currentDateUrlString + '/lineItems/',
            data : theData
          }).then(function success(response){
            self.currentTimeSheet.lineItems.push(response.data);
          });
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
    self.addedTasks = [];
    self.projectList = [];
    self.addedProjects = [];
    self.addedLeave = [];

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

    self.removeWorkItemFromList = function(workItemType, workItemCode) {
      if (workItemType == 'Task') {
        
        self.addedTasks.push(workItemCode);
        for(var i = 0; i < self.taskList.length; i++){
          if (self.taskList[i].code == workItemCode){
            self.taskList.splice(i, 1);
            break;
          }
        }
      }

      if(workItemType == 'Project'){

        self.addedProjects.push(workItemCode);
        for(var i = 0; i < self.projectList.length; i++){
          if (self.projectList[i].code == workItemCode){
            self.projectList.splice(i, 1);
            break;
          }
        }
      }

      if (workItemType == 'Leave') {

        self.addedLeave.push(workItemCode);
        for(var i = 0; i < self.leaveList.length; i++){
          if (self.leaveList[i].code == workItemCode){
            self.leaveList.splice(i, 1);
            break;
          }
        }
      }
    }

});