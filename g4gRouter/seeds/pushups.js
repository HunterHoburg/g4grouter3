exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('test.pushups').del(),
    knex.raw('ALTER SEQUENCE test.pushups_id_seq RESTART WITH 1;'),

    knex('test.pushups').insert({
      amount: 50,
      date: '2016-10-19 12:44:34.485341'
    }),
    knex('test.pushups').insert({
      amount: 60,
      date: '2016-10-20 12:44:34.485341'
    }),
    knex('test.pushups').insert({
      amount: 45,
      date: '2016-10-21 12:44:34.485341'
    }),
    knex('test.pushups').insert({
      amount: 70,
      date: '2016-10-22 12:44:34.485341'
    }),
    knex('test.pushups').insert({
      amount: 80,
      date: '2016-10-23 12:44:34.485341'
    }),
    knex('test.pushups').insert({
      amount: 80,
      date: '2016-10-20 12:44:34.485341'
    }),
    knex('test.pushups').insert({
      amount: 60,
      date: '2016-10-22 12:44:34.485341'
    })
  )
}
