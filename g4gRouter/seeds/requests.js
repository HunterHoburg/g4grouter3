exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('test.requests').del(),
    knex.raw('ALTER SEQUENCE test.requests_id_seq RESTART WITH 1;')

  )
}
