exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('test.comments').del(),
    knex.raw('ALTER SEQUENCE test.comments_id_seq RESTART WITH 1;'),

    knex('test.comments').insert({
      // id: 1,
      user_id: 2,
      text: 'Yeah, that was nuts!',
      comment_date: knex.fn.now()
    }),
    knex('test.comments').insert({
      // id: 2,
      user_id: 2,
      text: "I'll bet!",
      comment_date: knex.fn.now()
    }),
    knex('test.comments').insert({
      // id: 3,
      user_id: 2,
      text: 'Cool!',
      comment_date: knex.fn.now()
    }),
    knex('test.comments').insert({
      // id: 4,
      user_id: 3,
      text: 'Awesome!',
      comment_date: knex.fn.now()
    }),
    knex('test.comments').insert({
      // id: 5,
      user_id: 3,
      text: 'Welcome!',
      comment_date: knex.fn.now()
    }),
    knex('test.comments').insert({
      // id: 6,
      user_id: 1,
      text: 'Cant wait to see it!',
      comment_date: knex.fn.now()
    })
  )
}
