function ProfileController ($http, SERVER, $rootScope, $state, $cookies) {
    let vm = this;

    vm.projects = [];
    vm.loadProject = loadProject;
    vm.linkShop = linkShop;

    function showProjects ()    {
        $http.get(`${SERVER}/tshirt`)
            .then(resp =>   {
                vm.projects = resp.data;
                //console.log(vm.projects);
            })
            .catch(error => console.log(error))
    }
    showProjects();

    function loadProject (project) {
      $rootScope.savedProject = project;
      //console.log('from loadProject()', project);
      $state.go('root.shirt-editor.container');
    }

    function linkShop (name) {
        let user_id = $cookies.get('user-id');
        window.location = `${SERVER}/shopify/link?shop=${name}&user_id=${user_id}`;
    }

    function CheckShopifyLinked() {
        $http.get(`${SERVER}/shopify/user`)
            .then(resp => {
                console.log(resp);
                $cookies.put('access_token', resp.data.token);
                $http.defaults.headers.common['access_token'] = resp.data.token;
                $rootScope.shopifyLinked = true;
            })
    }
    CheckShopifyLinked()
}

ProfileController.$inject = ['$http', 'SERVER', '$rootScope', '$state', '$cookies'];

export default ProfileController;
