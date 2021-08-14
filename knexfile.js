// Update with your config settings.
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '.env'),
});

module.exports = {
    client: 'pg',
    connection: {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/src/database/migrations',
    },
    seeds : {
      directory: __dirname + '/src/database/seeds',
    }
};
