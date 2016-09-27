exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('test.friends').del(),

    knex('test.friends').insert({
      user_id: 1,
      friend_id_array: [2, 3]
    }),
    knex('test.friends').insert({
      user_id: 2,
      friend_id_array: [1, 3]
    })
  )
}
