const EventEmitter = require('events');

class Logger extends EventEmitter {

    log(message) {

        //log the message
        console.log(message);

        //raise the event
        this.emit('messageLogged', { id: 1, message: `${message}` });
    }
}

module.exports = Logger;