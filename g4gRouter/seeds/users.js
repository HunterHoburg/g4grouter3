exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('test.users').del(),

    knex('test.users').insert({
      user_id: 1,
      username: 'hhoburg',
      role: null,
      password: 'password',
      first: 'Hunter',
      last: 'Hoburg',
      birth_day: 04,
      birth_year: 1992,
      birth_month: 08,
      country: 'USA',
      zip: 85251,
      salt: 0909742091098,
      user_agreement: true,
      email: 'hhoburg@gmail.com'
    }),
    knex('test.users').insert({
      user_id: 2,
      username: 'mleonard',
      role: null,
      password: 'password',
      first: 'Michelle',
      last: 'Leonard',
      birth_day: 07,
      birth_year: 1991,
      birth_month: 09,
      country: 'USA',
      zip: 85251,
      salt: 0909742091098,
      user_agreement: true,
      email: 'mleonard@gmail.com'
    }),
    knex('test.users').insert({
      user_id: 3,
      username: 'rhoburg',
      role: null,
      password: 'password',
      first: 'Rocco',
      last: 'Hoburg',
      birth_day: 31,
      birth_year: 2013,
      birth_month: 08,
      country: 'USA',
      zip: 85251,
      salt: 0909742091098,
      user_agreement: true,
      email: 'rhoburg@gmail.com'
    })
  )
}
