function LayoutController ($state, $cookies) {
  let vm = this;

  vm.goProfile = goProfile;

  function goProfile () {
      console.log('hello');
      let userId = $cookies.get('user-id');
      $state.go('root.user', { userId: userId });
  }


}

LayoutController.$inject = ['$state', '$cookies'];

export default LayoutController;
