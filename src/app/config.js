var credentials = require('./config/credentials');
function config(GithubResourceProvider){
    GithubResourceProvider.setAccessToken(credentials.github.access_token);
}
config.$inject = ['GithubResourceProvider'];
module.exports = config;