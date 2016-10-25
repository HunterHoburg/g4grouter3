var express = require('express');
var router = express.Router();
// var http = require('http');
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var zipcodes = require('zipcodes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../public/views/index', { title: 'G4G' });
});

router.post('/register', function(req, res, next) {
  console.log(req.body);
  var data = req.body;
  var location = zipcodes.lookup(data.zip);
  console.log('zipcode: ', location);
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
      state: location.state,
      city: location.city,
      salt: 01110010000101001010,
      user_agreement: true,
      gender: data.gender
  }
  console.log('username: ', options.username);
  knex('test.users').insert(options, 'user_id').then(function(user_id) {
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
  }).select('test.users.first', 'test.users.last', 'test.users.birth_day', 'test.users.birth_month', 'test.users.birth_year', 'test.users.country', 'test.users.zip', 'test.users.user_id', 'test.users.state', 'test.users.gender').then(function(data) {
    if(data) {
      console.log('sending profile data');
      res.send(data);
    } else {
      console.log('no profile data');
      res.send('no profile data')
    }
  })
})

router.get('/profile/notifications', function(req, res, next) {
  knex('test.notifications').where({
    'test.notifications.user_id': 5
  }).join('test.users', 'test.notifications.friend_id', '=', 'test.users.user_id').select('test.notifications.id', 'test.notifications.type', 'test.notifications.date','test.users.first', 'test.users.last', 'test.users.user_id').then(function(data) {
    res.send(data);
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
    user_id: req.headers.user_id
  }).select().then(function(data) {
    if(data) {
      console.log('sending profile highlights');
      data = data.reverse();
      res.send(data);
    } else {
      console.log('no profile highlights');
      res.send('no profile highlights')
    }
  })
})
router.post('/profileHighlights', function(req, res, next) {
  knex('test.user_highlights').insert({
    user_id: req.body.user_id,
    text: req.body.text,
    date: knex.fn.now()
  }, '*').then(function(data) {
    res.send(data);
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
      // CAN USE THIS TO LIMIT HOW MANY POSTS TO GET
      for (var i = 0; i < data.length; i++) {
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
    has_comments: false,
    likes: []
  }, '*').then(function(post) {
    console.log('post created: ', post);
    res.send(post)
  })
})

router.post('/likes', function(req, res, next) {
  console.log('liking a post');
  knex('test.posts').where({
    post_id: req.body.post_id
  }).select().then(function(data) {
    console.log(data);
    if (data[0].likes.indexOf(req.body.user_id) < 0) {
      console.log('not liked');
      data[0].likes.push(req.body.user_id);
      var newLikes = data[0].likes;
      knex('test.posts').where({
        post_id: req.body.post_id
      }).update({
        likes: newLikes
      }).then(function(dat) {
        console.log(dat);
        res.send('liked')
      })
    } else {
      console.log('already liked');
      data[0].likes.splice(data[0].likes.indexOf(req.body.user_id), 1);
      var newLikes = data[0].likes;
      console.log(newLikes);
      knex('test.posts').where({
        post_id: req.body.post_id
      }).update({
        likes: newLikes
      }).then(function(dat) {
        console.log(dat);
        res.send('unliked')
      })
    }
  })
})

router.get('/comments', function(req, res, next) {
  console.log('getting comments for a post');
  knex('test.post_comments').where({
    post_id: req.headers.post_id
  }).select('*').join('test.comments', 'test.post_comments.comment_id', '=', 'test.comments.id').select().then(function(data) {
    if (data) {
      console.log('sending comments');
      console.log(data);
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
    }).then(function(data) {
      console.log(data);
      knex('test.posts').where({
        post_id: req.body.post_id
      }).update({
        has_comments: true
      }).then(function() {
        res.send(comment)
      })
    })
  })
})
router.delete('/comments', function(req, res, next) {
  console.log('delete body: ', req.headers);
  knex('test.comments').where({
    id: req.headers.comment_id
  }).del().then(function(data) {
    knex('test.post_comments').where({
      comment_id: req.headers.comment_id
    }).del().then(function(dat) {
      console.log(dat);
      res.send('deleted')
    })
  })
})

