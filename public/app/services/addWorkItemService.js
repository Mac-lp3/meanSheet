const addWorkItemServices = angular.module('AddWorkItemService', ['ngResource']);

addWorkItemServices.factory('AddWorkItemService', ['$rootScope', '$http',
  function($rootScope, $http) {

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