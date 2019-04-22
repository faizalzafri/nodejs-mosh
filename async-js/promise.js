const p = new Promise((resolve, reject) => {

    // setTimeout(() => {
    //     resolve('In 2 seconds async operation executed successfully');
    // }, 2000);

    setTimeout(()=>{
      reject(new Error('In 2 seconds async operation failed'));
    },2000);

});

p
    .then(result => console.log('Result Message:', result))
    .catch(error => console.log(error));
