exports.up = async function(knex) {
    const exists = await knex.schema.hasTable('tasks');
      if (!exists) {
          await knex.schema.createTable('tasks', table => {
              table.increments();
              table.string('name').notNullable();
              table.integer('todo_id').unsigned().notNullable();
              table.foreign('todo_id').references('todos.id');
              table.boolean('status').defaultTo(false);
          })
      }
  };
  
  exports.down = async function(knex) {
    const exists = await knex.schema.hasTable('tasks');
    if (exists) {
        await knex.schema.dropTable('tasks');
    }   
  };