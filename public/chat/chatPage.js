/**
 * Created by Shubham on 16-05-2017.
 */
//code in work
app.controller('chatCtrl',['$http','$scope','Service', 'socket',function($http,$scope, Service, socket){

    $scope.messages=Service.getMessages();

    $scope.sendMessage= function(){
        console.log("inSendMessage chatPage.js");
        $http({
            method:'GET',
            url: '/getSessionUser'
        }).then(function(response){
           if(response.data!=null){
               var timestamp= Date.now();
               socket.emit('chat message', {
                   'user':response.data,
                   'messageText': $scope.obj.messageText,
                   'timestamp':timestamp
               })
           }
        });

    };
    socket.on('chat message', function(data) {
        $scope.message=data.message;

    });
}]);