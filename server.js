/**
 * Created by Shubham on 07-03-2017.
 */


var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var assert= require('assert');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var session=require('express-session');
var _=require('lodash');


var dburl = 'mongodb://localhost:27017/mydb';
var crud= require('./dbutil/CRUD')();
var util=require('./server/util')();
var db;

MongoClient.connect(dburl, function(err, database) {
    assert.equal(null, err);
    db = database;
    http.listen(6768);
});

app.use('/lib',express.static('libs'));
app.use('/static', express.static('public'));

app.use('/node_modules', express.static('node_modules'));
app.use('/server', express.static('server'));
app.use(session({
    secret:"S3cR3t",
    resave:true,
    saveUninitialized:true}));
app.use(bodyParser.json());

io.on('connection', function (socket) {//code in work
    var room=util.getConversationId();
    socket.join(room);
    console.log("joined");
    socket.on('chat message', function (data) {
        io.to(room).emit('chat message', data);
    });
});

app.post('/restoreOldMessages',function(req,res){//code in work
    util.setConversationId(db,'conversation',req.session.user,req.body);
    var conversationId=util.getConversationId();
    var msg="msg";
    res.send(msg);
});

app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname + '/public/main/index.html'));
});
app.get('/isLoggedIn',function(req,res){ //to check user is logged in or not at routing(resolve)
    if(req.session.user)
        res.send({"isLoggedIn":true});
    else
        res.send({"isLoggedIn":false});
});

app.get('/showPendingInvites', function(req,res){
    crud.listPendingInvites(db,'invitation', req.session.user, function(err,result){
        res.send(result);
    })
});
app.get('/showSentInvites', function(req,res){
    crud.listSentInvites(db,'invitation', req.session.user, function(err,result){
        res.send(result);
    })
});
app.get('/logout', function(req,res){
    req.session.destroy();
    console.log("Session destroyed");
    res.send("success");
});
app.post('/acceptInvitation', function(req,res){
    crud.acceptRejectAgainInvitation(db, 'invitation', req.body.user, req.session.user, 'accepted', function(err){
        var obj= util.sendResponse();
        if (err!=null){
            obj.error = true;
            obj.success = false;
        }
        res.send(obj);
    })

});
app.post('/rejectInvitation', function(req,res){
    crud.acceptRejectAgainInvitation(db, 'invitation', req.body.user, req.session.user, 'rejected', function(err){
        var obj= util.sendResponse();
        if (err!=null){
            obj.error = true;
            obj.success = false;
        }
        res.send(obj);
    })
});
app.post('/sendInvitationAgain', function(req,res){
    crud.acceptRejectAgainInvitation(db, 'invitation', req.session.user, req.body.user, "pending", function(err){
        var obj= util.sendResponse();
        if (err!=null){
            obj.error = true;
            obj.success = false;
        }
        res.send(obj);
    });
});
app.post('/cancelPending', function(req,res){
    crud.cancelPending(db, 'invitation', req.body.user, req.session.user, function(err){
        var obj= util.sendResponse();
        if (err!=null){
            obj.error = true;
            obj.success = false;
        }
        res.send(obj);
    })
});
app.post('/cancelSent', function(req,res){
    crud.cancelSent(db, 'invitation', req.session.user, req.body.user, function(err){
        var obj= util.sendResponse();
        if (err!=null){
            obj.error = true;
            obj.success = false;
        }
        res.send(obj);
    })
});
app.post('/withdraw', function(req,res){
    crud.withdraw(db,'invitation',req.session.user,req.body.user,function(err){
        var obj=util.sendResponse();
        if(err!=null){
            obj.error=true;
            obj.success=false;
        }
        res.send(obj);
    })
});
app.post('/addUser', function (req,res) {
    crud.create(db, 'userAdd', req.body, function(err){
        var obj= util.sendResponse();
        if (err!=null){
            obj.error = true;
            obj.success = false;
        }
        else if(err==null) {
            req.session.user = req.body.username;
            console.log("Session created for "+ req.session.user);
        }
        res.send(obj);
    });
});
app.post('/checkUser', function (req,res) {
    crud.isPresent(db, 'userAdd', req.body, function(err,result){
        var obj=util.sendResponse();
        if(err!=null){
            obj.error=true;
            obj.success=false;
        }
        else {
            if (result.length == 1) {
                req.session.user=req.body.username;
                console.log("Session created for "+ req.session.user);
                obj.responseObj = result;
            }
            else{
                obj.error=true;
                obj.success=false;
            }
        }
        res.send(obj);
    })
});
app.post('/forgot',function(req,res){
    crud.findUsername(db, 'userAdd', req.body.username, function(err, result){
        res.send(result);
    })
});
app.post('/matchAnswer',function(req,res){
    crud.matchAnswer(db, 'userAdd', req.body).then(function (count){
        var obj= util.sendResponse();
        if(count!=1){
            obj.error=true;
            obj.success=false;
        }
        res.send(obj);
    })
});
app.post('/updatePassword', function(req,res){
    crud.updatePassword(db, 'userAdd', req.body, function(err){
        var obj= util.sendResponse();
        if (err!=null){
            obj.error = true;
            obj.success = false;
        }
        res.send(obj);
    })
});
app.post('/createContact', function(req,res){
    crud.create(db,'contact',req.body,function(err){
        var obj=util.sendResponse();
        if(err!=null){
            obj.error=true;
            obj.success=false;
        }
        res.send(obj);
    })
});
app.post('/checkUsername', function (req,res) {
    crud.isUsername(db, 'userAdd', req.body.username).then(function(count){
        var obj= util.sendResponse();
        if(count!=0) {
            obj.error = true;
            obj.success = false;
        }
        res.send(obj);

    });
});
app.post('/search', function(req,res){
    var result1=[],result2=[],result3=[],results=[];

    crud.listUsers(db,'userAdd', req.body.search, req.session.user, function(err,result){
        result1=result1.concat(result);
        crud.listFriends(db, 'friends', req.session.user, function (err, result) {
            result2 = result2.concat(result);
            crud.listPendingOnes(db,'invitation',req.session.user,function(err,result){
                result3=result3.concat(result);
                for(var i=0;i<result1.length;i++){
                    if(result2.length!=0) {
                        for (var j = 0; j < result2[0].friends.length; j++) {
                            if (result1[i].username == result2[0].friends[j]) {
                                result1[i].isFriend = true;//chat option
                                results.push(result1[i]);
                            }
                        }
                    }
                    if(result3.length!=0) {
                        for (var j = 0; j < result3.length; j++) {
                            if (result1[i].username == result3[j].fromUser) {
                                result1[i].isFromUser = true;//accept invitation option
                                results.push(result1[i]);
                            }
                            if (result1[i].username == result3[j].toUser) {
                                result1[i].isToUser = true;//check circle option
                                results.push(result1[i]);
                            }
                        }
                    }
                }
                results=results.concat(result1);
                results= _.uniqBy(results,'username');
                res.send(results);
            })
        });
    });
});
app.post('/sendInvitation', function (req,res) {
    var invitationObj= util.declareInvitationObj();
    invitationObj.fromUser= req.session.user;
    invitationObj.toUser= req.body.user;
    crud.create(db, 'invitation', invitationObj, function(err){
        var obj= util.sendResponse();
        if (err!=null){
            obj.error = true;
            obj.success = false;
        }
        res.send(obj);
    });
});