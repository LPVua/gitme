function UserSearchCtrl(GithubService){
    var self = this;
    this.users = [];
    this.repos = [];

    this.form = {
        userName: ''
    };

    this.addUser = function(){
        GithubService.getUser(this.form.userName)
            .then(function(user){
                this.users.push(user);
                // get user stars count
                GithubService.countStars(user).then(function(starsCount){
                    user.starsCount = starsCount;
                    this.users = _.orderBy(this.users, ['starsCount'], ['desc']);
                }.bind(this));
                // get user repos
                getRepos(user);

            }.bind(this));
        this.form.userName = '';
    };

    this.deleteUser = function(user){
        var index = this.users.indexOf(user);
        this.users.splice(index, 1);
    };

    /**
     * Initializes repos array
     * @param user
     */
    function getRepos(user){
        GithubService.searchRepos(user).then(function(repos){
            self.repos = repos;
        });
    }
}
UserSearchCtrl.$inject = ['GithubService'];
module.exports = UserSearchCtrl;