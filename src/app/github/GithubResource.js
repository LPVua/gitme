function GithubResource($resource){
    return $resource('https://api.github.com/:entity/:entityId/:entityRelation/:relationId',
        {
            entityId: '@id',
            access_token: '8a5050af67a4b4297ede90a23158c1aad74d1f1b'
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
}
module.exports = GithubResource;