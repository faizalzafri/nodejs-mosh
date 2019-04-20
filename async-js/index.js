console.log('Before');
const user = getUser(1);
console.log(user);
console.log('After');

function getUser(id) {
    setTimeout(() => {
        console.log('Reading User from database');
        return { id: id, name: 'Zyx' };
    }, 2000);
}
