'use strict';

angular.module('addWorkItemService', [])

.service('addWorkItemService', ['$rootScope', '$http',
  function($rootScope, $http) {

    const self = this;
    self.addedTasks = [];
    self.addedProjects = [];
    self.addedLeave = [];
    self.projectList = [];
    self.taskList = [];
    
    /*
     * Get tasks for display in the Tasks tab of the work item modal
     */
    self.getModalTaskList = function (queryString, currentLineItems) {

      let urlToUse = '';

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

          // then for each LineItem...
          for (var i = 0; i < currentLineItems.length; ++i) {
            
            // if it is a project...
            if (currentLineItems[i].workItemType == $rootScope.TASK_WORK_ITEM_TYPE) {

              // search the returned task list...
              for (var j = 0; j < response.data.length; ++j) {
                
                // for a task code match...
                if (response.data[j].code == currentLineItems[i].workItemCode) {

                  // and remove any that are found.
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

    /*
     * Get projects for display in the Projects tab of the work item modal
     */
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

    self.isAlreadyOnTimeSheet = function(currentLineItems, workItemType, workItemCode) {
      
      var isAlready = false;

      for (var i = 0; i < currentLineItems.length; i++){

          if (currentLineItems[i].workItemType === workItemType) {
              if (currentLineItems[i].code == workItemCode) {
                  isAlready = true;
                  break;
              }
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