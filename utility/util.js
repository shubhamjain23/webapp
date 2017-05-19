/**
 * Created by Shubham on 06-04-2017.
 */
module.exports = function() {

    function sendResponse(){
        var obj={
            error:false,
            errorMsg:"Error occurred.",
            success:true,
            successMsg:"Hurray, success.",
            responseObj:[]
        };
        return obj;
    }
    function declareInvitationObj(){
        var invitationObj={
            fromUser:"",
            toUser:"",
            status:"pending",
            isCancelPending:false,
            isCancelSent:false,
            isBlocked:false
        };
        return invitationObj;
    }
    function getConnectionId(user, sessionUser){
        var connectionId="~"+user+"~"+sessionUser+"~";
        return connectionId;
    }
    var returnObj= {
        sendResponse: sendResponse,
        declareInvitationObj: declareInvitationObj,
        getConnectionId: getConnectionId
    };
    return returnObj;
};