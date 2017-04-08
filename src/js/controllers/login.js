function LoginController ($http, SERVER, $cookies, $state, $rootScope) {
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
            $cookies.put('access-token', resp.data.token);
            $cookies.put('user-id', resp.data.user.id);
            $rootScope.login = true;
            $http.defaults.headers.common['access-token'] = resp.data.token;
            $state.go('root.home');
        });
    }
}

LoginController.$inject = ['$http', 'SERVER', '$cookies', '$state', '$rootScope'];

export default LoginController;
