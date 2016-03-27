var template = require('./user-search.html');
function UserSearchDrv(){
    return {
        restrict: 'E',
        scope: {},
        controller: require('./user-search.ctrl.js'),
        controllerAs: 'searchCtrl',
        templateUrl: template
    };
}
module.exports = UserSearchDrv;