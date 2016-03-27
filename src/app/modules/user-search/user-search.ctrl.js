function UserSearchCtrl(GithubService){
    var self = this;
    this.users = [];
    this.repos = [];

    this.form = {
        userName: '',
        focused: true,
        disabled: false
    };

    // loading states for users and repos list
    this.loading = {
        user: false
    };

    /**
     * Adds user to users array; refreshes repos
     */
    this.addUser = function(){
        this.form.disabled = true;
        this.loading.user = true;
        GithubService.getUser(this.form.userName)
            .then(function(user){
                // clear and enable input
                this.form.userName = '';
                this.form.disabled = false;
                // if user with such id already exists then do nothing
                if (_.find(this.users, (u) => u.id === user.id)) {
                    return;
                }
                this.users.push(user);
                // get user stars count
                GithubService.countStars(user).then(function(starsCount){
                    user.starsCount = starsCount;
                    this.users = _.orderBy(this.users, ['starsCount'], ['desc']);
                }.bind(this));
                // get user repos
                getRepos(user);

            }.bind(this))
            .finally(function(){
                this.loading.user = false;
            }.bind(this));
    };

    this.deleteUser = function(user){
        var index = this.users.indexOf(user);
        this.users.splice(index, 1);
        if (!index && this.users.length === 1) {
            getRepos(this.users[0]);
        }
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