module.exports = angular.module('gitme.github', [])
    .provider('GithubResource', require('./GithubResource'))
    .factory('User', require('./User'))
    .factory('Repo', require('./Repo'))
    .factory('GithubService', require('./GithubService'));