require('../index.html'); // application entry point
require('./sass/normalize.scss');
require('./sass/app.scss');


require('angular');
require('angular-resource');
require('angular-animate');
require('lodash');

// app modules
require('./modules/ng-enter/ng-enter.drv');
require('./modules/focus/focus.drv');
require('./modules/github/github.mdl');
require('./modules/user-search/user-search.mdl');

module.exports = angular.module('app', [
        'ngAnimate',
        'gitme.user-search',
        'ngEnter',
        'ngResource',
        'gitme.github',
        'ngFocus'
    ])
    .config(require('./config'));