console.log('Before');

setTimeout(() => {
    console.log('Some async operaton');
}, 2000)

console.log('After');