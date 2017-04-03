function ProfileController ($http, SERVER, $scope, $state) {
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
      console.log(project, "fron loadProject");
      $scope.$emit('project', project);
      $state.go('root.shirt-editor.container');
    }

}

ProfileController.$inject = ['$http', 'SERVER', '$scope', '$state'];

export default ProfileController;
