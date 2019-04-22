console.log('Before');

getUser(1)
    .then(user => getRepositories(user.name))
    .then(repo => getCommits(repo))
    .then(commits => console.log(commits))
    .catch(error => console.log(error.message));

async function displayCommits(){
    const user = await getUser(1);
    const repos = await getRepositories(user.name);
    const commits = await getCommits(repo[0]);
    console.log(commits);
}
displayCommits();

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, name: 'faiz' });
        }, 2000);
    });

}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['commit']);
        }, 2000);
    });
}