function UserFactory(){
    class User {
        constructor(user = {}){
            this.id = user.id;
            this.name = user.name || user.login || '';
            this.avatar = user.avatar_url || '';
            this.company = user.company || '';
            this.email = user.email || '';
            this.nick = user.login || '';
            this.subscribersCount = user.followers || 0;
            this.followingCount = user.following || 0;
            this.reposCount = user.public_repos || 0;
            this.starsCount = '--';
        }
    }
    return User;
}
module.exports = UserFactory;