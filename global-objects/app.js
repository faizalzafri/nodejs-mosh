console.log('Logging..')
global.console.log('Logging global');

var message = 'This is not a global message';

console.log(message);
console.log(global.message); //undefined
global.console.log(message);
global.console.log(global.message); //undefined

console.log(module); //this module object is not global