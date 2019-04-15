const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const courses = [
    { id: 1, name: 'NodeJS' },
    { id: 2, name: 'Angular' }
];

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c =>
        c.id === parseInt(req.params.id)
    );
    if (!course) {
        res.status(404).send('Course with given id not found.')
    }
    res.send(course);
});

app.listen(port, () => {
    console.log(`Listening on..${port}`);
});
