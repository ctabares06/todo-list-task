const taskRepository = require('../repos/task.repository');
const { checkTodoBelongs } = require('../services/todo.service');

const getTasksService = async () => await taskRepository.getTasks();

const createTaskService = async ({ name, todo_id }) => {
    try {
        await taskRepository.createTask({name, todo_id});
    } catch (error) {
        return Promise.reject({ error, code : 500 });
    }
}

const updateTaskService = async (_token, { id, name }) => {
    try {
        const [task] = await taskRepository.getTaskById(id);
        if (!checkTodoBelongs(_token, task.todo_id)) {
            return Promise.reject({
                message: "todo belongs to other user",
            });
        }

        const sendName = name !== "" ? name : task.name;

        return await taskRepository.updateTask({
            name: sendName,
        });

    } catch (error) {
        return Promise.reject(error);
    }
}

const deleteTaskService = async (_token, id) => {
    try {
        const [task] = await taskRepository(id);
        if (!checkTodoBelongs(_token, task.todo_id)) {
            return Promise.reject({
                message: "todo belongs to other user",
            });
        }

        return await taskRepository.deleteTask(id);

    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = {
    getTasksService,
    updateTaskService,
    createTaskService,
    deleteTaskService,
}