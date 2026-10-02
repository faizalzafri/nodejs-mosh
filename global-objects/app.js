// Top-level variables belong to the module, not to the global object.
console.log('Logging..');
global.console.log('Logging global');

const message = 'This is not a global message';

console.log(message);
console.log(global.message); // undefined

console.log(module); // the module object is not global
