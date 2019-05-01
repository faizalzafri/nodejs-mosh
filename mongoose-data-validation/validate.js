const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected'))
    .catch(() => console.log('Failed to connect'));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
        // match: 
    },
    category: { type: String, enum: ['WebDev', 'MobDev', 'DbAdmin'] },
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            return this.isPublished;
        },
        min: 20,
        max: 200
    }
});

async function createCourse() {
    const Course = mongoose.model('Course', courseSchema);
    const course = new Course({
        name: 'No',
        category: '',
        author: 'Gigte',
        tags: ['node', 'backend'],
        isPublished: true,
        price: 15
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