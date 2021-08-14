const { generateHash } = require('../../services/user.service');
const faker = require('faker/locale/en');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('tasks').del(),
    knex('todos').del(),
    knex('users').del()
  ]).then(() => {
    const { hash, salt } = generateHash("Passw0rd!");
    return knex('users').insert([
      {
        email: faker.internet.email(),
        username: "ctabares",
        password: hash,
        salt: salt
      },
    ], ["id"]);
  }).then(([user]) => {
    return knex('todos').insert([
      {
        name: faker.lorem.words(),
        description: faker.lorem.words(),
        user_id: user.id,
      }
    ], ["id"])
  }).then(([todo]) => {
    return knex('tasks').insert([
      {
        name: faker.lorem.words(),
        todo_id: todo.id,
      },
      {
        name: faker.lorem.words(),
        todo_id: todo.id,
      },
      {
        name: faker.lorem.words(),
        todo_id: todo.id,
      },
    ])
  })
};
