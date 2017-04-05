
function setup ($rootScope, $cookies, $http) {

    let token = $cookies.get('access-token');
    let shopifyToken = $cookies.get('access_token');

    if (token) {
        $rootScope.login = true;
        $http.defaults.headers.common['access-token'] = token;
    }
    if(shopifyToken) {
        $rootScope.shopifyLinked = true;
        $http.defaults.headers.common['access_token'] = shopifyToken;
    }

}

setup.$inject = ['$rootScope', '$cookies', '$http'];

export default setup;
