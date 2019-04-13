const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('eventDemo', function () {
    console.log('Listener Added 1');
});

var eventListener = function (args) {
    console.log('Listener Added 2', args);
};

emitter.on('eventDemo', eventListener);

emitter.on('eventDemo', () => console.log('Listener Added 3'));

emitter.emit('eventDemo',{ id:1, name: 'Faizal'});