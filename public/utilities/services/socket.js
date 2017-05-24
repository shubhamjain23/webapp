/**
 * Created by Shubham on 21-05-2017.
 */
app.factory('socket', [function() {
    var socket = io();
    return {
        on: function (eventName, callback) {
            socket.on(eventName, callback);
        },
        emit: function (eventName, data) {
            socket.emit(eventName, data);
        }
    };
}]);