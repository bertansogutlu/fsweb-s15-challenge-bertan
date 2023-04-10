/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const defRiddles = require('../../api/bilmeceler/bilmeceler-data')
const defRoles = [{roles_name: 'user'},{roles_name: 'admin'}]
const defUsers = [
  {username: 'Defne', password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq', role_id: 1},
  {username: 'Bertan', password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq', role_id: 2}
]

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').truncate()
  await knex('roles').truncate()
  await knex('riddles').truncate()

  await knex('riddles').insert(defRiddles)
  await knex('roles').insert(defRoles)
  await knex('users').insert(defUsers) 
};
