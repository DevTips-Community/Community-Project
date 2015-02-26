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
