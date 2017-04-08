function ProfileController ($http, SERVER, $rootScope, $state, $cookies) {
    let vm = this;

    vm.projects = [];
    vm.loadProject = loadProject;
    vm.linkShop = linkShop;

    function showProjects ()    {
        $http.get(`${SERVER}/tshirt`)
            .then(resp =>   {
                vm.projects = resp.data;
            })
            .catch(error => console.log(error))
    }
    showProjects();

    function loadProject (project) {
      $rootScope.savedProject = project;
      $state.go('root.shirt-editor.container');
    }

    function linkShop (name) {
        $http.get(`${SERVER}/shopify/link?shop=${name}`)
            .then(resp => {
                window.location = resp.data.url;
            })

    }

    function CheckShopifyLinked() {
        $http.get(`${SERVER}/shopify/user`)
            .then(resp => {
                $cookies.put('access_token', resp.data.token);
                $http.defaults.headers.common['access_token'] = resp.data.token;
                $rootScope.shopifyLinked = true;
            })
    }
    CheckShopifyLinked()
}

ProfileController.$inject = ['$http', 'SERVER', '$rootScope', '$state', '$cookies'];

export default ProfileController;
