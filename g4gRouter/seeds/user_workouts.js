exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('test.user_workouts').del(),

    knex('test.user_workouts').insert({
      workout_id: 1,
      user_id: 1,
      workout_type: 'pushups'
    }),
    knex('test.user_workouts').insert({
      workout_id: 2,
      user_id: 1,
      workout_type: 'pushups'
    }),
    knex('test.user_workouts').insert({
      workout_id: 3,
      user_id: 1,
      workout_type: 'pushups'
    }),
    knex('test.user_workouts').insert({
      workout_id: 4,
      user_id: 1,
      workout_type: 'pushups'
    }),
    knex('test.user_workouts').insert({
      workout_id: 5,
      user_id: 1,
      workout_type: 'pushups'
    }),
    knex('test.user_workouts').insert({
      workout_id: 1,
      user_id: 1,
      workout_type: 'planks'
    }),
    knex('test.user_workouts').insert({
      workout_id: 2,
      user_id: 1,
      workout_type: 'planks'
    }),
    knex('test.user_workouts').insert({
      workout_id: 3,
      user_id: 1,
      workout_type: 'planks'
    }),
    knex('test.user_workouts').insert({
      workout_id: 4,
      user_id: 1,
      workout_type: 'planks'
    })
  )
}
