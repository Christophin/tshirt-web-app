function LayoutController ($state, $cookies, $rootScope) {
  let vm = this;

  vm.goProfile = goProfile;
  vm.logOut = logOut;

  function goProfile () {
      console.log('hello');
      let userId = $cookies.get('user-id');
      $state.go('root.user', { userId: userId });
  }

  function logOut () {
      $rootScope.login = false;
      $cookies.remove('access-token');
      $cookies.remove('user-id');
      $http.defaults.headers.common['access-token'] = null;
      $state.go('root.home');
    };

}

LayoutController.$inject = ['$state', '$cookies', '$rootScope'];

export default LayoutController;
