function ProfileController ($http, SERVER, $rootScope, $state ) {
    let vm = this;

    vm.projects = [];
    vm.loadProject = loadProject;

    function showProjects ()    {
        $http.get(`${SERVER}/tshirt`)
            .then(resp =>   {
                vm.projects = resp.data;
                console.log(vm.projects);
            })
            .catch(error => console.log(error))
    }
    showProjects();

    function loadProject (project) {
      $rootScope.savedProject = project;
      $state.go('root.shirt-editor.container');
    }

}

ProfileController.$inject = ['$http', 'SERVER', '$rootScope', '$state'];

export default ProfileController;
