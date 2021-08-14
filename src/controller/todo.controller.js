const todoService = require('../services/todo.service');

module.exports = {
    getTodos: async (req, res) => {
        const response = await todoService.getAllTodos();
        res.status(200).json(response);
    },
    createTodo: async (req, res) => {
        const _token = req.headers['x-access-token'];
        await todoService.createTodo(_token, req.body);
        res.status(200).json();
    },
    updateTodo: async (req, res) => {
        try {
            const _token = req.headers['x-access-token'];
            const { id } = req.params;
            await todoService.editTodo(_token, { ...req.body, id });
            res.status(200).json();
        } catch (error) {
            res.status(401).json(error);
        }
    },
    deleteTodo: async (req, res) => {
        try {
            const _token = req.headers['x-access-token'];
            const { id } = req.params;
            await todoService.removeTodo(_token, id);
            res.status(200).json();
        } catch (error) {
            res.status(401).json(error);
        }
    }
}