/**
 * Created by Shubham on 16-05-2017.
 */
app.controller('chatCtrl',['$http','$scope','Service', 'socket',function($http,$scope, Service, socket){
    $scope.messages=Service.getMessages();
    $scope.sendMessage= function(){
        $http({
            method:'POST',
            url:'/sendMessage',
            data:$scope.obj
        }).then(function(response){
            if(response.status=="ok"){
                socket.emit('message', {

                    'message': $scope.obj
                });
            }
        })
    };
    socket.on('send', function(data) {
        console.log(data);
        $scope.message=data.message;

    });
}]);