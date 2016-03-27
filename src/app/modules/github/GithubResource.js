function GithubResource(){
    var access_token = null;
    this.setAccessToken = function(token){
        access_token = token || null;
    };
    this.$get = ['$resource', function($resource){
        return $resource('https://api.github.com/:entity/:entityId/:entityRelation/:relationId',
            {
                entityId: '@id',
                access_token: access_token
            },
            {
                user: {
                    method: 'GET',
                    params: {
                        entity: 'users'
                    }
                },
                repos: {
                    method: 'GET',
                    params: {
                        entity: 'users',
                        entityRelation: 'repos',
                        sort: 'stars'
                    },
                    isArray: true
                },
                search: {
                    method: 'GET',
                    params: {
                        entity: 'search'
                    }
                }
            }
        );
    }]
}

module.exports = GithubResource;