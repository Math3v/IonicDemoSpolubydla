angular.module('starter.controllers', [])

.controller('ChatsCtrl', function($scope, Tasks, Members, getColorService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var tasksPromise = Tasks.all();
  tasksPromise.then(function success(tasks) {
    $scope.tasks = tasks;
  }, function error(e) {
    console.log("Error loading tasks ", e);
  })

  var membersPromise = Members.all();
  membersPromise.then(function success(members) {
    $scope.members = [];
    for(var i = 0; i < members.length; i++) {
      var member = members[i];
      $scope.members[member.id] = member;
    }
    getColorService.set(members);
  }, function error(e) {
    console.log("Error loading members ", e);
  })

  $scope.getColor = function(memberId) {
    if(memberId == undefined || $scope.members == undefined) {
      return;
    }
    return getColorService.get(memberId);
  }

  $scope.toggleDone = function(task) {
    task.done = task.done ? false : true;
  }
})

.controller('MembersCtrl', function($scope, Members, getColorService) {
  var membersPromise = Members.all();
  membersPromise.then(function success(members) {
    $scope.members = members;
    getColorService.set(members);
  }, function error(e) {
    console.log("Error loading members ", e);
  })

  $scope.getColor = function(memberId) {
    if(memberId == undefined || $scope.members == undefined) {
      return;
    }
    return getColorService.get(memberId);
  }
});
