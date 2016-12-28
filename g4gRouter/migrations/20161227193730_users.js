
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('test_table', function(table) {
      table.increments('id').unsigned().primary();
      table.string('name').notNull();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('test_table')
  ])
};
