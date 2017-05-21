/**
 * Created by Shubham on 06-03-2017.
 */
app.controller('mainCtrl',['$scope', '$http', '$location', '$mdDialog', '$rootScope', 'Service' ,function ($scope, $http , $location, $mdDialog, $rootScope,Service) {
    $scope.value=false;

    $scope.forgot={
        username:'',
        answer:'',
        password:''
    };
    $scope.signInObj= Service.declareSignInObj();

    $scope.toRegister = function(){
        $location.path('/register');
    };
    $scope.footer=function(index){
        Service.setIndex(index);
        $location.path('/tabs');
    };
    $scope.loginClick=function(){
        $http({
            method : 'POST',
            url : '/checkUser',
            data: $scope.signInObj
        }).then(function(response){
            if((response.data.error==false)&&(response.data.success==true)){
                $rootScope.object=response.data.responseObj;
                $location.path('/home')
            }
            else {
                $scope.signInObj.username="";
                $scope.signInObj.pass="";
                $scope.value = true;
            }
        });
    }
    $scope.showForgotDialog = function(event) {
        //Service.showCustomDialog(DialogController, url, event);
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialog1.tmpl.html',
            parent: angular.element(document.body),
            //targetEvent: event,
            fullscreen: true
        })
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.showQuestionDialog = function(event) {
            $scope.showError=false;
            $http({
                method : 'POST',
                url : '/forgot',
                data: $scope.forgot
            }).then(function(response) {
                $scope.data = response.data;
                if(response.data.length==1){
                    //Service.showCustomDialog(DialogController, url, event);
                    $mdDialog.show({
                        controller: 'Ctrl',
                        templateUrl: 'dialog2.tmpl.html',
                        parent: angular.element(document.body),
                        targetEvent: event,
                        fullscreen: true,
                        locals:{
                            data:$scope.data,
                            forgot:$scope.forgot
                        }
                    })
                }
                else if(response.data.length!=1){
                    $scope.showError = true;
                }
                else{
                    var message='Oops, an error. Try again later.';
                    Service.showToast(message);
                }
            });
        };

    }

}]);
app.controller('Ctrl', [ '$scope', '$http', '$mdDialog', 'Service', 'data', 'forgot',function($scope, $http, $mdDialog, Service, data, forgot){
    $scope.data=data;
    $scope.forgot=forgot;

    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.changePasswordDialog = function(event) {
        $http({
            method : 'POST',
            url : '/matchAnswer',
            data: $scope.forgot
        }).then(function(response) {
            if ((response.data.error == false) && (response.data.success == true)){
                //Service.showCustomDialog(DialogController, url, event);
                $mdDialog.show({
                    controller: 'secondCtrl',
                    templateUrl: 'dialog3.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    fullscreen: true,
                    locals:{
                        forgot:$scope.forgot
                    }

                })
            }
            else {
                var message='Wrong answer. If not, contact us.';
                Service.showToast(message);
            }
        });
    };

}]);
app.controller('secondCtrl',[ '$scope', '$http', '$mdDialog', 'Service', 'forgot', function($scope, $http, $mdDialog, Service, forgot){
    $scope.forgot=forgot;

    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.passwordChangedDialog = function(event) {
        $http({
            method : 'POST',
            url : '/updatePassword',
            data: $scope.forgot
        }).then(function(response) {
            if ((response.data.error == false) && (response.data.success == true)){
                var textContent='You have successfully changed your password.';
                var ariaLabel='password changed';
                Service.showAlert('Success', textContent, ariaLabel, 'Ok', event);
            }
            else {
                var message='Oops, an error. Try again later.';
                Service.showToast(message);
            }
        });
    }
}]);