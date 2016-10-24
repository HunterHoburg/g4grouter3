exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('test.friends').del(),

    knex('test.friends').insert({
      id: 1,
      friend_id: 2
    }),
    knex('test.friends').insert({
      id: 1,
      friend_id: 3
    }),
    knex('test.friends').insert({
      id: 2,
      friend_id: 1
    }),
    knex('test.friends').insert({
      id: 2,
      friend_id: 3
    }),
    knex('test.friends').insert({
      id: 3,
      friend_id: 1
    })
  )
}
