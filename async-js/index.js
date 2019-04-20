// replacing anonymous function with named functions

console.log('Before');
getUser(1, getRepos);
console.log('After');

function getRepos(user) {
    getRepos(user.name, getCommits);
}

function getCommits(repos) {
    getCommits(repos[0], displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading User from database');
        callback({ id: 1, name: 'Zyx' });
    }, 2000);
}

function getRepos(username, callback) {
    setTimeout(() => {
        console.log('Getting repos from github api');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}


function getCommits(repo, callback) {
    setTimeout(() => {
        console.log('Getting commits for repo: ');
        callback(['commit1', 'commit2']);
    }, 3000);
}