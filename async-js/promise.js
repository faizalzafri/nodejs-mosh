// Create a promise that fails after 2 seconds and handle the error.
const p = new Promise((resolve, reject) => {
    setTimeout(()=>{
      reject(new Error('In 2 seconds async operation failed'));
    },2000);

});

p
    .then(result => console.log('Result Message:', result))
    .catch(error => console.log(error));
