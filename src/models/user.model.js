const knex = require('../database/setup');
const table = 'users';

module.exports = {
  get: () => knex(table).select('id', 'username', 'email'),
  getById: (id) =>
    knex(table).where({ id }).select('id', 'username', 'email'),
  getFullById: (id) =>
    knex(table)
      .where({ id })
      .select('id', 'username', 'email', 'password', 'salt'),
  getByNameOrEmail: (username, email) =>
    knex(table)
      .where({ username })
      .orWhere({ email })
      .select('id', 'username', 'email', 'password', 'salt'),
  create: ({ username, email, hash, salt }) =>
    knex(table).insert({
      username,
      email,
      password: hash,
      salt,
    }),
  update: ({ username, email, hash, salt, id }) =>
    knex(table).where({ id }).insert({
      username,
      email,
      password: hash,
      salt,
    }),
};
