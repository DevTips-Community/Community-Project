// @see http://www.restapitutorial.com/lessons/httpmethods.html
var express = require('express');
var router  = express.Router();
var Task    = require('../model/Task');

var singleSource = function(callback) {
  return function(req, res, next) {
    Task.findOne({ _id: req.params.id }, function(error, task) {
      if(error) return next(error);
      if(!task) {
        res.status(404);
        return next({
          name: 'NotFoundError',
          message: 'Task not found'
        });
      }
      res.status(200);
      callback(task, req, res, next);
    });
  }
}

router.get('/', function(req, res, next) {
  Task.apiQuery(req.query, function(error, tasks) {
    if(error) return next(error);
    res.status(200).json({
      message: 'Found tasks',
      tasks: tasks
    });
  });
});

router.get('/:id', singleSource(function(task, req, res, next) {
  res.json({
    message: 'Found task',
    task: task
  });
}));

router.put('/:id', singleSource(function(task, req, res, next) {
  try {
    task.applyChanges(JSON.parse(req.body.changes), function(error, task) {
      if(error) return next(error);
      res.status(200);
      res.json({
        message: 'Successfully updated task',
        task: task
      });
    });
  } catch(error) {
    res.status(400);
    next(error);
  }
}));

router.post('/', function(req, res, next) {
  var task = req.body.task;
  if(!task) {
    res.status(400);
    return next({
      name: 'BadRequestError',
      message: 'A task json string is required'
    });
  }
  try {
    task = JSON.parse(task);
    task = new Task(task);
    task.save(function(error, task) {
      if(error) return next(error);
      res.status(201);
      res.json({
        message: 'Successfully saved task',
        task: task
      });
    });
  } catch(error) {
    res.status(400);
    next(error);
  }
});

router.delete('/:id', singleSource(function(task, req, res, next) {
  task.remove();
  res.json({ message: 'Deleted task' });
}));

module.exports = router;
