/**
 * Created by Shubham on 09-04-2017.
 */
app.controller("homeCtrl",["$scope", "$http","$mdDialog", '$rootScope', "Service" ,function ($scope, $http, $mdDialog, $rootScope, Service) {
    if($rootScope.object[0]){
        $mdDialog.show({
            controller: 'ProfileCtrl',
            templateUrl: 'profile.template.html',
            parent: angular.element(document.body),
            fullscreen: true
        })
    }
    $scope.value=false;
    $scope.accepted=false;
    $scope.rejected=false;
    $scope.done=false;
    $scope.isInviteSent=false;
    $scope.ob={search:""};
    $scope.people = [];
    $scope.searchFn= function(){
        $http({
            method : "POST",
            url : "/search",
            data: $scope.ob
        }).then(function(response){
            $scope.people=(response.data);
        });
    };
    $scope.goToUser = function(user, event) {
        var title=user;
        var textContent='Imagine that you have been navigating to ' + user + ' profile.';
        var ariaLabel='User inspect';
        var ok='Neat!';
        Service.showAlert(title, textContent, ariaLabel, ok, event);
    };
    $scope.sendInvitation = function(user, event) {
        var obj={toUser:user};
        $http({
            method : "POST",
            url : "/sendInvitation",
            data: obj
        }).then(function(response){
            if((response.data.error==false)&&(response.data.success==true)){
                $scope.isInviteSent=true;
                var title="Sent";
                var textContent="Invitation sent to "+ user +".";
                var ariaLabel="Invitation sent";
                var ok="Ok";
                Service.showAlert(title, textContent, ariaLabel, ok, event);
            }
            else{
                var message="Not able to send invitation, sorry.";
                Service.showToast(message);
            }
        });
    };
    $scope.showPendingInvites=function(){

        $http({
            method : "GET",
            url : "/showPendingInvites"
        }).then(function(response) {
            $scope.value=!$scope.value;
            $scope.pendingInvites=response.data;
            $scope.showSentInvites=function(){
                $http({
                    method : "GET",
                    url : "/showSentInvites"
                }).then(function(response) {
                    $scope.sentInvites=response.data;
                });
            }
        });
    };
    $scope.acceptInvitation= function(user){
        var obj={user:user};
        $http({
            method:"POST",
            url:'/acceptInvitation',
            data:obj
        }).then(function(response){
            if((response.data.error==false)&&(response.data.success==true)){
                $scope.accepted=true;
                $scope.rejected=true;
                $scope.done=true;
            }
            else{
                var message="Not able to accept invitation, try again later.";
                Service.showToast(message);
            }
        })
    };
    $scope.rejectInvitation=function(user){
        var obj={user:user};
        $http({
            method:"POST",
            url:'/rejectInvitation',
            data: obj
        }).then(function(response){
            if((response.data.error==false)&&(response.data.success==true)){
                $scope.accepted=true;
                $scope.rejected=true;
            }
            else{
                var message="Not able to cancel invitation, try again later.";
                Service.showToast(message);
            }
        })
    };
    $scope.cancelPending= function(user){
        var obj={user:user};
        $http({
            method:'POST',
            url:'/cancelPending',
            data:obj
        }).then(function(response){
            if((response.data.error==false)&&(response.data.success==true)){
                $scope.showPendingInvites();
            }
            else{
                var message="Not able to delete invitation, try again later.";
                Service.showToast(message);
            }

        })
    };
    /*
    $('#sandbox-container .input-group.date').datepicker({
        startView: 2,
        maxViewMode: 3
    });*/
}]);
app.controller('inviteCtrl', ['$scope','$http', '$mdDialog', 'data', function($scope, $http, $mdDialog, data){
    $scope.pendingInvites=data;
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.showSentInvites=function(){
        $http({
            method : "GET",
            url : "/showSentInvites"
        }).then(function(response) {
            console.log(response.data);
            $scope.sentInvites=response.data;
        });
    };
    $scope.cancelSent= function(user){
        var obj={user:user};
        $http({
            method:'POST',
            url:'/cancelSent',
            data:obj
        }).then(function(response){
            if((response.data.error==false)&&(response.data.success==true)){
                $scope.showSentInvites();
            }
            else{
                var message="Not able to delete invitation, try again later.";
                Service.showToast(message);
            }
        })
    };
    $scope.withdraw=function(user){
        var obj={user:user};
        $http({
            method:'POST',
            url:'/withdraw',
            data:obj
        }).then(function(response){
            if((response.data.error==false)&&(response.data.success==true)){
                $scope.showSentInvites();
            }
            else{
                var message="Not able to cancel request, try again later.";
                Service.showToast(message);
            }
        })
    };
}]);
app.controller('ProfileCtrl',['$scope', '$http', '$mdDialog', function($scope, $http, $mdDialog){
    $scope.closeProfile = function() {
        $mdDialog.cancel();
    };
}]);