/**
 * Created by Shubham on 06-04-2017.
 */
module.exports = function() {
    var crud= require('./../dbutil/CRUD')();
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
    function setConversationId(db,collection,sessionUser, clickedUser){
        var doc={
            conversationId:new require('bson').ObjectID().toString(),
            member1:sessionUser,
            member2:clickedUser,
            messages: {
                fromUser:"",
                messageText:"",
                timestamp:""
            }
        };
        crud.create(db,collection,doc,function(err){
            if(!err)
            console.log("conversation id stored")
        });
    }
    function getConversationId(){
    //mongodb query to get conversation id
        var conversationId="id";
        console.log(conversationId);
        return conversationId;
    }
    var returnObj= {
        sendResponse: sendResponse,
        declareInvitationObj: declareInvitationObj,
        getConversationId: getConversationId,
        setConversationId: setConversationId
    };
    return returnObj;
};