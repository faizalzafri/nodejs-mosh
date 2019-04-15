const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send('Hi Faizal');
});

app.listen(3000, ()=>{
    console.log('Listening..');
});
