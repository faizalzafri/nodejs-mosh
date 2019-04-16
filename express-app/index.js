const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
const app = express();

app.use(bodyParser.json());

const courseSchema = {
    name: Joi.string().min(3).required()
};

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

    const result = Joi.validate(req.body, courseSchema);


    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        res.end();
        return;
    }

    // if(req.body.name || req.body.name.length < 3){
    //   res.status(400).send('Name is invalid');
    //   res.end();
    //   return;
    // }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
    res.end();
});

app.listen(3000, () => {
    console.log('Listening on..');
});

