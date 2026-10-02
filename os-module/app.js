// Read memory info from the os module.
const os = require('node:os');

console.log(`Total Memory : ${os.totalmem()}`);
console.log(`Free Memory : ${os.freemem()}`);
