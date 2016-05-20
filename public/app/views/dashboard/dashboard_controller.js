'use strict';

angular.module('DashboardController', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'views/dashboard/dashboard.html',
    controller: 'DashboardController',
    controllerAs: "dashCtrl"
  });
}])

.controller('DashboardController', ['addWorkItemService', '$rootScope', '$scope', '$http', 
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
    
    const self = this;
    self.datePickerInput = '';

   	/* update variables on date change action */
   	self.dateChange = function () {

        // TODO refactor these three methods into one that takes a param

        // build query param from new date
        const parts = self.datePickerInput.split('-');

        let dd = parts[2];
        let mm = parts[1]-1; //January is 0!
        let yyyy = parts[0];
    
        /* update readable date and get the new time sheet */
        $scope.readableDate = monthNames[mm] + ' ' + dd + ' ' + yyyy
        self.getTimeSheet(yyyy + '-' + mm + '-' + dd);
        self.datePickerInput = '';
    };

    self.getPreviousTimeSheet = function () {

    	// TODO refactor these three methods into one that takes a param

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

        // TODO refactor these three methods into one that takes a param

        // get current date and add 7 days
        var tempDate = new Date(self.currentTimeSheet.sundayDate);
        tempDate.setDate(tempDate.getDate() + 7);

        // build query string
        const dd = tempDate.getDate();
        const mm = tempDate.getMonth()+1; //January is 0!
        const yyyy = tempDate.getFullYear()

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
      $scope.queryString = stringQuery;
    }

    self.addLineItem = function(workItemType, workItemCode){

      if (workItemType) {

        // Check if it's already on the time sheet
        const skip = addWorkItemService.isAlreadyOnTimeSheet($scope.currentTimeSheet, workItemType, workItemCode);

        // If not, then work item data
        if (!skip) {

          let formToPost = {};
          let cleanUpFunction = {};

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

    self.postTimeSheet = function(){
      $http({
        method : 'post',
        data : {timeSheet : $scope.currentTimeSheet},
        url : '/timeSheets/' + $scope.currentDateUrlString 
      }).then(function success(response){
        $scope.currentDateUrlString = $scope.currentDateUrlString ;
        $scope.currentTimeSheet = response.data;
      });
    }

   	/* build initial date string */
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth()+1; //January is 0!
    const yyyy = today.getFullYear();
    $scope.readableDate = monthNames[mm - 1] + ' ' + dd + ' ' + yyyy;

    /* get today's time sheet */
    self.getTimeSheet(yyyy + '-' + mm + '-' + dd);

    /* populate work items modal */
    addWorkItemService.getModalProjectList('', $scope.currentTimeSheet.lineItems).then(function(obj){ $scope.modalProjectList = obj;});
    addWorkItemService.getModalTaskList('', $scope.currentTimeSheet.lineItems).then(function(obj){ $scope.modalTaskList = obj;});

}]);