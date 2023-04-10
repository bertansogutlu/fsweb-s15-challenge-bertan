exports.up = function (knex) {
  return knex.schema
  .createTable('roles', roles => {
    roles.increments('role_id')
    roles.string('roles_name',64).notNullable().unique()
  })
  .createTable('users', users => {
    users.increments('user_id')
    users.string('username', 255).notNullable().unique()
    users.string('password', 255).notNullable()
    users.integer('role_id').notNullable().unsigned().references('role_id').inTable('roles')
    .onUpdate('RESTRICT')
    .onDelete('RESTRICT')
  })
  .createTable('riddles', riddle => {
    riddle.string('id').notNullable().unique()
    riddle.string('bilmece').notNullable().unique()
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('riddles')
  .dropTableIfExists('users')
  .dropTableIfExists('roles')
};
