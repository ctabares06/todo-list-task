const { Router } = require('express');
const UserController = require('../controller/users.controller');
const TodoController = require('../controller/todo.controller');
const TaskController = require('../controller/task.controller');
const { attempLogin } = require('../middlewares/auth.middleware');
const router = Router();

// USERS
router.get('/users', attempLogin, UserController.getUsers);
router.get('/users/:id', attempLogin, UserController.getUserById);
router.post('/users', attempLogin, UserController.createUser);
router.put('/users/:id', attempLogin, UserController.updateUserById);

// TODOS
router.get('/todos', attempLogin, TodoController.getTodos);
router.post('/todos', attempLogin, TodoController.createTodo);
router.put('/todo/:id', attempLogin, TodoController.updateTodo);
router.delete('/todo/:id', attempLogin, TodoController.deleteTodo);

// TASKS
router.get('/tasks', attempLogin, TaskController.getTasks);



module.exports = router;