// Gets friends for a given user
router.get('/friends', function(req, res,
next) {
  console.log('getting friends');
  knex('test.friends').where({
    id: req.headers.user_id
  }).join('test.users', 'test.friends.friend_id', '=', 'test.users.user_id').select('test.users.first', 'test.users.last', 'test.users.birth_day', 'test.users.birth_month', 'test.users.birth_year', 'test.users.country', 'test.users.zip', 'test.users.user_id').then(function(data) {
    console.log('getting friend info');
    if(data) {
      res.send(data);
    } else {
      res.send('you have no friends')
    }
  })
})

router.get('/pushups', function(req, res, next) {
  console.log('getting pushups');
  knex('test.user_workouts').where({
    user_id: req.headers.user_id,
    workout_type: req.headers.workout
  }).join('test.pushups', 'test.user_workouts.workout_id', '=', 'test.pushups.id').select('test.pushups.id', 'test.pushups.amount', 'test.pushups.date').then(function(data) {
    if (data.length > 0) {
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
    } else {
      res.send('none found')
    }
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
    if (data.length > 0) {
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
    } else {
      res.send('none found')
    }
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

// FEED STUFF

function getFeedPosts(idArr) {
  var feedPosts = [];
  for (var i = 0; i < idArr.length; i++) {
    knex('test.posts').where({
      user_id: idArr[i]
    }).select().then(function(data) {
      console.log('sending feed posts');
      console.log(data);
      feedPosts.push(data);
    })
  }
  return friends;
}
router.get('/feedPosts', function(req, res, next) {
  knex('test.friends').where({
    id: req.headers.user_id
  }).join('test.posts', 'test.friends.friend_id', '=', 'test.posts.user_id').select().then(function(data) {
    knex('test.posts').where({
      user_id: req.headers.user_id
    }).then(function(dat) {
      for (var post in dat) {
        data.push(dat[post]);
      }
      // console.log(data);
      res.send(data)
    })
  })
})

// FRIEND PROFILE STUFF

router.get('/friend/profile', function(req, res, next) {
  knex('test.users').where({
    user_id: req.headers.friend_id
  }).select('test.users.first', 'test.users.last', 'test.users.birth_day', 'test.users.birth_month', 'test.users.birth_year', 'test.users.country', 'test.users.zip', 'test.users.user_id', 'test.users.state', 'test.users.gender').then(function(data) {
    console.log(data);
    knex('test.friends').where({
      id: req.headers.user_id,
      friend_id: req.headers.friend_id
    }).select().then(function(dat) {
      console.log('friends? ', dat);
      if (dat.length < 1) {
        dat.unshift('not friends');
      }
      dat.push(data);
      res.send(dat);
    })
  })
})

router.post('/friend/request', function(req, res, next) {
  knex('test.requests').where({
    requester_id: req.body.user_id,
    requested_id: req.body.friend_id
  }).select().then(function(data) {
    if (data.length > 0) {
      res.send('already sent')
    } else {
      knex('test.requests').insert({
        requester_id: req.body.user_id,
        requested_id: req.body.friend_id
      }, '*').then(function(dat) {
        knex('test.notifications').insert({
          user_id: req.body.friend_id,
          friend_id: req.body.user_id,
          type: 'request',
          date: knex.fn.now()
        }).then(function(da) {
          res.send('request made');
        })
      })
    }
  })
})

// router.post('/friend/response', function(req, res, next) {
//   knex('test.requests').where({
//     requester_id:
//   })
// })



// SEARCH PAGE STUFF

router.get('/search/info', function(req, res, next) {
  knex('test.users').where({
    user_id: req.headers.user_id
  }).select().then(function(data) {
    console.log(data);
    res.send(data);
  })
})

router.get('/search/query', function(req, res, next) {
  knex('test.friends').where({
    id: req.headers.user_id
  }).join('test.users', 'test.friends.friend_id', '=', 'test.users.user_id').select('test.users.first', 'test.users.last', 'test.users.zip', 'test.users.user_id', 'test.users.state').then(function(data) {
    console.log(data);
    var nearbyZips = zipcodes.radius(req.headers.zip, req.headers.radius);
    knex('test.users').whereIn('zip', nearbyZips).andWhere('first', req.headers.query).orWhere('last', req.headers.query).select('test.users.first', 'test.users.last', 'test.users.zip', 'test.users.user_id', 'test.users.state').then(function(dat) {
      if (dat.length > 50) {
        dat.unshift(data);
        dat = dat.splice(0, 50);
      } else {
        dat.unshift(data);
        res.send(dat);
      }
    })
  })
})

module.exports = router;
