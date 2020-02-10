const path = require('path');
const fs = require('fs');
const uuid = require('uuid/v1');
const DATABASE = path.resolve(__dirname, 'db.json');

const getTasks = () => {
  try {
    const tasksStream = fs.readFileSync(DATABASE);
    const tasks = JSON.parse(tasksStream);
    return tasks;
  } catch(err) {
    console.log('Error reading tasks: ', err);
    return;
  }
}

const fetchTask = (id) => {
  try {
    const { tasks } = getTasks();
    const match = tasks.find((task) => task.id === id);
    return match;
  } catch(err) {
    console.log('Error fetching the task', err);
  }
}

const addTask = (task) => {
  try {
    const { tasks } = getTasks();
    const obj = { ...task, id: uuid(), created_at: Date.now() };
    const arr = [ ...tasks, obj ];
    const data = JSON.stringify({ "tasks": arr });
    fs.writeFileSync(DATABASE, data);
  } catch(err) {
    console.log('Error saving tasks: ', err);
    return;
  }
}

const updateTask = (id, _task) => {
  try {
    const { tasks } = getTasks();
    let index;
    const toUpdate = tasks.find((task, idx) => {
      index = idx;
      return task.id === id
    });
    if (typeof toUpdate !== 'undefined') {
      const updated = { ...toUpdate, ..._task };
      tasks.splice(index, 1, updated);
      const data = JSON.stringify({ "tasks": tasks });
      fs.writeFileSync(DATABASE, data);
      return true;
    }
  } catch(err) {
    console.log('Error updating task: ', err);
    return;
  }
}

const deleteTask = (id) => {
  try {
    const { tasks } = getTasks();
    const arr = tasks.filter((task, idx) => task.id !== id);
    const data = JSON.stringify({ "tasks": arr });
    fs.writeFileSync(DATABASE, data);
    return true;
  } catch(err) {
    console.log('Error deleting task: ', err);
    return;
  }
}

module.exports = {
  getTasks, fetchTask, addTask, updateTask, deleteTask
}