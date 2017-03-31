function LandingPageController ($http, SERVER, $cookies) {
    let vm = this;

    vm.register = register;
    vm.login = login;

    function register (user) {
        console.log(user);
        $http.post(`${SERVER}/users`, user)
            .then(resp =>   {
                console.log(resp)
            })
            .catch(error => console.log(error));


    }
    function login (user) {
        return $http.post(`${SERVER}/login`, user).then(resp => {
            console.log(resp);
            $cookies.put('access-token', resp.data.token);
            $http.defaults.headers.common['access-token'] = resp.data.token;
            return resp;
        });
    }
}

LandingPageController.$inject = ['$http', 'SERVER', '$cookies'];

export default LandingPageController;
