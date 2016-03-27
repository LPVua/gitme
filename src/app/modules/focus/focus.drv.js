function focusDrv(){
    return {
        restrict: 'A',
        scope: {
            ngFocus: '='
        },
        link: function(scope, el){

            scope.$watch('ngFocus', function(focus){
                if (focus) {
                    el[0].focus();
                    scope.ngFocus = false;
                }
            }, true);
        }
    }
}
angular.module('ngFocus', [])
    .directive('ngFocus', focusDrv);