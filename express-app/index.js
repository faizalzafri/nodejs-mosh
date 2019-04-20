const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');

const logger = require('./logger');
const auth = require('./auth');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); //create folder public in root and put a readme.txt file in it
app.use(helmet());

if (app.get('env') === 'development') {
    app.use(morgan('dev'));
    console.log('Using Morgan');
}
app.use(logger);
app.use(auth);

console.log('App Name: ' + config.get('name'));
console.log('Mail Server Name: ' + config.get('mail.host'));
console.log('Mail Password : ' + config.get('mail.password'));

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

app.delete('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('Course with given id not found.');
        res.end();
        return;
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);
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

