const express = require('express');
const router = express.Router();
const taskService = require('./service');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(req, res, next) {
  const data = taskService.getTasks();
  console.log('getting all tasks');
  if (data) {
    res.json(data);
  } else {
    res.sendStatus(404)
  }
});

router.get('/:id', function(req, res, next) {
  const { id = '' } = req.params;
  const task = taskService.fetchTask(id);
  if (task) {
    res.json(task);
  } else {
    res.status(404);
    res.json({
      "status": "ERROR",
      "message": "Task not found"
    });
  }
});

router.post('/', function(req, res, next) {
  console.log('request: ', req.body);
  const { task } = req.body;
  const before = taskService.getTasks().tasks.length;
  taskService.addTask(task);
  const after = taskService.getTasks();
  if (after.tasks.length > before) {
    res.json(after);
  } else {
    res.sendStatus(403);
  }
});

router.put('/:id', function(req, res, next) {
  const { id = '' } = req.params;
  const { task } = req.body;
  const updated = taskService.updateTask(id, task);
  if (updated) {
    const data = taskService.getTasks();
    res.json(data);
  } else {
    res.sendStatus(403);
  }
});

router.delete('/:id', function(req, res, next) {
  const { id = '' } = req.params;
  const deleted = taskService.deleteTask(id);
  if (deleted) {
    const data = taskService.getTasks();
    res.json(data);
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
