/**
 * Created by Shubham on 16-05-2017.
 */
//code in work
app.controller('chatCtrl',['$http','$scope','Service', 'socket',function($http,$scope, Service, socket){

    $scope.messages=Service.getMessages();

    $scope.sendMessage= function(){
        console.log("inSendMessage");
        socket.emit('chat message', {
            'message': $scope.obj
        })
    };
    socket.on('chat message', function(data) {
        console.log(data);
        $scope.message=data.message;

    });
}]);