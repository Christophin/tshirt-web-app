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
      templateUrl: 'templates/landing-page.tpl.html',
      controller: 'LandingPageController as landingpageVm'
    })
    .state('root.shirt-editor', {
      abstract:true,
      templateUrl: 'templates/tshirt-sandbox.tpl.html',
      // controller: 'SandboxController as sandboxVm'
    })
    .state('root.shirt-editor.sandbox', {
      url: '/custom',
      views: {
        'left-sandbox': {
          templateUrl: 'templates/left-sandbox.tpl.html',
          controller: 'LeftSandboxController as leftsandboxVm'
        },
        'center-sandbox': {
          templateUrl: 'templates/center-sandbox.tpl.html',
          controller: 'CenterSandboxController as centersandboxVm'
        },
        'right-sandbox': {
          templateUrl: 'templates/right-sandbox.tpl.html',
          controller: 'RightSandboxController as rightsandboxVm'
        }
      }
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
