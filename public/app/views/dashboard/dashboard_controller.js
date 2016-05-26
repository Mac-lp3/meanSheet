'use strict';

angular.module('DashboardController', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'views/dashboard/dashboard.html',
    controller: 'DashboardController',
    controllerAs: "dashCtrl"
  });
}])

.controller('DashboardController', ['addWorkItemService', '$rootScope', '$scope', '$http', '$q',
  function(addWorkItemService, $rootScope, $scope, $http, $q) {

    /* used to construct a readable date string */
    const monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "September", "Oct",
        "Nov", "Dec"
    ];

    const self = this;
    self.datePickerInput = '';

    $scope.currentTimeSheet = {};
    $scope.currentDateUrlString = {};
    $scope.readableDate = '';

    self.changeDate = function (valueOrIncrement) {
        
        if (valueOrIncrement) {

            let dd = '';
            let mm = '';
            let yyyy = '';

            if (valueOrIncrement == '1') {

                // increment time sheet week by 1
                // get current date and add 7 days
                let tempDate = new Date($scope.currentTimeSheet.sundayDate);
                tempDate.setDate(tempDate.getDate() + 7);

                // build query string
                dd = tempDate.getDate();
                mm = tempDate.getMonth() + 1; //January is 0!
                yyyy = tempDate.getFullYear();

            } else if (valueOrIncrement == '-1') {

                // decrement time sheet week by 1
                // get current date and subtract 7 days
                let tempDate = new Date($scope.currentTimeSheet.sundayDate);
                tempDate.setDate(tempDate.getDate() - 7);

                // build query string
                dd = tempDate.getDate();
                mm = tempDate.getMonth() + 1; //January is 0!
                yyyy = tempDate.getFullYear();

            } else {

                // read new date from input
                const input = valueOrIncrement + '';
                const parts = input.split('-');

                dd = parts[2];
                mm = parts[1]; //January is 0!
                yyyy = parts[0];
    
            }
            
            $scope.readableDate = monthNames[mm - 1] + ' ' + dd + ' ' + yyyy;
            self.getTimeSheet(yyyy + '-' + mm + '-' + dd);
        }

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

        // addWorkItemService.getModalTaskList(stringQuery, $scope.currentTimeSheet.lineItems).then(
        //   function(d) { $scope.modalTaskList = d; });

        // addWorkItemService.getModalProjectList(stringQuery, $scope.currentTimeSheet.lineItems).then(
        //   function(d) { $scope.modalProjectList = d; });

        let promises = addWorkItemService.populateModal(stringQuery, $scope.currentTimeSheet.lineItems);

        $q.all(promises).then(function (rez) {

            console.log(rez);
            $scope.workItemMap = rez;

        }).catch(function (err) {

            console.log(err);
        });

        $scope.queryString = stringQuery;
    }

    self.addLineItem = function(workItemType, workItemCode){

      if (workItemType) {

        // Check work item is already on the time sheet
        const skip = addWorkItemService.isAlreadyOnTimeSheet($scope.currentTimeSheet.lineItems, workItemType, workItemCode);

        // If not, then add work item
        if (!skip) {

          let formToPost = {};
          let cleanUpFunction = {};

          // Build formToPost and cleanUpFunction based on work item type
          if (workItemType == $rootScope.TASK_WORK_ITEM_TYPE) {

            formToPost = { 'workItemType' : $rootScope.TASK_WORK_ITEM_TYPE, 'workItemCode' : workItemCode };
            cleanUpFunction = addWorkItemService.removeTaskFromModalList;

          }

          if (workItemType == $rootScope.PROJECT_WORK_ITEM_TYPE) {
            formToPost = { 'workItemType' : $rootScope.PROJECT_WORK_ITEM_TYPE, 'workItemCode' : workItemCode};
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

    self.saveTimeSheet = function(action){

        $http({

            method : 'post',
            data : { timeSheet : $scope.currentTimeSheet},
            url : '/timeSheets/' + $scope.currentDateUrlString 

        }).then(function success(response){
            
            $scope.currentDateUrlString = $scope.currentDateUrlString ;
            $scope.currentTimeSheet = response.data;

        });
    }

   	/* build initial date string */
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; //January is 0!
    const year = today.getFullYear();
    $scope.readableDate = monthNames[month - 1] + ' ' + day + ' ' + year;

    /* get today's time sheet */
    self.getTimeSheet(year + '-' + month + '-' + day);

    /* populate work items modal */
    addWorkItemService.getModalProjectList('', $scope.currentTimeSheet.lineItems).then(function(obj){ $scope.modalProjectList = obj;});
    addWorkItemService.getModalTaskList('', $scope.currentTimeSheet.lineItems).then(function(obj){ $scope.modalTaskList = obj;});

}]);