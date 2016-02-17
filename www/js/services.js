angular.module('starter.services', [])

.factory('Tasks', function(apiUrl, $http, $q) {
  var deferred = $q.defer();

  $http({
    method: 'GET',
    url:    apiUrl+'/groups/449/tasks.json'
  }).then(function success(response) {
    deferred.resolve(response.data);
  }, function error(response) {
    deferred.reject(response);
  });

  return {
    all: function() {
      return deferred.promise;
    }
  };
})

.factory('Members', function(apiUrl, $http, $q){
  var deferred_all = $q.defer();
  var deferred_mem = $q.defer();

  $http({
    method: 'GET',
    url:    apiUrl+'/groups/449/members.json'
  }).then(function success(response) {
    deferred_all.resolve(response.data);
    deferred_mem.resolve(response.data);
  }, function error(response) {
    deferred_all.reject(response);
    deferred_mem.reject(response);
  });

  return {
    all: function() {
      return deferred_all.promise;
    },
    get: function() {
      return deferred_mem.promise;
    }
  };
})

.factory('getColorService', function(){
  var members = [];

  function setMembers(pMembers) {
    for(var i = 0; i < pMembers.length; i++) {
      var member = pMembers[i];
      members[member.id] = member;
    }
  }

  function getColor(memberId) {
    if(members.length == 0) {
      return;
    }
    switch(members[memberId].color_id) {
      case 0:
        return "royal";
        break;
      case 1:
        return "positive";
        break;
      case 4:
        return "calm";
        break;
      case 6:
        return "balanced";
        break;
    }
  }

  return {
    set: setMembers,
    get: getColor
  };
})