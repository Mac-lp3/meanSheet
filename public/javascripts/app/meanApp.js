var meanApp = angular.module('meanApp', []);

/*
 *  Service that helps query and maintain a list of task and project work items for the add work item modal
 */
meanApp.service('addWorkItemService', ['$rootScope', '$http', function($rootScope, $http) {

    var self = this;
    self.addedTasks = [];
    self.addedProjects = [];
    self.addedLeave = [];
    self.projectList = [];
    self.taskList = [];

    self.getModalTaskList = function (queryString, currentLineItems) {

      var urlToUse = '';

      if (queryString) {

        // if a query is provided, build the search url
        urlToUse = '/tasks?q=' + queryString;

      } else {

        // use the basic get url otherwise
        urlToUse = '/tasks';
      }

      return $http({
        method : 'get',
        url : urlToUse
      }).then(function success(response){

        // check if the time sheet is empty...
        if (currentLineItems) {

          // for each LineItem...
          for (var i = 0; i < currentLineItems.length; i++) {
            
            // if it is a project...
            if (currentLineItems[i].workItemType == $rootScope.TASK_WORK_ITEM_TYPE) {

              // search the returned project list...
              for (var j = 0; j < response.data.length; j++) {
                
                // for a project code match...
                if (response.data[j].code == currentLineItems[i].workItemCode) {

                  // and remove any that you find.
                  response.data.splice(j, 1);
                }
              }
            }
          }
        }

        // update the current list and return
        self.taskList = response.data;
        return self.taskList;
      });
    }

    self.getModalProjectList = function (queryString, currentLineItems) {

      var urlToUse = '';

      if (queryString) {

        // if a query is provided, build the search url
        urlToUse = '/projects?q=' + queryString;

      } else {

        // use the basic get url otherwise
        urlToUse = '/projects';
      }

      return $http({
        method : 'get',
        url : urlToUse
      }).then(function success(response){

        // check if the time sheet is empty...
        if (currentLineItems) {

          // for each LineItem...
          for (var i = 0; i < currentLineItems.length; i++) {
            
            // if it is a project...
            if (currentLineItems[i].workItemType == $rootScope.PROJECT_WORK_ITEM_TYPE) {

              // search the returned project list...
              for (var j = 0; j < response.data.length; j++) {
                
                // for a project code match...
                if (response.data[j].code == currentLineItems[i].workItemCode) {

                  // and remove any that you find.
                  response.data.splice(j, 1);
                }
              }
            }
          }
        }

        // update the current list and return
        self.projectList = response.data;
        return self.projectList;
      });

    }

    self.isAlreadyOnTimeSheet = function(timeSheet, workItemType, workItemCode) {
      
      var isAlready = false;

      for (var i = 0; i < timeSheet.lineItems.length; i++){
          if (timeSheet.lineItems[i].code == workItemCode) {
            isAlready = true;
            break;
          }
      }

      return isAlready;
    }

    self.removeTaskFromModalList = function(workItemCode) {

        for(var i = 0; i < self.taskList.length; i++){
          if (self.taskList[i].code == workItemCode){
            self.taskList.splice(i, 1);
            break;
          }
        }

        return self.taskList;
    }

    self.removeProjectFromModalList = function(workItemCode) {

        for(var i = 0; i < self.projectList.length; i++){
          if (self.projectList[i].code == workItemCode){
            self.projectList.splice(i, 1);
            break;
          }
        }

        return self.projectList;
    }
}]);

/*
 * Contrller for all changes that occur on the dashboard.
 */
