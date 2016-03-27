function GithubService(GithubResource, $q, User, Repo){

    let self = {};

    /**
     * Fetches user from api
     * @param username
     * @returns {Promise}
     */
    self.getUser = function(username){
        let deferred = $q.defer();
        GithubResource.user({
            entityId: username
        }, function(resource){
            deferred.resolve(new User(resource))
        }, function(error){
            deferred.reject(error);
        });
        return deferred.promise;
    };

    /**
     * Fetches user repos
     * @param user
     * @param perPage
     * @param page
     * @returns {Promise}
     */
    self.getRepos = function(user, perPage = 20, page = 1){
        var deferred = $q.defer();
        GithubResource.repos({
            entityId: user.nick,
            per_page: perPage,
            page: page
        }, function(resource){
            deferred.resolve(_.map(resource, (repo) => new Repo(repo)));
        });
        return deferred.promise;
    };

    self.searchRepos = function(user, perPage = 20, page = 1){
        var deferred = $q.defer();
        GithubResource.search({
            entityId: 'repositories',
            q: 'user:' + user.nick,
            sort: 'stars',
            page: page,
            per_page: perPage
        }, function(resource){
            deferred.resolve(_.map(resource.items, (repo) => new Repo(repo)));
        });
        return deferred.promise;
    };

    /**
     * Fetches stars count
     * @param user
     * @returns {*}
     */
    self.countStars = function(user){
        let deferred = $q.defer();
        let starsCount = 0;
        let pages = Math.ceil(user.reposCount / 100);
        let requests = [];
        if (!user.reposCount) {
            deferred.resolve(0);
            return deferred.promise;
        }
        while (pages) {
            requests.push(self.getRepos(user, 100, pages));
            pages--;
        }
        $q.all(requests).then(function(resArr){
            _.forEach(resArr, function(promises){
                starsCount += _.reduce(promises, (res, val) => res + (val.starsCount || 0), 0);
            });

            deferred.resolve(starsCount);
        });
        return deferred.promise;
    };

    return self;
}
GithubService.$inject = ['GithubResource', '$q', 'User', 'Repo'];
module.exports = GithubService;