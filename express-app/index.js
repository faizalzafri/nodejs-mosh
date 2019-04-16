const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
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

app.post('/api/courses', (req, res) => {

    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        res.end();
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
    res.end();
});

app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('Course with given id not found.');
        res.end();
        return;
    }

    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        res.end();
        return;
    }

    course.name = req.body.name;
    res.send(course);
    res.end();
});

app.listen(3000, () => {
    console.log('Listening on..');
});

function validate(course) {
    const courseSchema = { name: Joi.string().min(3).required() };
    return Joi.validate(course, courseSchema);
}

