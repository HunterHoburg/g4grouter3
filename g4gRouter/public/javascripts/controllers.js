var app = angular.module('g4g', ['ui.router']);

app.controller('indexCtrl', [indexCtrl]);
app.controller('loginCtrl', ['$http', '$location', loginCtrl]);

function indexCtrl() {
  var vm = this;

  // vm.currentUser = {
  //   name: 'Hunter Hoburg',
  //   age: 23,
  //   quote: "'You miss 100% of the shots you don't take'. - Michael Scott",
  //   sport: 'Lacrosse',
  //   favoriteAthlete: 'Aaron Ralston',
  //   otherSports: ['Soccer', 'Endurance Races', 'Baseball'],
  //   recentPosts: [
  //     {time: '07/30/16',
  //     text: 'Something about sports! Cant believe they got that last goal on the final buzzer! #wowee', likes: ['Hunter Hoburg', 'Michelle Leonard', 'Josh Swanson']},
  //     {time: '07/25/16', text: 'Something about how swoll I am! #GainTrain #SwollToll', likes: []},
  //     {time: '07/20/16', text: 'Joined G4G today!', likes: []}
  //   ],
  //   highlights: [
  //     'Scored a 7 point basket against the Lions',
  //     'Bench pressed 1000 stones',
  //     'Ran a marathon while doing a handstand',
  //     'Slam dunked a 3-pointer',
  //     '10 touchdowns in one game',
  //     'Laxed super hard'
  //   ]
  // }
  //The following function would require validation to see if changes are made, and then subsequent server calls to change that info
  vm.changeInfo = function(newQuote, newSport) {
    if (vm.currentUser.quote !== newQuote) {
      vm.currentUser.quote = newQuote;
    }
    if (vm.currentUser.sport !== newSport) {
      vm.currentUser.sport = newSport;
    }
  }
}

function loginCtrl($http, $location) {
  var vm = this;

  vm.currentUser = 'testUser';

  vm.loginSubmit = function(user, pass) {
    // console.log('FUCK');
    $http({
      url: 'http://localhost:3000/login',
      method: 'GET',
      headers: {
          username: user,
          password: pass
      }
    }).then(function(res) {
      console.log(res);
      console.log('logging in');
      $location.path('profile')
    });
  }

  vm.registerSubmit = function(user, pass, first, last, date, email, country, zip, agree) {
    var month = date.toString().slice(4, 7);
    var day = date.toString().slice(8, 10);
    var year = date.toString().slice(11, 15);
    // console.log(month, day, year);
    // console.log('req: ' + user, pass, first, last, month, day, year, email, country, zip, agree);
    $http({
      // TODO: change the date to an actual date format
      url: 'http://localhost:3000/register',
      method: 'POST',
      data: {
        username: user,
        password: pass,
        firstname: first,
        lastname: last,
        birthday_month: month,
        birthday_day: day,
        birthday_year: year,
        emailAddress: email,
        country: country,
        zip: zip,
        user_agreement: true
      }
    }).then(function(res, err) {
      console.log('test');
      console.log(res);
    })
  }
}

// function feedCtrl() {
//   var vm = this;
//
//   // vm.currentUser = indexCtrl.currentUser;
// }
