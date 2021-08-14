exports.up = async function(knex) {
    const exists = await knex.schema.hasTable('todos');
      if (!exists) {
          await knex.schema.createTable('todos', table => {
              table.increments();
              table.string('name').notNullable();
              table.string('description').notNullable();
              table.integer('user_id').unsigned().notNullable();
              table.foreign('user_id').references('users.id');
              table.boolean('status').defaultTo(false);
          })
      }
  };
  
  exports.down = async function(knex) {
    const exists = await knex.schema.hasTable('todos');
    if (exists) {
        await knex.schema.dropTable('todos');
    }
  };