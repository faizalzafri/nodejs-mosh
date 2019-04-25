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

async function createCourse() {
    const Course = mongoose.model('Course', courseSchema);
    const course = new Course({
        name: 'NodeJS',
        author: 'Faizal',
        tags: ['node', 'backend'],
        isPublished: true,
        price: 15
    });

    const course2 = new Course({
        name: 'Angular5',
        author: 'Faizal',
        tags: ['angular', 'frontend'],
        isPublished: true,
        price: 25
    });

    const result = await course.save();
    console.log(result);

    const result2 = await course2.save();
    console.log(result2);
}
createCourse();