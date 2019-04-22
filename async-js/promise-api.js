const p1 = Promise.resolve({id:1});
p1.then(result => console.log(result));

const p2 = Promise.reject(new Error('Error Occurred'));
p2.catch(error => console.log(error.message));

