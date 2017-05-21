/**
 * Created by Shubham on 21-05-2017.
 */
app.directive('disallowSpaces', function() {
    return {
        restrict: 'A',

        link: function($scope, $element) {
            $element.bind('input', function() {
                $(this).val($(this).val().replace(/ /g, ''));
            });
        }
    };
});
app.directive('disallowUppercase', function() {
    return {
        restrict: 'A',

        link: function($scope, $element) {
            $element.bind('input', function() {
                $(this).val($(this).val().toLowerCase());
            });
        }
    };
});