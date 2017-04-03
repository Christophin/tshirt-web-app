function ProfileController ($http, SERVER) {
    let vm = this;

    function showProjects ()    {
        $http.get(`${SERVER}/tshirt`)
            .then(resp =>   {
                vm.projects = resp;
                console.log(vm.projects);
            })
            .catch(error => console.log(error))
    }
    showProjects();

}

ProfileController.$inject = ['$http', 'SERVER'];

export default ProfileController;
