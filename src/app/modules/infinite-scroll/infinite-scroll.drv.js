angular.module('infiniteScroll', [])
    .directive('infiniteScroll', ["$window", function($window){
        return {
            link: function(scope, element, attrs){
                var offset = parseInt(attrs.threshold) || 0;
                var e = $window;
                angular.element($window).bind('scroll', function(){
                    if (scope.$eval(attrs.canLoad) && e.innerHeight >= element[0].getBoundingClientRect().bottom - offset) {
                        scope.$apply(attrs.infiniteScroll);
                    }
                });
            }
        };
    }]);