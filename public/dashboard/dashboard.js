/**
 * Created by Shubham on 28-04-2017.
 */
app.controller('DashboardCtrl', ["$scope", "$http", "$mdDialog", "$rootScope", "$location", "Service" ,function ($scope, $http, $mdDialog, $rootScope, $location, Service) {

    //var socket=io('http://localhost');
    $scope.goToChat= function(user){
        var obj={user:user};
        $http({
            method:'POST',
            url: '/restoreOldMessages',
            data: obj
        }).then(function(response){
            Service.setMessages(response.data);
            $location.path('chatPage');
        })
    };














    $scope.openMenu = function($mdMenu, ev) {
        $mdMenu.open(ev);
    };
    /*if($rootScope.object[0]){
     $mdDialog.show({
     controller: 'ProfileCtrl',
     templateUrl: 'profile.template.html',
     parent: angular.element(document.body),
     fullscreen: true
     })
     }*/
    $scope.value=false;
    $scope.accepted=false;
    $scope.rejected=false;
    $scope.done=false;
    $scope.ob={search:""};
    $scope.people = [];
    $scope.isPendingInvites=false;
    $scope.isSentInvites=false;
    $scope.isShowSent=false;
    $scope.searchFn= function($mdMenu,ev){
        if($scope.ob.search.replace(/ /g,"").length>3) {
            $http({
                method: "POST",
                url: "/search",
                data: $scope.ob
            }).then(function (response) {
                if (response.data.length != 0) {
                    $mdMenu.open(ev);
                    $scope.people = (response.data);
                }
            });
        }
    };

    $scope.goToUser = function(user, event) {
        console.log("abcde")
        var title=user;
        var textContent='Imagine that you have been navigating to ' + user + ' profile.';
        var ariaLabel='User inspect';
        var ok='Ok';
        Service.showAlert(title, textContent, ariaLabel, ok, event);
    };


    $scope.sendInvitation = function(user, event) {
        var obj={user:user};
        $http({
            method : "POST",
            url : "/sendInvitation",
            data: obj
        }).then(function(response){
            if((response.data.error==false)&&(response.data.success==true)){
                var message="Invitation sent.";
                Service.showToast(message);
            }
            else{
                var message="Not able to send invitation, sorry.";
                Service.showToast(message);
            }
        });
    };
    $scope.sendInvitationAgain=function(user){
        var obj={user:user}
        $http({
            method : "POST",
            url : "/sendInvitationAgain",
            data: obj
        }).then(function(response){
            if((response.data.error==false)&&(response.data.success==true)){
                var message="Invitation sent.";
                Service.showToast(message);
            }
            else{
                var message="Not able to send invitation, sorry.";
                Service.showToast(message);
            }
        });
    }
    $scope.openInvites=function($mdMenu, event) {
        $http({
            method: "GET",
            url: "/showPendingInvites"
        }).then(function (response) {
            if (response.data.length != 0) {
                isPendingInvites = true;
                $scope.pendingInvites = response.data;
            }
            $mdMenu.open(event);
        });
        $scope.showPendingInvites = function () {
            $http({
                method: "GET",
                url: "/showPendingInvites"
            }).then(function (response) {
                $scope.isShowSent=false;
                if (response.data.length != 0) {
                    isPendingInvites = true;
                    $scope.pendingInvites = response.data;
                }
            });
        };
        $scope.showSentInvites = function () {
            $http({
                method: "GET",
                url: "/showSentInvites"
            }).then(function (response) {
                $scope.isShowSent = true;
                if (response.data.length != 0) {
                    $scope.isSentInvites = true;
                    $scope.sentInvites = response.data;
                }
            });

        };
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
    $scope.logOut=function(){
        $http({
            method: 'GET',
            url: '/logOut'
        }).then(function(response){
            if(response.data=="success")
                $location.path('/');
        })
    };
}]);