// Listen on a class that extends EventEmitter.
const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged', (arg) => console.log('Listener Added', arg));

logger.log('Hi Faizal');
