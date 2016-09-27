
  app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: '../views/index.ejs',
        controller: 'loginCtrl'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: '../views/profile.ejs',
        controller: 'indexCtrl'
      })

  })
