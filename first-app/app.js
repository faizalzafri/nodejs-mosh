// First Node script. There is no browser `window` object in Node.
function sayHello(name) {
    console.log('Hello ' + name);
}

sayHello('Faizal');

console.log(typeof window); // 'undefined'
