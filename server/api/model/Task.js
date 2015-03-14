var mongoose = require('mongoose');
var merge    = require('object-merge');

var schema = new mongoose.Schema({
  done: {
    type: Boolean,
    default: false
  },
  verb: {
    type: String,
    required: true
  },
  noun: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    default: 1
  },
  notes: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  lastUpdate: {
    type: Date,
    default: Date.now
  }
});

schema.methods.applyChanges = function(changes, callback) {
  var Task = mongoose.model('Task');
  // TODO: better method?
  if(changes.__v || changes.created) {
    return callback({
      name: 'BadRequestError',
      message: 'Some fields cannot be changed, try removing "__v" or "created"'
    });
  }
  Task.findByIdAndUpdate(this._id, { $set: changes }, callback);
}

schema.plugin(require('mongoose-hidden')({ defaultHidden: { __v: true } }));
schema.plugin(require('mongoose-api-query'));

schema.set('collection', 'tasks');
module.exports = mongoose.model('Task', schema);
