var config   = require('../config');
var mongoose = require('mongoose');

mongoose.connect(config.database.connection);

model = mongoose.connection;
model.on('error', console.error.bind(console, 'connection error:'));
model.once('open', function() {
  console.log('Successfully connected to database');
});

module.exports = model;
