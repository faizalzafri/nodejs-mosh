const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('Hi Faizal');
});

app.get('/api/courses/:id', (req,res) => {
    id = req.params.id;
    res.send(`Id: ${id}`);
    return;
});

app.get('/api/courses/:id/:name', (req,res) => {
    res.send(req.params);
    return;
});

app.listen(port, ()=>{
    console.log(`Listening on..${port}`);
});
