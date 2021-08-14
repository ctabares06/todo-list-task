const knex = require('../database/setup');

module.exports = {
    get() {
        return knex('users').select('id', 'username', 'email');
    },
    getById(id) {
        return knex('users').where({ id }).select('id', 'username', 'email');
    },
    getFullById(id) {
        return knex('users').where({ id }).select('id', 'username', 'email', 'password', 'salt');
    },
    getByNameOrEmail(username, email) {
        return knex('users').where({ username })
            .orWhere({ email }).select('id', 'username', 'email', 'password', 'salt');
    },
    create({ username, email, hash, salt }) {
        return knex('users').insert({
            username,
            email,
            password: hash,
            salt
        })
    },
    update({ username, email, hash, salt, id }) {
        return knex('users').where({ id })
            .insert({
                username,
                email,
                password: hash,
                salt
            })
    }
};