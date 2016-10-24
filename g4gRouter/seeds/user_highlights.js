exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('test.user_highlights').del(),

    knex('test.user_highlights').insert({
      id: 1,
      text: 'Scored a 7 point basket against the Lions',
      date: knex.fn.now()
    }),
    knex('test.user_highlights').insert({
      id: 1,
      text: 'Bench pressed 1000 stones',
      date: knex.fn.now()
    }),
    knex('test.user_highlights').insert({
      id: 1,
      text: 'Ran a marathon while doing a handstand',
      date: knex.fn.now()
    }),
    knex('test.user_highlights').insert({
      id: 2,
      text: 'Slam dunked a 3-pointer',
      date: knex.fn.now()
    })
  )
}
