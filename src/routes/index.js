const { Router } = require('express');
const authController = require('../controller/auth.controller');
const UserController = require('../controller/users.controller');
const TodoController = require('../controller/todo.controller');
const TaskController = require('../controller/task.controller');
const { checkToken } = require('../middlewares/auth.middleware');
const router = Router();

// USERS
router.get('/users', checkToken, UserController.getUsers);
router.get('/users/:id', checkToken, UserController.getUserById);
router.post('/users', UserController.createUser);
router.put('/users/:id', checkToken, UserController.updateUserById);

// AUTH
router.post('/auth', authController.userLogin);

// TODOS
router.get('/todos', checkToken, TodoController.getTodos);
router.post('/todos', checkToken, TodoController.createTodo);
router.put('/todo/:id', checkToken, TodoController.updateTodo);
router.delete('/todo/:id', checkToken, TodoController.deleteTodo);

// TASKS
router.get('/tasks', checkToken, TaskController.getTasks);



module.exports = router;