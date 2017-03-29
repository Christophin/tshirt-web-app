function Config ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('root', {
      abstract: true,
      templateUrl: 'templates/layout.tpl.html',
      controller: 'LayoutController as layoutVm'
    })
    // .state('root.signup', {
    //   url: '/sign-up',
    //   templateUrl: 'templates/sign-up.tpl.html',
    //   controller: 'UserController as usersVm'
    // })
    .state('root.home', {
      url: '/home',
      templateUrl: 'templates/tshirt-front-sandbox.tpl.html',
      controller: 'SandboxController as sandboxVm'
    })
    .state('page-not-found', {
      url: '/not-found',
      template: '<h2>No such page. Haha. Youre dumb.</h2>'
    });

  $urlRouterProvider.when('', '/home');
  $urlRouterProvider.otherwise('/not-found');
}

Config.$inject = ['$stateProvider', '$urlRouterProvider'];

export default Config;
