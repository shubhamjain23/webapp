app.factory("Authentication", ["$window","$http","$q", function($window,$http,$q){
    function isLoggedIn(){
        return $q(function(resolve,reject){
            $http({
                method:'POST',
                url: '/isLoggedIn',
                data: {token:$window.localStorage['token']}
            }).then(function(response){
                    resolve(response.data.isLoggedIn);
            });
        })
    }
    function saveToken(token){
        $window.localStorage['token'] = token;
    }
    function logOut(){
        $window.localStorage.removeItem('token');
    }
    return {
        isLoggedIn:isLoggedIn,
        saveToken: saveToken,
        logOut: logOut
    }
}]);