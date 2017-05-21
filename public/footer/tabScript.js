/**
 * Created by Shubham on 24-04-2017.
 */
app.controller('tabCtrl', ['$scope', '$http', 'Service', function($scope, $http, Service){
    var index= Service.getIndex();
    $scope.index= parseInt(index);
    $scope.contactObj= Service.declareContactObj();
    $scope.contactFormSubmit= function(event){
        $http({
            method:'POST',
            url: '/createContact',
            data: $scope.contactObj
        }).then(function(response){
            if((response.data.error==false)&&(response.data.success==true)){
                var textContent="We'll reach you shortly through your email.";
                Service.showAlert('Successfully done!',textContent,'contactSubmit','Neat', event)
            }
            else{
                var message='Not able to submit your contact info, try again later.';
                Service.showToast(message);
            }
        })
    }
}]);