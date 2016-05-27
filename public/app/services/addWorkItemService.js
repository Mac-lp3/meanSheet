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

    const workItemNameList = [
        $rootScope.TASK_WORK_ITEM_TYPE, 
        $rootScope.PROJECT_WORK_ITEM_TYPE, 
        $rootScope.LEAVE_WORK_ITEM_TYPE
    ];
    
    self.populateModal = function (queryString, currentLineItems) {
        
        let urlPostFix = '';

        // step 1, build a url for each resource.
        
        if (queryString) {
            urlPostFix = '?q=' + queryString;
        }

        let urlToUse = '';

        let promiseList = [];

        for (let i in workItemNameList) {

            urlToUse = '/' + $rootScope.URL_MAPPINGS[workItemNameList[i]] + urlPostFix;
            
            promiseList.push($http({

                method : 'get',
                url : urlToUse

            }).then(function success(response) {

                // check if the time sheet is empty...
                let data = response.data;
                if (typeof currentLineItems !== 'undefined' && currentLineItems.length > 0) {
                    
                    for (let i = 0; i < data.length; ++i) {

                        if (self.isAlreadyOnTimeSheet(currentLineItems, workItemNameList[i], data[i].code)) {

                            data.splice(i, 1);
                        }
                    }
                }

                let tempObject = {};
                tempObject[workItemNameList[i]] = data;
                return tempObject;

            }));
        }
        
        return promiseList;
    };

    self.isAlreadyOnTimeSheet = function(currentLineItems, workItemType, workItemCode) {
      
      var isAlready = false;

      for (var i = 0; i < currentLineItems.length; i++){

          if (currentLineItems[i].workItemType === workItemType) {
              if (currentLineItems[i].workItemCode === workItemCode) {
                  isAlready = true;
                  break;
              }
          }
      }

      return isAlready;

    };

    self.removeItemFromModalList = function(workItemMap, workItemType, workItemCode) {

        for(let i = 0; i < workItemMap[workItemType].length; ++i){

            if (workItemMap[workItemType][i].code == workItemCode){

                workItemMap[workItemType].splice(i, 1);
                break;
            }
        }

        return workItemMap;
    };

    self.removeTaskFromModalList = function(workItemCode) {

        for(var i = 0; i < self.taskList.length; i++){
          if (self.taskList[i].code == workItemCode){
            self.taskList.splice(i, 1);
            break;
          }
        }

        return self.taskList;
    };

    self.removeProjectFromModalList = function(workItemCode) {

        for(var i = 0; i < self.projectList.length; i++){
          if (self.projectList[i].code == workItemCode){
            self.projectList.splice(i, 1);
            break;
          }
        }

        return self.projectList;
    };

}]);