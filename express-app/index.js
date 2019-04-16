const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const courses = [
    { id: 1, name: 'NodeJS' },
    { id: 2, name: 'Angular' }
];

app.get('/api/courses', (req, res) => {
    res.send(courses);
    res.end();
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c =>
        c.id === parseInt(req.params.id)
    );

    if (!course) {
        res.status(404).send('Course with given id not found.')
    }
    res.send(course);
    res.end();
});

app.listen(3000, () => {
    console.log('Listening on..');
});