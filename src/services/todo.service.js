const todoRepository = require('../repos/todo.repository');
const { decodeToken } = require('./auth.service');

const getAllTodos = async () => await todoRepository.getTodos();

const createTodo = async (_token, { name, description }) => {
    const user_id = decodeToken(_token).user;
    return await todoRepository.createTodo({
        name,
        description,
        user_id
    })
}

const checkTodoBelongs = async (_token, id) => {
    const user_id = decodeToken(_token).user;
    const { id: todo_user_id } = (await todoRepository.getTodoById(id))[0];

    return todo_user_id === user_id;
}

const editTodo = async (_token, { id, name, description }) => {
    if (!checkTodoBelongs(_token)) {
        return Promise.reject({
            message: "todo belongs to other user",
        });
    } 

    const todo_name = (await todoRepository.getTodoById(id))[0].name;
    const sendName = name !== "" ? name : todo_name;

    return await todoRepository.updateTodo({
        name: sendName,
        description,
        id
    })
}

const removeTodo = async (_token, id) => {
    const user_id = decodeToken(_token).user;
    const { user_id: todo_user_id } = (await todoRepository.getTodoById(id))[0];
    if (todo_user_id !== user_id) {
        return Promise.reject({
            message: "todo belongs to other user",
        });
    } 

    return await todoRepository.deleteTodo(id);
}

module.exports = {
    getAllTodos,
    checkTodoBelongs,
    createTodo,
    editTodo,
    removeTodo,
}