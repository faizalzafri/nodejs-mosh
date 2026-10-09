# nodejs-mosh

Small Node.js examples I wrote while learning backend basics: core modules, async code, Express and MongoDB with Mongoose. Each folder is one topic and runs on its own.

## Prerequisites

- Node.js 24 (see `.nvmrc`; 20.19+ works)
- Docker, only for the MongoDB folders

```sh
npm install
```

## Topics

| Folder | Topic | Run |
| --- | --- | --- |
| [first-app](first-app) | First script, no `window` in Node | `node first-app/app.js` |
| [global-objects](global-objects) | Module scope vs `global` | `node global-objects/app.js` |
| [create-load-module](create-load-module) | `require`, `module.exports`, module wrapper | `node create-load-module/app.js` |
| [path-module](path-module) | `node:path` | `node path-module/app.js` |
| [os-module](os-module) | `node:os` | `node os-module/app.js` |
| [fs-module](fs-module) | `node:fs` sync vs `fs/promises` | `node fs-module/app.js` |
| [events-module](events-module) | `EventEmitter` and extending it | `node events-module/app.js`, `node events-module/ext-app.js` |
| [http-module](http-module) | Plain `node:http` server | `node http-module/server.js`, open http://localhost:3000 |
| [async-js](async-js) | Promises, `Promise.all`/`race`, async/await | `node async-js/index.js` (also `promise.js`, `promise-api.js`) |
| [express-app](express-app) | Express 5 CRUD API, Joi, middleware, Pug | `npm start`, open http://localhost:3000 |
| [mongo-demo](mongo-demo) | Mongoose create, query, paging, update, delete | `node mongo-demo/index.js`, then `query.js [page]`, `update.js <id>`, `delete.js <id>` |
| [mongoose-data-validation](mongoose-data-validation) | Built-in and async custom validators | `node mongoose-data-validation/validate.js` |

## express-app settings

Optional. Copy `express-app/.env.example` to `express-app/.env`, then run from that folder:

```sh
cd express-app
node --env-file=.env index.js
```

## MongoDB

```sh
npm run db:up     # start mongo:8 on port 27017
npm run db:down   # stop it
```

Scripts use `MONGO_URL`, default `mongodb://localhost:27017/playground`.

## Checks

```sh
npm run lint
npm test
```

## Interview notes

Short answers to common questions, one group per topic.

### Event loop

**Q: Node is single-threaded. How does it handle many requests at once?**
A: Your JavaScript runs on one thread. Slow I/O (disk, network) is handed to the OS or the libuv thread pool. When it finishes, its callback is queued and the event loop runs it when the call stack is empty.

**Q: What runs first: `process.nextTick`, a resolved promise, `setTimeout(fn, 0)` or `setImmediate`?**
A: `nextTick` callbacks, then promise callbacks (microtasks), then timers and `setImmediate` in later loop phases. Inside an I/O callback, `setImmediate` always runs before `setTimeout(fn, 0)`.

**Q: What blocks the event loop?**
A: Long synchronous work: big loops, `JSON.parse` on huge input, `fs.readFileSync` in a request handler. Move it to async APIs, worker threads or another process.

### Core modules

**Q: Why use the `node:` prefix, like `require('node:fs')`?**
A: It always loads the built-in module, never an npm package with the same name, and makes it clear the code uses a core module.

**Q: What is the module wrapper?**
A: Node wraps each file in a function with `exports`, `require`, `module`, `__filename` and `__dirname`. That is why top-level variables stay private to the file and are not global.

**Q: `exports` vs `module.exports`?**
A: `require` returns `module.exports`. `exports` is only a shortcut to it, so `exports = fn` does nothing. Use `module.exports = fn` to export one thing.

### Callbacks, promises, async/await

**Q: What is wrong with nested callbacks?**
A: Deep nesting ("callback hell") is hard to read, and every level must handle its own error. Promises and async/await keep the flow flat and send errors to one place.

**Q: `Promise.all` vs `Promise.allSettled` vs `Promise.race`?**
A: `all` waits for every promise and fails on the first rejection. `allSettled` waits for every promise and never fails. `race` settles as soon as the first one settles.

**Q: How do you handle errors with async/await?**
A: Use `try/catch` around the `await`. A promise rejection that nobody catches crashes the process in current Node versions.

### Express middleware

**Q: What is middleware?**
A: A function `(req, res, next)` that runs in order for each request. It can change `req`/`res`, end the response, or call `next()` to pass control on. `express.json()`, `helmet()` and `morgan()` are all middleware.

**Q: What happens if middleware does not call `next()` and does not send a response?**
A: The request hangs until the client times out.

**Q: How do error handlers work?**
A: An error handler has four arguments: `(err, req, res, next)`. Express 5 also sends rejected promises from async handlers to it, so you do not need a wrapper.

### Validation

**Q: Where should you validate input?**
A: At the edge, before using it. In the API, validate the request body with Joi and return 400 with the message. In the database, use Mongoose schema rules as a second safety net.

**Q: Joi vs Mongoose validation?**
A: Joi checks what the client sent. Mongoose checks what is saved to the database. They do different jobs, so keeping both is fine.

**Q: How do you write an async validator in Mongoose?**
A: Return a promise (or use an async function) from `validator` that resolves to `true` or `false`. See [mongoose-data-validation](mongoose-data-validation).

### Mongo querying and pagination

**Q: How do you page through results?**
A: `.skip((page - 1) * size).limit(size)`, with a stable `.sort()`. See [mongo-demo/query.js](mongo-demo/query.js).

**Q: Why is `skip` slow on big collections and what is the fix?**
A: The server still walks every skipped document. For deep pages, use range (cursor) paging: sort by `_id` and query `{ _id: { $gt: lastId } }` with `limit`.

**Q: How do you make queries fast and return less data?**
A: Add an index on the fields you filter and sort by, use `.select()` to return only needed fields, and `.lean()` when you only read plain objects.
