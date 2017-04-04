function ProfileController ($http, SERVER, $rootScope, $state ) {
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
      let shopObj = {
        shop: name
      }
     $http.post(`${SERVER}/shopify/link`, shopObj)

    }

}

ProfileController.$inject = ['$http', 'SERVER', '$rootScope', '$state'];

export default ProfileController;
