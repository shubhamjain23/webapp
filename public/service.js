/**
 * Created by Shubham on 11-03-2017.
 */
app.service("Service", ["$mdDialog","$mdToast", function($mdDialog,$mdToast){
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
    /*function showCustomDialog(DialogController, url, event){
        $mdDialog.show({
            controller: DialogController ,
            templateUrl: url ,
            parent: angular.element(document.body),
            targetEvent: event ,
            openFrom:('#left'),
            closeTo:(angular.element(document.querySelector('#right'))),
            fullscreen: true // Only for -xs, -sm breakpoints.
        })
    }*/
    var returnObj={
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