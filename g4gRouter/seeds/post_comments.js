exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('test.post_comments').del(),

    knex('test.post_comments').insert({
      post_id: 1,
      comment_id: 1
    }),
    knex('test.post_comments').insert({
      post_id: 1,
      comment_id: 2
    }),
    knex('test.post_comments').insert({
      post_id: 2,
      comment_id: 3
    }),
    knex('test.post_comments').insert({
      post_id: 2,
      comment_id: 4
    }),
    knex('test.post_comments').insert({
      post_id: 5,
      comment_id: 5
    }),
    knex('test.post_comments').insert({
      post_id: 4,
      comment_id: 6
    })
  )
}
