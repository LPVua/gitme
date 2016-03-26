require('../index.html'); // application entry point
require('./sass/normalize.scss');
require('./sass/app.scss');


require('angular');
require('angular-resource');
require('lodash');

// app modules
require('./ng-enter/ng-enter.drv');
require('./github/github.mdl');
require('./user-search/user-search.mdl');

module.exports = angular.module('app', [
        'gitme.user-search',
        'ngEnter',
        'ngResource',
        'gitme.github'
    ])
    .config(require('./config'));