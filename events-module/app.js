const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('eventDemo', function () {
    console.log('Listener Added 1');
});

var eventListener = function () {
    console.log('Listener Added 2');
};

emitter.on('eventDemo', eventListener);

emitter.on('eventDemo', () => console.log('Listener Added 3'));

emitter.emit('eventDemo');