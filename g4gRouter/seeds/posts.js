exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('test.posts').del(),

    knex('test.posts').insert({
      user_id: 1,
      text: 'Something about sports! Cant believe they got that last goal on the final buzzer! #wowee',
      likes: [2, 3],
      post_date: knex.fn.now()
    }),
    knex('test.posts').insert({
      user_id: 1,
      text: 'Something about how swoll I am! #GainTrain #SwollToll',
      likes: [2, 1, 3],
      post_date: knex.fn.now()
    }),
    knex('test.posts').insert({
      user_id: 1,
      text: 'Joined G4G today!',
      likes: [2],
      post_date: knex.fn.now()
    })
  )
}
