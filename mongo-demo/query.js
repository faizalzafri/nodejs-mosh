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

async function getData() {

    const courses1 = await Course
        .find({ price: { $gt: 10 } });
    console.log(courses1);

    const courses2 = await Course
        .find({ price: { $gt: 10, $lt: 20 } });
    console.log(courses2);

    const courses3 = await Course
        .find({ price: { $in: [15, 20, 25] } });
    console.log(courses3);
}

getData();