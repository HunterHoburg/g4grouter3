exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('test.exercises').del(),
    knex.raw('ALTER SEQUENCE test.exercises_id_seq RESTART WITH 1;'),

    knex('test.exercises').insert({
      text: 'Push Ups',
      min: 0,
      max: 200,
      measurement: 'push ups'
    }),
    knex('test.exercises').insert({
      text: 'Sit Ups',
      min: 0,
      max: 200,
      measurement: 'sit ups'
    }),
    knex('test.exercises').insert({
      text: 'Pull Ups',
      min: 0,
      max: 200,
      measurement: 'pull ups'
    }),
    knex('test.exercises').insert({
      text: '100-Yard Dash',
      min: 0,
      max: 50000,
      measurement: 'seconds'
    }),
    knex('test.exercises').insert({
      text: 'Burpees',
      min: 0,
      max: 200,
      measurement: 'burpees'
    })
  )
}
