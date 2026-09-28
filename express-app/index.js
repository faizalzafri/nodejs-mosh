// Logs only when NODE_DEBUG=app is set.
const debug = require('node:util').debuglog('app');
const express = require('express');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); //default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); //create folder public in root and put a readme.txt file in it
app.use(helmet());

if (app.get('env') === 'development') {
    app.use(morgan('dev'));
    debug('Using Morgan');
}

// Custom middleware example: runs on every request, then passes control on.
app.use((req, res, next) => {
    console.log('Logging..');
    next();
});

console.log('App Name: ' + (process.env.APP_NAME ?? 'default-profile'));
console.log('Mail Server Name: ' + (process.env.MAIL_HOST ?? 'not set'));

const courses = [
    { id: 1, name: 'NodeJS' },
    { id: 2, name: 'Angular' }
];

app.get('/', (req, res) => {
    res.render('index', { titletext: 'Demo Pug App', message: 'Some Text Here' });
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = findCourse(req, res);
    if (course) res.send(course);
});

app.post('/api/courses', (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {

    const course = findCourse(req, res);
    if (!course) return;

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {

    const course = findCourse(req, res);
    if (!course) return;

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

app.listen(3000, () => {
    console.log('Listening on..');
});

// Sends 404 and returns undefined when no course matches :id.
function findCourse(req, res) {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Course with given id not found.');
    return course;
}

function validate(course) {
    const courseSchema = Joi.object({ name: Joi.string().min(3).required() });
    return courseSchema.validate(course);
}
