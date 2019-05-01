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
    price: { type: Number, required: function () { return this.isPublished; } }
});

async function createCourse() {
    const Course = mongoose.model('Course', courseSchema);
    const course = new Course({
        //name: 'NodeJS',
        author: 'Gigte',
        tags: ['node', 'backend'],
        isPublished: true,
        //price: 15
    });

    try {
        const result = await course.save();
        console.log(result);
    }
    catch (ex) {
        console.log(ex.message);
    }
}
createCourse();