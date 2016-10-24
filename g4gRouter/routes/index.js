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
      var newData = {
        user_id: data[0].user_id,
        auth: true
      }
      console.log(newData);
      res.send(newData);
      // res.render('profile', {data: 'hello'});
    } else {
      console.log('FUCKING ALARM');
      res.send(req.headers);
    }
  })
});

// Gets a user's basic profile data
router.get('/profileData', function(req, res, next) {
  console.log('getting user profile data');
  knex('test.users').where({
    user_id: req.headers.user_id
  }).select().then(function(data) {
    if(data) {
      console.log('sending profile data');
      res.send(data);
    } else {
      console.log('no profile data');
      res.send('no profile data')
    }
  })
})

// Gets sports for a user's profile
router.get('/profileSports', function(req, res, next) {
  console.log('getting user profile sports');
  knex('test.user_sports').where({
    id: req.headers.user_id
  }).select().then(function(data) {
    if(data) {
      console.log('sending profile sport data');
      res.send(data);
    } else {
      console.log('no profile sports');
      res.send('no profile sports')
    }
  })
})

// Gets highlights for a user's profile
router.get('/profileHighlights', function(req, res, next) {
  console.log('getting user profile highlights');
  knex('test.user_highlights').where({
    id: req.headers.user_id
  }).select().then(function(data) {
    if(data) {
      console.log('sending profile highlights');
      res.send(data);
    } else {
      console.log('no profile highlights');
      res.send('no profile highlights')
    }
  })
})

// Gets posts for a user's profile
router.get('/profilePosts', function(req, res, next) {
  console.log('getting posts');
  knex('test.posts').where({
    user_id: req.headers.user_id
  }).select().then(function(data) {
    if(data) {
      var recentPosts = [];
      for (var i = 0; i < 5; i++) {
        if(data[i]){
          recentPosts.push(data[i]);
        }
      }
      console.log(recentPosts);
      console.log('sending posts');
      res.send(recentPosts);
    } else {
      console.log('no posts found!');
      res.send('there were no posts')
    }
  })
})

router.post('/posts', function(req, res, next) {
  console.log('creating post: ', req.body);
  knex('test.posts').insert({
    user_id: req.body.user_id,
    text: req.body.text,
    post_date: knex.fn.now(),
    has_comments: false
  }, '*').then(function(post) {
    console.log('post created: ', post);
    res.send(post)
  })

})

router.get('/comments', function(req, res, next) {
  console.log('getting comments for a post');
  knex('test.post_comments').where({
    post_id: req.headers.post_id
  }).select('*').join('test.comments', 'test.post_comments.comment_id', '=', 'test.comments.id').select().then(function(data) {
    if (data) {
      console.log('sending comments');
      res.send(data);
    } else {
      console.log('no comments');
      res.send('no comments found')
    }
  })
})
router.post('/comments', function(req, res, next) {
  console.log('posting comment', req.body);
  knex('test.comments').insert({
    user_id: req.body.user_id,
    text: req.body.text,
    comment_date: knex.fn.now()
  }, '*').then(function(comment) {
    console.log('comment created: ', comment);
    knex('test.post_comments').insert({
      post_id: req.body.post_id,
      comment_id: comment[0].id
    }).then(function() {
      res.send(comment)
    })
  })
})

// Gets friends for a given user
router.get('/friends', function(req, res,
next) {
  console.log('getting friends');

  knex('test.friends').where({
    id: req.headers.user_id
  }).select('*').join('test.users', 'test.friends.friend_id', '=', 'test.users.user_id').select('test.users.first').then(function(data) {
    console.log('getting friend info');
    if(data) {
      res.send(data);
    } else {
      res.send('you have no friends')
    }
  })
})

router.get('/workouts', function(req, res, next) {
  console.log('getting workouts', req.headers.user_id);
  knex('test.user_workouts').where({
    user_id: req.headers.user_id
  }).select().join('test.push_ups', 'test.user_workouts.workout_id', '=', 'test.push_ups.id').select().then(function(data) {
    console.log('workouts here:');
    // console.log(data);
    if(data) {
      res.send(data)
    } else {
      res.send('you dont work out')
    }
  })
})

router.get('/pushups', function(req, res, next) {
  console.log('getting pushups');
  knex('test.user_workouts').where({
    user_id: req.headers.user_id,
    workout_type: req.headers.workout
  }).join('test.pushups', 'test.user_workouts.workout_id', '=', 'test.pushups.id').select('test.pushups.id', 'test.pushups.amount', 'test.pushups.date').then(function(data) {
    console.log(data);
    var metaObj = {};
    metaObj.max = {};
    metaObj.max.amount = 0;
    metaObj.max.date;
    metaObj.max.id;
    metaObj.total = 0;
    metaObj.startDate = data[0].date;
    metaObj.type = 'pushups';
    for (var i = 0; i < data.length; i++) {
      if(data[i].amount > metaObj.max.amount) {
        metaObj.max.amount = data[i].amount;
        metaObj.max.date = data[i].date;
        metaObj.max.id = data[i].id;
      }
      metaObj.total += data[i].amount;
    }
    data.unshift(metaObj);
    res.send(data);
  })
})

router.post('/pushups', function(req, res, next) {
  console.log(req.body);
  knex('test.pushups').insert({
    amount: req.body.amount,
    date: knex.fn.now()
  }, '*').then(function(data) {
    console.log(data);
    knex('test.user_workouts').insert({
      user_id: req.body.user_id,
      workout_type: 'pushups',
      workout_id: data[0].id
    }, '*').then(function(dat) {
      res.send(data);
    })
  })
})

router.get('/planks', function(req, res, next) {
  console.log('getting planks');
  knex('test.user_workouts').where({
    user_id: req.headers.user_id,
    workout_type: 'planks'
  }).join('test.planks', 'test.user_workouts.workout_id', '=', 'test.planks.id').select('test.planks.id', 'test.planks.amount', 'test.planks.date').then(function(data) {
    console.log(data);
    var metaObj = {};
    metaObj.max = {};
    metaObj.max.amount = 0;
    metaObj.max.date;
    metaObj.max.id;
    metaObj.total = 0;
    metaObj.startDate = data[0].date;
    metaObj.type = 'planks';
    for (var i = 0; i < data.length; i++) {
      if(data[i].amount > metaObj.max.amount) {
        metaObj.max.amount = data[i].amount;
        metaObj.max.date = data[i].date;
        metaObj.max.id = data[i].id;
      }
      metaObj.total += data[i].amount;
    }
    data.unshift(metaObj);
    res.send(data);
  })
})

router.post('/planks', function(req, res, next) {
  console.log(req.body);
  knex('test.planks').insert({
    amount: req.body.amount,
    date: knex.fn.now()
  }, '*').then(function(data) {
    console.log(data);
    knex('test.user_workouts').insert({
      user_id: req.body.user_id,
      workout_type: 'planks',
      workout_id: data[0].id
    }, '*').then(function(dat) {
      res.send(data);
    })
  })
})

module.exports = router;
