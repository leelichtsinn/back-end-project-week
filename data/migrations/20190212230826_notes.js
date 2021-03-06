
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', table => {
    table.increments();
    table.string('title').notNullable();
    table.string('textBody').notNullable();
    table.integer('user_id').unsigned().references('id').inTable('users');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists();
};
