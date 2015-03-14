var express      = require('express');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var logger       = require('morgan');
var path         = require('path');

var http = require('http');

App = express();

var config = require('./config');
var errors = require('./errors');
var model  = require('./model');

App.use(logger('dev'));
App.use(cookieParser());
App.use(bodyParser.urlencoded({ extended: false }));
App.use(bodyParser.json());
require('./routes').configure(App);
App.use(errors.notFound);
App.use(errors.handler);

module.exports = App;
