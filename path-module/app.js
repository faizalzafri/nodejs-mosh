// Split this file's path into root, dir, base, ext and name.
const path = require('node:path');

console.log(path.parse(__filename));
