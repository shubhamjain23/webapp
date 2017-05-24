/**
 * Created by Shubham on 11-03-2017.
 */
app.service("Service", ["$mdDialog","$mdToast","$q","$http", function($mdDialog,$mdToast,$q,$http){
    function isLoggedIn(){
        return $q(function(resolve,reject){
            $http({
                method:'GET',
                url: '/isLoggedIn'
            }).then(function(response){
                setTimeout(function() {
                    resolve(response.data.isLoggedIn);
                }, 1000);
            });

        })
    }
    function declareSignInObj() {
        var signInObj = {
            username: "",
            pass: ""
        };
        return signInObj;
    }
    function declareSignUpObj() {
        var signUpObj = {
            username: "",
            pass: "",
            question:"",
            answer: "",
            name:"",
            dob:"",
            gender:"",
            email:""
        };
        return signUpObj;
    }
    function declareContactObj() {
        var contactObj = {
            name: "",
            email: "",
            subject:"",
            para: ""
        };
        return contactObj;
    }
    function showToast(message) {
        $mdToast.show(
            $mdToast.simple()
                .textContent(message)
                .position('top left' )
                .hideDelay(1500)
        );
    }
    function showAlert(title, textContent, ariaLabel, ok, event){
        $mdDialog.show(
            $mdDialog.alert()
                .title(title)
                .textContent(textContent)
                .ariaLabel(ariaLabel)
                .ok(ok)
                .targetEvent(event)
        );
    }
    var index=0;
    function setIndex(i){
        index = i;
    }
    function getIndex(){
        return index;
    }
    var messages;
    function setMessages(message){
        messages=message;
    }
    function getMessages(){
        return messages;
    }
    var returnObj={
        isLoggedIn: isLoggedIn,
        declareSignInObj:declareSignInObj,
        declareSignUpObj:declareSignUpObj,
        declareContactObj: declareContactObj,
        showToast:showToast,
        showAlert:showAlert,
        setIndex:setIndex,
        getIndex: getIndex,
        setMessages: setMessages,
        getMessages: getMessages
    };
    return returnObj;
}]);