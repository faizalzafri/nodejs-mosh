// CRUD tests for the courses API. Tests run in order and share the in-memory list.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const app = require('./index');

let server;
let base;

before(async () => {
    server = app.listen(0);
    await new Promise(resolve => server.once('listening', resolve));
    base = `http://localhost:${server.address().port}/api/courses`;
});

after(() => server.close());

function send(method, url, body) {
    return fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
}

test('GET lists all courses', async () => {
    const res = await fetch(base);
    assert.equal(res.status, 200);
    assert.equal((await res.json()).length, 2);
});

test('GET by id returns one course or 404', async () => {
    assert.deepEqual(await (await fetch(`${base}/1`)).json(), { id: 1, name: 'NodeJS' });
    assert.equal((await fetch(`${base}/99`)).status, 404);
});

test('POST creates a course and rejects a short name', async () => {
    const res = await send('POST', base, { name: 'React' });
    assert.deepEqual(await res.json(), { id: 3, name: 'React' });
    assert.equal((await send('POST', base, { name: 'ab' })).status, 400);
});

test('PUT updates a course, 400 on bad body, 404 on unknown id', async () => {
    const res = await send('PUT', `${base}/3`, { name: 'Vue.js' });
    assert.deepEqual(await res.json(), { id: 3, name: 'Vue.js' });
    assert.equal((await send('PUT', `${base}/3`, {})).status, 400);
    assert.equal((await send('PUT', `${base}/99`, { name: 'Svelte' })).status, 404);
});

test('DELETE removes a course, then 404', async () => {
    assert.deepEqual(await (await send('DELETE', `${base}/3`)).json(), { id: 3, name: 'Vue.js' });
    assert.equal((await fetch(`${base}/3`)).status, 404);
});
