// Chain async calls with async/await and catch the error from the last one.
console.log('Before');

async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.name);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    } catch (err) {
        console.log('Error', err.message);
    }
}
displayCommits();

console.log('After');

function getUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, name: 'faiz' });
        }, 2000);
    });

}

function getRepositories(username) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Calling GitHub API for', username);
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API for', repo);
            reject(new Error('Could not get commits'))
        }, 2000);
    });
}