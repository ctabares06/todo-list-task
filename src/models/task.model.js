const knex = require('../database/setup');

module.exports = {
    create({ name, todo_id }) {
        return knex('tasks').insert({
            name,
            todo_id,
        })
    },
    get() {
        return knex('tasks')
            .select('id','name','todo_id','status');
    },
    update({ id, name }) {
        return knex('tasks')
            .where({id})
            .update({
                name,
            });
    },
    delete(id) {
        return knex('tasks')
            .where({id})
            .del();
    },
    getTodoTasks(id) {
        return knex('tasks')
            .where('todo_id', id)
            .select('id', 'name', 'todo_id', 'status');
    },
    getById(id) {
        return knex('tasks')
            .where({id})
            .select('id', 'name', 'todo_id', 'status');
    }
}