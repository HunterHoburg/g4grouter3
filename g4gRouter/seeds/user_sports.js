exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('test.user_sports').del(),

    knex('test.user_sports').insert({
      id: 1,
      text: 'Lacrosse'
    }),
    knex('test.user_sports').insert({
      id: 1,
      text: 'Baseball'
    }),
    knex('test.user_sports').insert({
      id: 2,
      text: 'Lacrosse'
    }),
    knex('test.user_sports').insert({
      id: 2,
      text: 'Soccer'
    }),
    knex('test.user_sports').insert({
      id: 3,
      text: 'Running'
    })
  )
}
