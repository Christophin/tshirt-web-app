function LayoutController ($state, $cookies, $rootScope, $scope, $http) {
  let vm = this;

  $rootScope.startDragging = false;

  vm.goProfile = goProfile;
  vm.logOut = logOut;
  vm.broadcastDoneDragging = broadcastDoneDragging;

  function goProfile () {
      let userId = $cookies.get('user-id');
      $state.go('root.user', { userId: userId });
  }

  function logOut () {
      $rootScope.login = false;
      $rootScope.shopifyLinked = false;
      $cookies.remove('access-token');
      $cookies.remove('user-id');
      $cookies.remove('access_token');
      $http.defaults.headers.common['access_token'] = null;
      $http.defaults.headers.common['access-token'] = null;
      $state.go('root.home');
  }

  function broadcastDoneDragging()  {
      if ($rootScope.startDragging) {
          $scope.$broadcast('doneDragging')
      }
  }

}

LayoutController.$inject = ['$state', '$cookies', '$rootScope', '$scope', '$http'];

export default LayoutController;
