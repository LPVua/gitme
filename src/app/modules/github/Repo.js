function RepoFactory(){
    class Repo {
        constructor(repo){
            this.name = repo.name;
            this.fullName = repo.full_name;
            this.description = repo.description;
            this.starsCount = repo.stargazers_count || 0;
            this.forksCount = repo.forks_count || 0;
        }
    }
    return Repo;
}
module.exports = RepoFactory;