var myApp      = require('./app');
var Task       = require('../lib/task');
var TaskEntity = require('../lib/entity');

myApp.controller('ListController', ['$scope', function($scope) {
  $scope.taskEntities = [];

  // This should be imported from the model
  var tasks = [
    new Task('write', 'paper'),
    new Task('do', 'homework'),
    new Task('finish', 'project'),
    new Task('dance', 'tomorrow'),
  ];

  for (var index in tasks) {
    var task = tasks[index];
    $scope.taskEntities.push(new TaskEntity(task));
  }

  $scope.newTask = function() {
    var entity = new TaskEntity();
    entity.editable = true;
    $scope.taskEntities.unshift(entity);
  };
}]);
