import angular from 'angular';
import 'angular-ui-router';
import 'angular-cookies';
import 'angular-dragdrop';
import 'angular-materialize';


import AppConfig from './config';
// import SERVER from './server';
// import setup from './setup';
import resizable from './resizable';

//import AccountService from './services/account';

import LayoutController from './controllers/layout';
//import UserController from './controllers/user';
import SandboxController from './controllers/sandbox';
import LandingPageController from './controllers/landing-page';
import LeftSandboxController from './controllers/left-sandbox';
import CenterSandboxController from './controllers/center-sandbox';
import RightSandboxController from './controllers/right-sandbox';


angular
  .module('app', ['ui.router', 'ngCookies', 'ngDragDrop', 'ui.materialize'])
  .config(AppConfig)
  .directive('resizable', resizable)
  // .run(setup)
  // .constant('SERVER', SERVER)
  //.service('AccountService', AccountService)
  .controller('LayoutController', LayoutController)
  //.controller('UserController', UserController);
  .controller('SandboxController', SandboxController)
  .controller('LandingPageController', LandingPageController)
  .controller('LeftSandboxController', LeftSandboxController)
  .controller('CenterSandboxController', CenterSandboxController)
  .controller('RightSandboxController', RightSandboxController);
