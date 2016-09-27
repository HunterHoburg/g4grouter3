module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://Hunter@localhost/g4g',
    useNullAsDefault: true
  }

  // production: {
  //   client: 'pg',
  //   connection: process.env.HEROKU_POSTGRESQL_GOLD_URL,
  //   useNullAsDefault: true
  // }

}
