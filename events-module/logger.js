// A logger that raises an event each time it logs.
const EventEmitter = require('node:events');

class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        this.emit('messageLogged', { id: 1, message });
    }
}

module.exports = Logger;
