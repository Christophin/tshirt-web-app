import angular from 'angular';
import 'angular-ui-router';
import 'angular-cookies';
import 'angular-dragdrop';
import 'angular-materialize';




import AppConfig from './config';
import SERVER from './server';
import setup from './setup';
import resizable from './resizable';

//import AccountService from './services/account';

import LayoutController from './controllers/layout';
import TshirtEditorController from './controllers/tshirt-editor';
import LandingPageController from './controllers/landing-page';
import LeftEditorController from './controllers/left-editor';
import RightEditorController from './controllers/right-editor';
import ProfileController from './controllers/profile';
import LoginController from './controllers/login';


angular
  .module('app', ['ui.router', 'ngCookies', 'ngDragDrop', 'ui.materialize'])
  .config(AppConfig)
  .directive('resizable', resizable)
  .run(setup)
  .constant('SERVER', SERVER)
  //.service('AccountService', AccountService)
  .controller('LayoutController', LayoutController)
  .controller('TshirtEditorController', TshirtEditorController)
  .controller('LandingPageController', LandingPageController)
  .controller('LeftEditorController', LeftEditorController)
  .controller('RightEditorController', RightEditorController)
  .controller('LoginController', LoginController)
  .controller('ProfileController', ProfileController);
