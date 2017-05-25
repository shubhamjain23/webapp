/**
 * Created by Shubham on 16-05-2017.
 */
//code in work
app.controller('chatCtrl',['$http','$scope','Service', 'socket',function($http,$scope, Service, socket){

    var messages=Service.getMessages();
    $scope.messages=messages;

    $scope.sendMessage= function(){
        $http({
            method:'GET',
            url: '/getSessionUser'
        }).then(function(response){
           if(response.data!=null){
               socket.emit('chat message', {
                   'user':response.data,
                   'messageText': $scope.obj.messageText,
                   'timestamp':new Date().toLocaleString()
               })
           }
        });
    };
    socket.on('chat message', function(data) {        
        messages.push(data);
        console.log(data);
        $scope.messages=messages;
        console.log($scope.messages);
    });
}]);