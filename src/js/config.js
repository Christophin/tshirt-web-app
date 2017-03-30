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
      templateUrl: 'templates/tshirt-editor.tpl.html',
      contrller: 'TshirtEditorController as tshirtVm'
    })
    .state('root.shirt-editor.container', {
      url: '/custom',
      views: {
        'left-editor': {
          templateUrl: 'templates/left-editor.tpl.html',
          controller: 'LeftEditorController as leftVm'
        },
        'right-editor': {
          templateUrl: 'templates/right-editor.tpl.html',
          controller: 'RightEditorController as rightVm'
        }
      }
    })
    .state('page-not-found', {
      url: '/not-found',
      template: '<h2>Page does not exist</h2>'
    });

  $urlRouterProvider.when('', '/home');
  $urlRouterProvider.otherwise('/not-found');
}

Config.$inject = ['$stateProvider', '$urlRouterProvider'];

export default Config;
