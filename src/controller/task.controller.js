const taskService = require('../services/task.service');

module.exports = {
	getTasks: (_, res) => taskService.getTasksService()
		.then(tasks => res.status(200).json(tasks))
		.catch(err => res.status(500).json(err))
	,
	createTask: ({ body: { name, todo_id } }, res) =>
		taskService.createTaskService({
			name,
			todo_id
		})
			.then(() => res.status(200).json())
			.catch(err => res.status(500).json(err))
	,
	updateTask: ({ body: { name, id }, headers }, res) =>
		taskService.updateTaskService(headers['x-access-token'], {
			name,
			id,
		})
			.then(() => res.status(200).json())
			.catch(err => res.status(500).json(err))
	,
	deleteTask: ({ params: { id }, headers }, res) =>
		taskService.deleteTaskService(headers['x-access-token'], id)
			.then(res => res.status(200).json())
			.catch(err => res.status(500).json(err))
	,
}