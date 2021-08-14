const Todo = require('../models/todo.model');

module.exports = {
    async getTodos() {
        return await Todo.get();
    },
    async getTodoById(id) {
        return await Todo.getById(id);
    },
    async createTodo(todoData) {
        return await Todo.create(todoData);
    },
    async updateTodo(todoData) {
        return await Todo.update(todoData);
    },
    async removeTodo(id) {
        return await Todo.remove(id);
    }
}