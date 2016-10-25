exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('test.planks').del(),
    knex.raw('ALTER SEQUENCE test.planks_id_seq RESTART WITH 1;'),

    knex('test.planks').insert({
      amount: 5000,
      date: '2016-10-19 12:44:34.485341'
    }),
    knex('test.planks').insert({
      amount: 60000,
      date: '2016-10-20 12:44:34.485341'
    }),
    knex('test.planks').insert({
      amount: 70000,
      date: '2016-10-21 12:44:34.485341'
    }),
    knex('test.planks').insert({
      amount: 100000,
      date: '2016-10-22 12:44:34.485341'
    }),
    knex('test.planks').insert({
      amount: 200000,
      date: '2016-10-23 12:44:34.485341'
    }),
    knex('test.planks').insert({
      amount: 900000,
      date: '2016-10-21 12:44:34.485341'
    }),
    knex('test.planks').insert({
      amount: 170000,
      date: '2016-10-24 12:44:34.485341'
    })
  )
}
