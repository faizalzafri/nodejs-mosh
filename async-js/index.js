function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading User from database');
        const user = {
            id: 1, name: 'Zyx'
        }
        callback(user);
    }, 2000);
}

function getRepos(username, callback) {
    setTimeout(() => {
        console.log('Getting repos from github api');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}

console.log('Before');
const user = getUser(1, (user) => {
    console.log('User: ' + user.name);
    getRepos(user.name, (repos) => {
        console.log(repos);
    })
});
console.log('After');