// One event, many listeners: emit() calls them in the order they were added.
const EventEmitter = require('node:events');
const emitter = new EventEmitter();

emitter.on('eventDemo', function () {
    console.log('Listener Added 1');
});

const eventListener = function (args) {
    console.log('Listener Added 2', args);
};

emitter.on('eventDemo', eventListener);

emitter.on('eventDemo', () => console.log('Listener Added 3'));

emitter.emit('eventDemo', { id: 1, name: 'Faizal' });
