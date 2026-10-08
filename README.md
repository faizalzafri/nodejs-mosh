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
