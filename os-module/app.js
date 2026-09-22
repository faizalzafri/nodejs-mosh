const os = require('os');

var tm = os.totalmem();
var fm = os.freemem();

console.log(`Total Memory : ${tm}`);
console.log(`Total Memory : ${fm}`);