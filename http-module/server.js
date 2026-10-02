// Plain http server with two routes and a 404 for the rest.
const http = require('node:http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end('Hello Faizal');
    } else if (req.url === '/api/courses') {
        res.end(JSON.stringify([1, 2, 3]));
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(3000);
console.log('Listening..');
