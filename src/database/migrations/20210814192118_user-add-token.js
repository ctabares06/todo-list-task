
exports.up = async function(knex) {
  const exists = await knex.schema.hasColumn('users', 'token');

  if (!exists) {
    await knex.schema.alterTable('users', table => {
      table.string('token');
    })
  }
};

exports.down = async function(knex) {
  const exists = await knex.schema.hasColumn('users', 'token');

  if (exists) {
    await knex.schema.alterTable('users', table => {
      table.dropColumn('token');
    })
  }
};
