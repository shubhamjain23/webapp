/**
 * Created by Shubham on 16-03-2017.
 */
module.exports = function () {
    //function to create a user into collection (to register and to invite)
    function create (db, collection, doc, callback) {
        db.collection(collection).insertOne(doc, function (err) {
            callback(err);
        });
    }
    //function to check if user is present in db or not (for signing in)
    function isPresent(db, collection, doc, callback) {
        db.collection(collection).find({$and:[{username:doc.username},{pass:doc.pass}]},{pass:0,question:0,answer:0,_id:0}).toArray(function(err,result){
            callback(err,result);
        })
    }
    //function to check username & return question attribute (forgot password username dialog)
    function findUsername(db, collection, username, callback){
        db.collection(collection).find({username:username},{username:1, question:1,_id:0}).toArray(function(err, results) {
            callback(err,results);
        })
    }
    //function to check username & typed answer (forgot password question answer dialog)
    function matchAnswer(db, collection, doc) {
        var ct=db.collection(collection).count({$and:[{username:doc.username},{answer:doc.answer}]}).then(function (count) {
            return count;
        });
        return ct;
    }
    //function to update password (forgot password change password dialog)
    function updatePassword(db, collection, doc, callback){
        db.collection(collection).updateOne({username:doc.username},{$set:{pass:doc.password}}, function(err){
            callback(err);
        });
    }
    //function to check if username is present (username validation)
    function isUsername(db, collection, username) {
        //console.log(doc);
        var ct=db.collection(collection).count({username:username}).then(function (count) {
            //console.log(count);
            return count;
        });
        return ct;
    }
    //function to list users in search list (home page)
    function listUsers(db, collection, string, sessionUser, callback){
        db.collection(collection).find({$and:[{username:{$regex:string}},{username:{$ne:sessionUser}}]},{username:1,name:1, _id:0}).toArray(function(err, result) {
            callback(err,result);
        })
    }
    /*function listFriends(db, collection, string, sessionUser, callback){
        db.collection(collection).find({$and:[{username:sessionUser},{friends:{$in:[/^string/]}}]},{friends:1, _id:0}).toArray(function(err, result) {
            callback(err,result);
        })
    }*/
    function listFriends(db, collection, sessionUser, callback){
        db.collection(collection).find({username:sessionUser},{friends:1, _id:0}).toArray(function(err, result) {
            callback(err,result);

        });
    }
    function listPendingOnes(db, collection, sessionUser, callback){
        db.collection(collection).find({$and:[{$or:[{fromUser:sessionUser},{toUser:sessionUser}]},{status:"pending"}]},{fromUser:1,toUser:1,_id:0}).toArray(function(err,result){
            callback(err,result);
        });
    }
    function listPendingInvites(db,collection,sessionUser, callback){
        db.collection(collection).find({$and:[{toUser: sessionUser},{isCancelPending:false}]},{fromUser:1,status:1,_id:0}).toArray(function(err,result){
            callback(err,result);
        })
    }
    function listSentInvites(db,collection,sessionUser, callback){
        db.collection(collection).find({$and:[{fromUser: sessionUser},{isCancelSent:false}]},{toUser:1, status:1,_id:0}).toArray(function(err,result){
            callback(err,result);
        })
    }
    function acceptRejectAgainInvitation(db, collection, user1, user2, status, callback){
        db.collection(collection).updateOne({$and:[{fromUser:user1},{toUser:user2}]},{$set:{status:status}}, function(err){
            if(status="accepted"){
                try{
                    db.collection('friends').bulkWrite([
                        {updateOne: {"filter": {username:user1},"update":{$addToSet:{friends:{$each:[user2]}}},"upsert":true}},
                        {updateOne: {"filter": {username: user2},"update":{$addToSet:{friends:{$each:[user1]}}},"upsert":true}}
                    ])
                }
                catch(error){
                    callback(error)
                }
            }
            else {
                callback(err);
            }
        })
    }
    function cancelPending(db, collection, string, sessionUser, callback){
        db.collection(collection).updateOne({$and:[{fromUser:string},{toUser:sessionUser}]},{$set:{isCancelPending:true}}, function(err){
            callback(err);
        })
    }
    function cancelSent(db, collection, sessionUser, string, callback){
        db.collection(collection).updateOne({$and:[{fromUser:sessionUser},{toUser:string}]},{$set:{isCancelSent:true}}, function(err){
            callback(err);
        })
    }
    function withdraw(db, collection, sessionUser, string, callback){
        db.collection(collection).deleteOne({$and:[{fromUser:sessionUser},{toUser:string}]}, function(err){
            callback(err);
        })
    }
    function findConvId(db,collection,sessionUser,clickedUser,callback){
        db.collection(collection).find({$or:[
            {$and:[
                {member1:sessionUser},
                {member2:clickedUser}]
            },
            {$and:[
                {member1:clickedUser},
                {member2:sessionUser}]
            }]},{conversationId:1,_id:0}).toArray(function(err,result){
            callback(err,result);
        })
    }
    function storeMessage(db,collection,room,doc,callback){
        db.collection(collection).updateOne({conversationId:room},{$addToSet:{messages:{$each:[doc]}}},function(err){
            callback(err);
        })
    }
    function getMessages(db,collection,id,callback){
        db.collection(collection).find({conversationId:id},{messages:1,_id:0}).toArray(function(err,result){
            callback(err,result);
        })
    }
    var returnObj = {
        getMessages:getMessages,
        findConvId: findConvId,
        storeMessage: storeMessage,
        create: create,
        listUsers: listUsers,
        listFriends: listFriends,
        listPendingInvites: listPendingInvites,
        listSentInvites: listSentInvites,
        listPendingOnes: listPendingOnes,
        acceptRejectAgainInvitation: acceptRejectAgainInvitation,
        cancelPending: cancelPending,
        cancelSent: cancelSent,
        withdraw: withdraw,
        isPresent: isPresent,
        isUsername:isUsername,
        findUsername: findUsername,
        matchAnswer: matchAnswer,
        updatePassword: updatePassword
    };
    return returnObj
};
