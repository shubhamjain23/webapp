/**
 * Created by Shubham on 06-04-2017.
 */
module.exports = function() {
    var crud= require('./../dbutil/CRUD')(),
        jwt=require('jsonwebtoken');
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
    var id='default';
    function checkOrSetConversationId(db,collection,sessionUser, clickedUser,callback){
        crud.findConvId(db,collection,sessionUser,clickedUser,function(err,result){
            if(err!=null)
                callback(err);
            else {
                if (result.length == 1){
                    id=result[0].conversationId;
                    callback(err);
                }
                else if(result.length!=0&&result.length!=1)
                    {
                        console.log("error occurred util.js 37");
                        callback(err);
                    }
                else {
                    var doc={
                        conversationId:new require('bson').ObjectID().toString(),
                        member1:sessionUser,
                        member2:clickedUser,
                        messages: []
                    };
                    crud.create(db,collection,doc,function(err){
                        if(!err){
                            console.log("conversation id stored");
                            id=doc.conversationId;
                        }
                    });
                    callback(err);
                }
            }
        });
    }
    function getConversationId(){
        return id;
    }
    function generatejwt(username){
        return jwt.sign({
            username: username,
        }, "Secret1549846kjbyewg87gfweliuvywf7u3");
    }
    var returnObj= {
        sendResponse: sendResponse,
        declareInvitationObj: declareInvitationObj,
        getConversationId: getConversationId,
        checkOrSetConversationId: checkOrSetConversationId,
        generatejwt: generatejwt
    };
    return returnObj;
};