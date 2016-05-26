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

    const workItemMap = {};
    let propName = '' + $rootScope.TASK_WORK_ITEM_TYPE;
    workItemMap[propName] = [];
    propName = '' + $rootScope.PROJECT_WORK_ITEM_TYPE;
    workItemMap[propName] = [];
    propName = '' + $rootScope.LEAVE_WORK_ITEM_TYPE;
    workItemMap[propName] = [];

    self.populateModal = function (queryString, currentLineItems) {
        
        let urlPostFix = '';

        // step 1, build a url for each resource.
        
        if (queryString) {
            urlPostFix = '?q=' + queryString;
        }

        let urlToUse = '';

        let promiseList = [];

        for (let property in workItemMap) {

            if (workItemMap.hasOwnProperty(property)) {

                urlToUse = '/' + $rootScope.URL_MAPPINGS[property] + urlPostFix;
                
                promiseList.push($http({

                    method : 'get',
                    url : urlToUse

                }).then(function success(response) {

                    // check if the time sheet is empty...
                    if (typeof currentLineItems !== 'undefined' && currentLineItems.length > 0) {
                        
                        for (let i = 0; i < response.data.length; ++i) {

                            if (self.isAlreadyOnTimeSheet(currentLineItems, property, response.data[i].code)) {

                                response.data.splice(i, 1);
                            }

                        }

                        // workItemMap[property] = response.data;
                    }

                    return { property : response.data};

                }));
            }
        }
        
        return promiseList;
    };
    
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
     * Gets a list of projects for display in the Projects tab of the work item modal.
     * Preforms a search if a query string is provided. Will remove any projects that 
     * are already on the time sheet.
     */
    self.getModalProjectList = function (queryString, currentLineItems) {

      let urlToUse = '';

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

        // if the time sheet isn't empty...
        if (currentLineItems) {

          // then for each time sheet LineItem...
          for (let i = 0; i < currentLineItems.length; ++i) {
            
            // see if it is a project...
            if (currentLineItems[i].workItemType == $rootScope.PROJECT_WORK_ITEM_TYPE) {

              // if it is, iterate over the returned project list...
              for (let j = 0; j < response.data.length; ++j) {
                
                // for a project code match...
                if (response.data[j].code == currentLineItems[i].workItemCode) {

                  // and remove it from the modal list.
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

    self.removeItemFromModalList = function(workItemType, workItemCode) {

        for(let i = 0; i < self.taskList.length; ++i){

            if (self.taskList[i].workItemType == workItemType) {

                if (self.taskList[i].code == workItemCode){

                    self.taskList.splice(i, 1);
                    break;
                }
            }
        }

        return self.taskList;
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