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

    const courses = await Course
        // .find({ author: /^Faizal/i })
        // .find({ author: /.*zal$/i })
        .find({ author: /.*Faiz.*/ })
        .select();
    console.log(courses);

    const courses2 = await Course
        .find()
        .count();
    console.log(courses2);
}
getData();