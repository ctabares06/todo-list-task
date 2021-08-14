exports.up = async function(knex) {
    const exists = await knex.schema.hasTable('users');
    if (!exists) {
        await knex.schema.createTable('users', table => {
            table.increments();
            table.string('email').notNullable().unique({ indexName: 'table_unique_email' });
            table.string('username').notNullable();
            table.string('password').notNullable();
            table.string('salt').notNullable();
        })
    }
};

exports.down = async function(knex) {
  const exists = await knex.schema.hasTable('users');
  if (exists) {
      await knex.schema.dropTable('users');
  }
};
