var express = require('express');
var router = express.Router();
// var http = require('http');
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

//Function for getting multiple friends
function getFriends(idArr, promise) {
  var friends = [];
  for (var i = 0; i < idArr.length; i++) {
    knex('test.users').where({
      user_id: idArr[i]
    }).select().then(function(data) {
      console.log('sending friends');
      console.log(data);
      friends.push(data);
    })
  }
  return friends;
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../public/views/index', { title: 'G4G' });
});

router.post('/register', function(req, res, next) {
  console.log(req.body);
  var data = req.body;
  var options = {
      username: data.username,
      password: data.password,
      role: 'user',
      first: data.firstname,
      last: data.lastname,
      birth_month: data.birthday_month,
      birth_day: data.birthday_day,
      birth_year: data.birthday_year,
      email: data.email_address,
      country: data.country,
      zip: data.zip,
      salt: 01110010000101001010,
      user_agreement: true
  }
  console.log('username: ', options.username);
  knex('test.users').insert({
    username: req.body.username,
    role: 'user',
    password: req.body.password,
    first: req.body.firstname,
    last: req.body.lastname,
    birth_month: req.body.birthday_month,
    birth_day: req.body.birthday_day,
    birth_year: req.body.birthday_year,
    email: req.body.emailAddress,
    country: req.body.country,
    zip: req.body.zip,
    salt: 10001010001001,
    user_agreement: req.body.user_agreement
  }, 'user_id').then(function(user_id) {
    res.send(user_id);
    console.log('success! user_id: ', user_id);
  });
});

router.get('/login', function(req, res, next) {
  console.log('do do dodododo', req.headers);
  knex('test.users').where({
    username: req.headers.username
  }).select().then(function(data) {
    if(data) {
      console.log('user: ', data);
      res.send(data);
      // res.render('profile', {data: 'hello'});
    } else {
      console.log('FUCKING ALARM');
      res.send(req.headers);
    }
  })
});

router.get('/profilePosts', function(req, res, next) {
  console.log('getting posts');
  knex('test.posts').where({
    user_id: req.headers.user_id
  }).select().then(function(data) {
    if(data) {
      console.log('sending posts');
      res.send(data);
    } else {
      console.log('no posts found!');
      res.send('there were no posts')
    }
  })
})

router.get('/friends', function(req, res,
next) {
  console.log('getting friends');
  knex('test.friends').where({
    user_id: req.headers.user_id
  }).select().then(function(data) {
    if(data) {
      var idArr = data[0].friend_id_array;
      var friends = [];
      for (var i = 0; i < idArr.length; i++) {
        knex('test.users').where({
          user_id: idArr[i]
        }).select().then(function(data) {
          console.log('sending friends');
          console.log(data);
          friends.push(data);
        })
      }
      function sendFriends() {
        console.log('sendFriends friends', friends);
        res.send(friends);
      }
      sendFriends();
    } else {
      console.log('no friends found!');
      res.send('you have no friends')
    }
  })
  // knex('test.friends').where({
  //   user_id: req.headers.user_id
  // }).select('*').join('test.users', 'test.friends.friend_id_array', '=', 'test.users.user_id').select().then(function(data) {
  //   console.log('getting friend info');
  //   res.send(data);
  // })
})

// router.get('/profile', function(req, res, next) {
//   console.log(req.headers);
//   res.render('profile');
// });

module.exports = router;
