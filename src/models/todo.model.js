const knex = require('../database/setup');

module.exports = {
    create({ name, description, user_id }) {
        return knex('todos').insert({
            name,
            description,
            user_id
        })
    },
    update({ id, name, description }){
        return knex('todos').where({ id }).update({
            name,
            description
        });
    },
    delete(id) {
        return knex('todos').where({ id }).del();
    },
    getById(id) {
        return knex('todos').where("todos.id", id)
            .select('name', 'description', 'username')
            .innerJoin('users', 'todos.user_id', 'users.id');
    },
    get() {
        return knex('todos').select('name', 'description', 'username')
            .innerJoin('users', 'todos.user_id', 'users.id');
    }
}