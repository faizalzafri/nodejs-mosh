// Load a local module. Every module also gets __filename and __dirname.
const logger = require('./logger');

console.log(logger);

logger('Hi Faizal');

console.log(__filename);
console.log(__dirname);
