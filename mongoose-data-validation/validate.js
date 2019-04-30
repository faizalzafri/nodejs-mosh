const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected'))
    .catch(() => console.log('Failed to connect'));

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

async function createCourse() {
    const Course = mongoose.model('Course', courseSchema);
    const course = new Course({
        //name: 'NodeJS',
        author: 'Gigte',
        tags: ['node', 'backend'],
        isPublished: true,
        price: 15
    });

    const result = await course.save();
    console.log(result);
}
createCourse();