meanApp.controller('DashboardController', ['addWorkItemService', '$rootScope', '$scope', '$http', 
  function(addWorkItemService, $rootScope, $scope, $http) {

    /* PUT AS LITTLE AS POSSIBLE IN ROOT SCOPE */
    $rootScope.TASK_WORK_ITEM_TYPE = 'Task';
    $rootScope.PROJECT_WORK_ITEM_TYPE = 'Project';
    $rootScope.LEAVE_WORK_ITEM_TYPE = 'Leave';

  	/* used to construct a readable date string */
  	const monthNames = [
    		"Jan", "Feb", "Mar",
    		"Apr", "May", "Jun", "Jul",
    		"Aug", "September", "Oct",
    		"Nov", "Dec"
  	];

    $scope.currentTimeSheet = {};
    $scope.currentDateUrlString = {};
    //$scope.queryString = '';
    
  	var self = this;
    self.datePickerInput = '';

   	/* update variables on date change action */
   	self.dateChange = function () {

   		// build query param from new date
   		var parts = self.datePickerInput.split('-');

      dd = parts[2];
      mm = parts[1]-1; //January is 0!
      yyyy = parts[0];
    
      /* update readable date and get the new time sheet */
      $scope.readableDate = monthNames[mm] + ' ' + dd + ' ' + yyyy
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
        $scope.currentDateUrlString = dateString;
     		$scope.currentTimeSheet = response.data;
     	});
   	};

    self.searchWorkItems = function (stringQuery) {
      addWorkItemService.getModalTaskList(stringQuery, $scope.currentTimeSheet.lineItems).then(
        function(d) { $scope.modalTaskList = d; });
      addWorkItemService.getModalProjectList(stringQuery, $scope.currentTimeSheet.lineItems).then(
        function(d) { $scope.modalProjectList = d; });
    }

    self.addLineItem = function(workItemType, workItemCode){

      if (workItemType) {

        // Check if it's already on the time sheet
        var skip = addWorkItemService.isAlreadyOnTimeSheet($scope.currentTimeSheet, workItemType, workItemCode);

        // If not, then work item data
        if (!skip) {

          var formToPost = {};
          var cleanUpFunction = {};

          // Build formToPost and cleanUpFunction based on work item type
          if (workItemType == $rootScope.TASK_WORK_ITEM_TYPE) {
            formToPost = {'workItemType' : $rootScope.TASK_WORK_ITEM_TYPE, 'workItemCode' : workItemCode};
            cleanUpFunction = addWorkItemService.removeTaskFromModalList;
          }

          if (workItemType == $rootScope.PROJECT_WORK_ITEM_TYPE) {
            formToPost = {'workItemType' : $rootScope.PROJECT_WORK_ITEM_TYPE, 'workItemCode' : workItemCode};
            cleanUpFunction = addWorkItemService.removeProjectFromModalList;
          }

          if (workItemType == $rootScope.LEAVE_WORK_ITEM_TYPE) {
            formToPost = {'workItemType' : $rootScope.LEAVE_WORK_ITEM_TYPE, 'workItemCode' : workItemCode};
          }

          // post it
          $http({
            method : 'post',
            url : '/timeSheets/' + $scope.currentDateUrlString + '/lineItems/',
            data : formToPost
          }).then(function success(response){
            
            // add the work item to the time sheet
            $scope.currentTimeSheet.lineItems.push(response.data);

            // remove the work item from the modal
            cleanUpFunction(workItemCode);
          });
        } else {
          // TODO
          // this means it is in modal AND on time sheet. need to remove...
        }
      }
    }

    self.removeLineItem = function(workItemType, workItemCode) {

      // check what kind of work item we are looking for
      if (workItemType == $rootScope.TASK_WORK_ITEM_TYPE) {

        // look through each line item..
        for (var i = 0; i < $scope.currentTimeSheet.lineItems.length; i++) {

          // if it is a task...
          if ($scope.currentTimeSheet.lineItems[i].workItemType == $rootScope.TASK_WORK_ITEM_TYPE) {

            // and if it has the same code...
            if ($scope.currentTimeSheet.lineItems[i].workItemCode == workItemCode) {

              // remove it...
              $scope.currentTimeSheet.lineItems.splice(i, 1);

              // refresh task modal list...
              addWorkItemService.getModalTaskList($scope.queryString, $scope.currentTimeSheet.lineItems).then(
                function(d) { $scope.modalTaskList = d; });

              // and break.
              break;
            }
          }
        }
      }
      if (workItemType == $rootScope.PROJECT_WORK_ITEM_TYPE) {

        // look through each line item..
        for (var i = 0; i < $scope.currentTimeSheet.lineItems.length; i++) {

          // if it is a project...
          if ($scope.currentTimeSheet.lineItems[i].workItemType == $rootScope.PROJECT_WORK_ITEM_TYPE) {

            // and if it has the same code...
            if ($scope.currentTimeSheet.lineItems[i].workItemCode == workItemCode) {

              // remove it...
              $scope.currentTimeSheet.lineItems.splice(i, 1);

              // refresh task modal list...
              addWorkItemService.getModalProjectList($scope.queryString, $scope.currentTimeSheet.lineItems).then(
                function(d) { $scope.modalProjectList = d; });

              // and break.
              break;
            }
          }
        }
      }

    }

   	/* build initial date string */
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    $scope.readableDate = monthNames[mm - 1] + ' ' + dd + ' ' + yyyy;

    /* get today's time sheet */
    self.getTimeSheet(yyyy + '-' + mm + '-' + dd);

    /* populate work items modal */
    addWorkItemService.getModalProjectList('', $scope.currentTimeSheet.lineItems).then(function(obj){ $scope.modalProjectList = obj;});
    addWorkItemService.getModalTaskList('', $scope.currentTimeSheet.lineItems).then(function(obj){ $scope.modalTaskList = obj;});
   
}]);