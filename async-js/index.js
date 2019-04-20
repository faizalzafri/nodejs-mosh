function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading User from database');
        callback({ id: id, name: 'Zyx' });
    }, 2000);
}

console.log('Before');
const user = getUser(1, (user) => {
    console.log('User: ' + user.id + ' ' + user.name);
});
console.log('After');