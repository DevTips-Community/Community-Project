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
