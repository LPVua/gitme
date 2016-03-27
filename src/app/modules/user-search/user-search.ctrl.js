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
        user: false,
        repos: false
    };

    // loades state for users and repos list
    this.loaded = {
        repos: false
    };

    this.page = 1;

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
            self.page = 1;
            self.loaded.repos = false;
        });
    }

    this.loadReposPage = function(){
        if (this.loaded.repos) {
            return;
        }
        this.loading.repos = true;
        this.page++;
        GithubService.searchRepos(this.users[0], 20, this.page).then(function(repos){
            if (!repos.length) {
                this.loading.repos = false;
                this.loaded.repos = true;
            }
            self.repos = [...self.repos, ...repos];
            this.loading.repos = false;
        }.bind(this));
    }
}
UserSearchCtrl.$inject = ['GithubService'];
module.exports = UserSearchCtrl;