const p1 = Promise.resolve({ id: 1 });
p1.then(result => console.log(result));

const p2 = Promise.reject(new Error('Error Occurred'));
p2.catch(error => console.log(error.message));

const parallelPromise1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async opn 1')
        resolve(1);
    }, 2000);
});

const parallelPromise2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async opn 2')
        resolve(1);
    }, 2000);
});

Promise.all([parallelPromise1, parallelPromise2])
    .then(result => console.log(result));

