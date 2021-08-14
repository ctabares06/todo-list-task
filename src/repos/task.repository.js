const Task = require('../models/task.model');

module.exports = {
    async getTasks() {
        return await Task.get()
    },
    async createTask(dataSet) {
        return await Task.create(dataSet);
    },
    async updateTask(dataSet) {
        return await Task.update(dataSet);
    },
    async deleteTask(id) {
        return await Task.delete(id);
    },
    async getTasksByTodoId(id) {
        return await Task.getTodoTasks(id);
    },
    async getTaskById(id) {
        return await Task.getById(id);
    }
}