module.exports = angular.module('gitme.github', [])
    .factory('GithubResource', require('./GithubResource'))
    .factory('User', require('./User'))
    .factory('Repo', require('./Repo'))
    .factory('GithubService', require('./GithubService'));