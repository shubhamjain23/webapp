/**
 * Created by Shubham on 15-04-2017.
 */
app.controller("registerCtrl",["$scope", "$http", "$location", "Service", 'Authentication',function ($scope, $http, $location, Service, Authentication) {

    $scope.signUpObj=Service.declareSignUpObj();

    $scope.isUsername=function(){
        $scope.usernamePresent=false;
        $http({
            method : "POST",
            url : "/checkUsername",
            data: $scope.signUpObj
        }).then(function(response){
            if((response.data.error==true)&&(response.data.success==false))
                $scope.usernamePresent=true;
        });
    };
    $scope.footer=function(index){
        Service.setIndex(index);
        $location.path('/tabs');
    };


    $scope.createButton= function(){
        $http({
            method : "POST",
            url : "/addUser",
            data: $scope.signUpObj
        }).then(function(response){
            if((response.data.error==false)&&(response.data.success==true)){
                Authentication.saveToken(response.data.token);
                $location.path('/home');
            }
            else{
                var message="Oops! An error. Our apologies.";
                Service.showToast(message);
            }

        });
    };


}]);