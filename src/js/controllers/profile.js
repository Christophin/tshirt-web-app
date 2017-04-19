function ProfileController ($http, SERVER, $rootScope, $state, $cookies, $timeout) {
    let vm = this;

    vm.projects = [];
 vm.loadProject = loadProject;
 vm.linkShop = linkShop;
 vm.deleteProject = deleteProject;


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
      $state.go('root.shirt-editor.container')
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
                if (resp.data.token) {
                    $cookies.put('access_token', resp.data.token);
                    $http.defaults.headers.common['access_token'] = resp.data.token;
                    $rootScope.shopifyLinked = true;
                    vm.shopName = resp.data.shop_name;
                }
            })
    }
    CheckShopifyLinked();

    function deleteProject(project) { 
        $http.delete(`${SERVER}/tshirt/${project.id}`) 
            .then(resp => { 
                console.log(resp);
                vm.projects = vm.projects.filter(x => {
                    return x.id !== project.id;
                });
            }) 
    } 
}

ProfileController.$inject = ['$http', 'SERVER', '$rootScope', '$state', '$cookies', '$timeout'];

export default ProfileController;
