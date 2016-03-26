require('angular');
var indexPath = require('./index.html');
module.exports = angular.module('app', [])
    .config(require('./config'));