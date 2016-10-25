exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('test.posts').del(),
    knex.raw('ALTER SEQUENCE test.posts_post_id_seq RESTART WITH 1;'),

    knex('test.posts').insert({
      user_id: 1,
      text: 'Something about sports! Cant believe they got that last goal on the final buzzer! #wowee',
      likes: [2, 3],
      post_date: knex.fn.now(),
      // post_id: 1,
      has_comments: true
    }),
    knex('test.posts').insert({
      user_id: 1,
      text: 'Something about how swoll I am! #GainTrain #SwollToll',
      likes: [2, 1, 3],
      post_date: knex.fn.now(),
      // post_id: 2,
      has_comments: true
    }),
    knex('test.posts').insert({
      user_id: 1,
      text: 'Joined G4G today!',
      likes: [2],
      post_date: knex.fn.now(),
      // post_id: 3,
      has_comments: false
    }),
    knex('test.posts').insert({
      user_id: 2,
      text: 'Got a new lax stick!',
      likes: [1, 3],
      post_date: knex.fn.now(),
      // post_id: 4,
      has_comments: true
    }),
    knex('test.posts').insert({
      user_id: 2,
      text: 'Joined G4G today!',
      likes: [3, 1],
      post_date: knex.fn.now(),
      // post_id: 5,
      has_comments: true
    })
  )
}
