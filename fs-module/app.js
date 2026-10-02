// Read a folder with the sync API, then with fs/promises and async/await.
const fs = require('node:fs');
const fsp = require('node:fs/promises');

console.log(fs.readdirSync('./'));

async function main() {
    console.log('Result', await fsp.readdir('./'));

    try {
        await fsp.readdir('$'); // folder does not exist
    } catch (err) {
        console.log('Error', err.message);
    }
}

main();
