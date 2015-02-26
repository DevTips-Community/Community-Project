(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./utils');
require('./angular');

},{"./angular":5,"./utils":8}],2:[function(require,module,exports){
var myApp = angular.module('myApp', [
  'ngTouch'
]);
module.exports = myApp;

},{}],3:[function(require,module,exports){
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

},{"../lib/entity":6,"../lib/task":7,"./app":2}],4:[function(require,module,exports){
var myApp = require('./app');

},{"./app":2}],5:[function(require,module,exports){
require('./filters');
require('./controls');

},{"./controls":3,"./filters":4}],6:[function(require,module,exports){
var Task = require('./task');

var TaskEntity = function(task) {
  var entity = this;

  this.task = task;
  if(!task) this.task = new Task();

  this.editable = false;
  
  this.wait = false;
  setInterval(function() { entity.wait = false; }, 1000);
};

TaskEntity.prototype.edit = function() {
  if(!this.editable && !this.wait) this.editable = true;
};

TaskEntity.prototype.save = function(where) {
  if(this.editable && !this.wait) {
    if(!this.task.validate()) return this.remove(where, true);

    this.editable = false;
    this.wait = true;
  }
};

TaskEntity.prototype.remove = function(where, force) {
  if(!this.editable || force) {
    var index = where.indexOf(this);
    where.remove(index);
  }
};

module.exports = TaskEntity;

},{"./task":7}],7:[function(require,module,exports){
var Task = function(verb, noun) {
  this.action = {
    verb: verb,
    noun: noun
  };

  this.priority = 0;
  this.notes = null;
};

Task.prototype.validate = function() {
  if(!this.action.verb) return false;
  if(!this.action.noun) return false;
  return true;
};

module.exports = Task;

},{}],8:[function(require,module,exports){
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

},{}]},{},[1]);
