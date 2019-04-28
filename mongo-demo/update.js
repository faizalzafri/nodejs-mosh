const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected'))
    .catch(() => console.log('Failed to connect'));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function updateCourse(id) {

    const course = await Course.findById(id);

    if (!course)
        return;

    course.isPublished = true;
    course.author = 'Faiz';

    const result = await course.save();
    console.log(result);
}

updateCourse('5cc20b60d027bf0984ff2db7');